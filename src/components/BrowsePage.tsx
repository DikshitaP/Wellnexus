import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockPets } from '../data/mockData';
import { FilterOptions } from '../types';
import { Heart, Search, MapPin, Calendar, Filter, Grid, List } from 'lucide-react';

interface BrowsePageProps {
  onNavigate: (page: string, petId?: string) => void;
}

const BrowsePage: React.FC<BrowsePageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPets = mockPets.filter(pet => {
    const matchesSearch = !searchTerm || 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecies = !filters.species || pet.species === filters.species;
    const matchesGender = !filters.gender || pet.gender === filters.gender;
    const matchesSize = !filters.size || pet.size === filters.size;
    
    const matchesAge = !filters.age || (() => {
      if (filters.age === 'young') return pet.age <= 2;
      if (filters.age === 'adult') return pet.age >= 3 && pet.age <= 7;
      if (filters.age === 'senior') return pet.age >= 8;
      return true;
    })();

    return matchesSearch && matchesSpecies && matchesGender && matchesSize && matchesAge;
  });

  const updateFilter = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value === 'all' ? undefined : value }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const PetCard = ({ pet }: { pet: typeof mockPets[0] }) => (
    <Card 
      className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white rounded-2xl cursor-pointer transform hover:scale-105"
      onClick={() => onNavigate('pet-profile', pet.id)}
    >
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={pet.images[0]}
          alt={pet.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Button size="sm" variant="secondary" className="rounded-full bg-white/90 hover:bg-white p-2">
            <Heart className="w-4 h-4 text-pink-500" />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-green-500 text-white">Available</Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-gray-800 mb-1">{pet.name}</h3>
            <p className="text-sm text-gray-600">{pet.breed}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Fee</p>
            <p className="font-bold text-pink-600">${pet.adoptionFee}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {pet.age} years
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {pet.location.split(',')[0]}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {pet.personality.slice(0, 2).map((trait) => (
            <Badge key={trait} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
              {trait}
            </Badge>
          ))}
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('pet-profile', pet.id);
          }}
        >
          View Details
        </Button>
      </div>
    </Card>
  );

  const PetListItem = ({ pet }: { pet: typeof mockPets[0] }) => (
    <Card 
      className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl cursor-pointer"
      onClick={() => onNavigate('pet-profile', pet.id)}
    >
      <div className="flex p-4 gap-4">
        <div className="relative flex-shrink-0">
          <ImageWithFallback
            src={pet.images[0]}
            alt={pet.name}
            className="w-24 h-24 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute -top-1 -right-1">
            <Button size="sm" variant="secondary" className="rounded-full bg-white/90 hover:bg-white p-1">
              <Heart className="w-3 h-3 text-pink-500" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-gray-800 mb-1">{pet.name}</h3>
              <p className="text-sm text-gray-600">{pet.breed}</p>
            </div>
            <div className="text-right">
              <Badge className="bg-green-500 text-white mb-1">Available</Badge>
              <p className="font-bold text-pink-600">${pet.adoptionFee}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {pet.age} years old
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {pet.location}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {pet.personality.slice(0, 3).map((trait) => (
              <Badge key={trait} variant="secondary" className="bg-purple-100 text-purple-700">
                {trait}
              </Badge>
            ))}
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {pet.description}
          </p>
          
          <Button 
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('pet-profile', pet.id);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Find Your Perfect Companion
          </h1>
          <p className="text-lg text-gray-600">
            Browse through our available pets and find your new best friend.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="p-6 mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by name, breed, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-2 border-pink-100 focus:border-pink-400 rounded-xl"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 border-2 border-pink-300 text-pink-600 hover:bg-pink-50 rounded-xl px-6"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
              <div className="flex border-2 border-pink-100 rounded-xl overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className={`h-12 rounded-none ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className={`h-12 rounded-none ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">Filters</h3>
                <Button variant="ghost" onClick={clearFilters} className="text-sm text-pink-600 hover:text-pink-700">
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
                {/* Species */}
                <div>
                  <label className="block font-medium text-gray-700 mb-3">Species</label>
                  <Select value={filters.species || 'all'} onValueChange={(value) => updateFilter('species', value)}>
                    <SelectTrigger className="border-2 border-gray-100 focus:border-pink-400 rounded-xl">
                      <SelectValue placeholder="Any species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any species</SelectItem>
                      <SelectItem value="dog">Dogs</SelectItem>
                      <SelectItem value="cat">Cats</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age */}
                <div>
                  <label className="block font-medium text-gray-700 mb-3">Age</label>
                  <Select value={filters.age || 'all'} onValueChange={(value) => updateFilter('age', value)}>
                    <SelectTrigger className="border-2 border-gray-100 focus:border-pink-400 rounded-xl">
                      <SelectValue placeholder="Any age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any age</SelectItem>
                      <SelectItem value="young">Young (0-2 years)</SelectItem>
                      <SelectItem value="adult">Adult (3-7 years)</SelectItem>
                      <SelectItem value="senior">Senior (8+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block font-medium text-gray-700 mb-3">Gender</label>
                  <Select value={filters.gender || 'all'} onValueChange={(value) => updateFilter('gender', value)}>
                    <SelectTrigger className="border-2 border-gray-100 focus:border-pink-400 rounded-xl">
                      <SelectValue placeholder="Any gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any gender</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Size */}
                <div>
                  <label className="block font-medium text-gray-700 mb-3">Size</label>
                  <Select value={filters.size || 'all'} onValueChange={(value) => updateFilter('size', value)}>
                    <SelectTrigger className="border-2 border-gray-100 focus:border-pink-400 rounded-xl">
                      <SelectValue placeholder="Any size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any size</SelectItem>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredPets.length}</span> pets
              </p>
            </div>

            {/* Pet Grid/List */}
            {filteredPets.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-4'
              }>
                {filteredPets.map((pet) => 
                  viewMode === 'grid' ? (
                    <PetCard key={pet.id} pet={pet} />
                  ) : (
                    <PetListItem key={pet.id} pet={pet} />
                  )
                )}
              </div>
            ) : (
              <Card className="p-12 text-center bg-white rounded-2xl shadow-lg border-0">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No pets found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters to find more pets.
                </p>
                <Button onClick={clearFilters} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl">
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;