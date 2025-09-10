import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockPets } from '../data/mockData';
import { Heart, Calendar, MapPin, Shield, Users, ChevronLeft, ChevronRight, Share2, MessageCircle } from 'lucide-react';

interface PetProfilePageProps {
  petId: string;
  onNavigate: (page: string, petId?: string) => void;
}

const PetProfilePage: React.FC<PetProfilePageProps> = ({ petId, onNavigate }) => {
  const pet = mockPets.find(p => p.id === petId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 text-center bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pet Not Found</h2>
          <p className="text-gray-600 mb-6">The pet you're looking for doesn't exist.</p>
          <Button onClick={() => onNavigate('browse')} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl">
            Browse Other Pets
          </Button>
        </Card>
      </div>
    );
  }

  // For demo purposes, we'll use the same image multiple times
  const images = [pet.images[0], pet.images[0], pet.images[0]];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('browse')}
          className="mb-6 text-gray-600 hover:text-pink-600 rounded-xl"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Browse
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <Card className="overflow-hidden bg-white rounded-2xl shadow-lg border-0">
              <div className="relative">
                <ImageWithFallback
                  src={images[currentImageIndex]}
                  alt={pet.name}
                  className="w-full h-96 object-cover"
                />
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/90 hover:bg-white p-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/90 hover:bg-white p-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`rounded-full p-2 ${isFavorited ? 'bg-pink-500 text-white' : 'bg-white/90 hover:bg-white'}`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : 'text-pink-500'}`} />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full bg-white/90 hover:bg-white p-2"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </Button>
                </div>

                {/* Status Badge */}
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-green-500 text-white text-sm px-3 py-1">
                    Available for Adoption
                  </Badge>
                </div>
              </div>

              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="p-4 flex gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                        index === currentImageIndex ? 'border-pink-400 scale-105' : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${pet.name} ${index + 1}`}
                        className="w-16 h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Pet Information */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{pet.name}</h1>
                  <p className="text-xl text-gray-600">{pet.breed}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Adoption Fee</p>
                  <p className="text-2xl font-bold text-pink-600">${pet.adoptionFee}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5 text-pink-500" />
                  <span>{pet.age} years old</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5 text-pink-500" />
                  <span className="capitalize">{pet.gender}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-pink-500" />
                  <span>{pet.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-5 h-5 text-pink-500" />
                  <span className="capitalize">{pet.size} size</span>
                </div>
              </div>

              {/* Personality Traits */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Personality</h3>
                <div className="flex flex-wrap gap-2">
                  {pet.personality.map((trait) => (
                    <Badge key={trait} className="bg-purple-100 text-purple-700 px-3 py-1">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Main Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  onClick={() => onNavigate('adoption-form', pet.id)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl py-3 text-lg font-semibold"
                >
                  Apply to Adopt
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 rounded-xl py-3"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ask Questions
                </Button>
              </div>
            </Card>

            {/* Health & Care Card */}
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <h3 className="font-semibold text-gray-800 mb-4">Health & Care Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${pet.vaccinated ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-700">
                    {pet.vaccinated ? 'Vaccinated' : 'Not Vaccinated'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${pet.spayed ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-700">
                    {pet.spayed ? 'Spayed/Neutered' : 'Not Spayed/Neutered'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Description Card */}
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <h3 className="font-semibold text-gray-800 mb-4">About {pet.name}</h3>
              <p className="text-gray-700 leading-relaxed">{pet.description}</p>
            </Card>

            {/* Adoption Process Card */}
            <Card className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-lg border-0">
              <h3 className="font-semibold text-gray-800 mb-4">Adoption Process</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</div>
                  <div>
                    <p className="font-medium text-gray-800">Submit Application</p>
                    <p className="text-sm text-gray-600">Fill out our adoption application with your information and preferences.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</div>
                  <div>
                    <p className="font-medium text-gray-800">Meet & Greet</p>
                    <p className="text-sm text-gray-600">Schedule a visit to meet {pet.name} and see if you're a good match.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</div>
                  <div>
                    <p className="font-medium text-gray-800">Take Home</p>
                    <p className="text-sm text-gray-600">Complete the adoption paperwork and welcome your new family member!</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Similar Pets Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPets
              .filter(p => p.id !== pet.id && p.species === pet.species)
              .slice(0, 3)
              .map((similarPet) => (
                <Card 
                  key={similarPet.id}
                  className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white rounded-2xl cursor-pointer transform hover:scale-105"
                  onClick={() => onNavigate('pet-profile', similarPet.id)}
                >
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={similarPet.images[0]}
                      alt={similarPet.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-green-500 text-white">Available</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-1">{similarPet.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{similarPet.breed}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                      <span>{similarPet.age} years</span>
                      <span>{similarPet.location.split(',')[0]}</span>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('pet-profile', similarPet.id);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfilePage;