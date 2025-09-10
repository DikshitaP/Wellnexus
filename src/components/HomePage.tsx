import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockPets, mockTestimonials } from '../data/mockData';
import { Heart, Search, MapPin, Calendar, Users, Star, Facebook, Twitter, Instagram, Mail, Phone, MapPin as MapPinIcon } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, petId?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const featuredPets = mockPets.slice(0, 3);

  const handleSearch = () => {
    onNavigate('browse');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-purple-600/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Find Your New Best Friend
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Give a loving home to a pet in need. Browse through hundreds of adorable cats, dogs, and other animals waiting for their forever families.
            </p>
            
            {/* Search Bar */}
            <Card className="max-w-4xl mx-auto p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pet Name or Breed</label>
                  <Input
                    placeholder="Search pets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 border-2 border-pink-100 focus:border-pink-400 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Species</label>
                  <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
                    <SelectTrigger className="h-12 border-2 border-pink-100 focus:border-pink-400 rounded-xl">
                      <SelectValue placeholder="Any species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Dogs</SelectItem>
                      <SelectItem value="cat">Cats</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <Select value={selectedAge} onValueChange={setSelectedAge}>
                    <SelectTrigger className="h-12 border-2 border-pink-100 focus:border-pink-400 rounded-xl">
                      <SelectValue placeholder="Any age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="young">Young (0-2 years)</SelectItem>
                      <SelectItem value="adult">Adult (3-7 years)</SelectItem>
                      <SelectItem value="senior">Senior (8+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleSearch}
                  className="h-12 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search Pets
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Featured Pets
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These adorable companions are looking for loving homes. Could one of them be your perfect match?
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPets.map((pet) => (
              <Card 
                key={pet.id} 
                className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white rounded-2xl cursor-pointer transform hover:scale-105"
                onClick={() => onNavigate('pet-profile', pet.id)}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={pet.images[0]}
                    alt={pet.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="secondary" className="rounded-full bg-white/90 hover:bg-white p-2">
                      <Heart className="w-4 h-4 text-pink-500" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-green-500 text-white">Available</Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{pet.name}</h3>
                      <p className="text-gray-600">{pet.breed}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Adoption Fee</p>
                      <p className="text-lg font-bold text-pink-600">${pet.adoptionFee}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {pet.age} years old
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {pet.location.split(',')[0]}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pet.personality.slice(0, 3).map((trait) => (
                      <Badge key={trait} variant="secondary" className="bg-purple-100 text-purple-700">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {pet.description}
                  </p>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('pet-profile', pet.id);
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => onNavigate('browse')}
              variant="outline"
              className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 rounded-xl px-8 py-3"
            >
              View All Pets
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Happy Adoption Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read about the wonderful journeys of pets who found their forever homes and the families who welcomed them.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.story}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{testimonial.userName}</p>
                      <p className="text-sm text-gray-600">Adopted {testimonial.petName}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '2,500+', label: 'Pets Adopted', icon: Heart },
              { number: '1,200+', label: 'Happy Families', icon: Users },
              { number: '15+', label: 'Years of Service', icon: Calendar },
              { number: '50+', label: 'Rescue Partners', icon: MapPinIcon },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg border-0">
                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-2 rounded-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">PawsHome</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Connecting loving families with pets in need. Every adoption saves a life and creates a beautiful bond that lasts forever.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram].map((Icon, index) => (
                  <Button key={index} size="sm" variant="secondary" className="rounded-full bg-gray-700 hover:bg-gray-600 p-2">
                    <Icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-pink-400" />
                  <span className="text-gray-300">(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-pink-400" />
                  <span className="text-gray-300">info@pawshome.org</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-pink-400" />
                  <span className="text-gray-300">123 Pet Street, San Francisco, CA 94102</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { label: 'Browse Pets', page: 'browse' },
                  { label: 'About Us', page: 'about' },
                  { label: 'Volunteer', page: 'about' },
                  { label: 'Donate', page: 'about' },
                ].map((link) => (
                  <button
                    key={link.label}
                    onClick={() => onNavigate(link.page)}
                    className="block text-gray-300 hover:text-pink-400 transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 PawsHome. All rights reserved. Made with ❤️ for pets and their families.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;