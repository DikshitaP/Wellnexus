import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Users, Award, MapPin, Phone, Mail, Clock, Coins, HandHeart, Camera, Star, Shield } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Executive Director",
      image: "https://images.unsplash.com/photo-1700665537604-412e89a285c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBzaGVsdGVyJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc1Njg2NTA4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Sarah has been dedicated to animal welfare for over 15 years and founded PawsHome with a mission to find loving homes for every pet."
    },
    {
      name: "Dr. Michael Chen",
      role: "Chief Veterinarian",
      image: "https://images.unsplash.com/photo-1700665537604-412e89a285c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBzaGVsdGVyJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc1Njg2NTA4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Dr. Chen ensures all our animals receive the best medical care and works tirelessly to improve their health and well-being."
    },
    {
      name: "Emily Rodriguez",
      role: "Adoption Coordinator",
      image: "https://images.unsplash.com/photo-1700665537604-412e89a285c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBzaGVsdGVyJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc1Njg2NTA4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Emily specializes in matching pets with perfect families and guides adopters through every step of the process."
    },
    {
      name: "James Wilson",
      role: "Volunteer Coordinator",
      image: "https://images.unsplash.com/photo-1700665537604-412e89a285c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBzaGVsdGVyJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc1Njg2NTA4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "James manages our amazing volunteer program and ensures our facility runs smoothly with the help of dedicated volunteers."
    },
    {
      name: "Lisa Thompson",
      role: "Foster Program Manager",
      image: "https://images.unsplash.com/photo-1700665537604-412e89a285c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBzaGVsdGVyJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc1Njg2NTA4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Lisa coordinates our foster network, providing temporary homes for animals who need extra care before adoption."
    },
    {
      name: "David Park",
      role: "Community Outreach",
      image: "https://images.unsplash.com/photo-1700665537604-412e89a285c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBzaGVsdGVyJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc1Njg2NTA4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "David builds relationships with the community and organizes events to raise awareness about pet adoption and animal welfare."
    }
  ];

  const achievements = [
    { number: "2,500+", label: "Pets Adopted", icon: Heart },
    { number: "1,200+", label: "Happy Families", icon: Users },
    { number: "15+", label: "Years of Service", icon: Award },
    { number: "50+", label: "Rescue Partners", icon: HandHeart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-purple-600/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              About PawsHome
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Dedicated to connecting loving families with pets in need since 2009. Every animal deserves a chance at happiness.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                PawsHome was founded with a simple but powerful mission: to rescue, rehabilitate, and rehome animals in need while educating our community about responsible pet ownership.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that every animal deserves love, care, and a safe home. Our dedicated team works tirelessly to ensure that each pet in our care receives medical attention, behavioral support, and plenty of love while they wait for their forever families.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-pink-100 text-pink-700 px-4 py-2">No-Kill Shelter</Badge>
                <Badge className="bg-purple-100 text-purple-700 px-4 py-2">24/7 Emergency Care</Badge>
                <Badge className="bg-blue-100 text-blue-700 px-4 py-2">Community Education</Badge>
              </div>
            </div>
            <div>
              <Card className="overflow-hidden rounded-2xl shadow-xl border-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1599302761127-e3ed900207fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBhZG9wdGlvbiUyMGhlcm98ZW58MXx8fHwxNzU2OTIyNTgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Happy pets at PawsHome"
                  className="w-full h-80 object-cover"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Through the dedication of our team and volunteers, we've made a significant impact in our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className="text-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-lg border-0">
                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{achievement.number}</h3>
                  <p className="text-gray-600">{achievement.label}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our passionate team of professionals and volunteers work together to make a difference in the lives of animals every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <div className="relative mb-4">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white rounded-full p-2">
                    <Heart className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-pink-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Volunteer Family</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Volunteers are the heart of PawsHome. Whether you have an hour a week or a day a month, there are many ways to help make a difference in the lives of animals.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Dog walking and socialization",
                  "Cat care and enrichment activities",
                  "Administrative support and data entry",
                  "Event planning and fundraising",
                  "Photography and social media",
                  "Transportation and fostering"
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-green-500 text-white rounded-full p-1">
                      <Star className="w-3 h-3" />
                    </div>
                    <span className="text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl px-8 py-3">
                  <HandHeart className="w-5 h-5 mr-2" />
                  Become a Volunteer
                </Button>
                <p className="text-sm text-gray-600">
                  No experience necessary - we provide training for all volunteer positions!
                </p>
              </div>
            </div>
            
            <Card className="overflow-hidden rounded-2xl shadow-xl border-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1700665537604-412e89a285c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBzaGVsdGVyJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc1Njg2NTA4NXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Volunteers helping animals"
                className="w-full h-80 object-cover"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Support Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your donations help us provide medical care, food, shelter, and love to animals in need. Every contribution makes a difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                amount: "$25",
                description: "Provides vaccinations for one animal",
                icon: Shield
              },
              {
                amount: "$50",
                description: "Feeds a pet for one month",
                icon: Heart
              },
              {
                amount: "$100",
                description: "Covers spay/neuter surgery",
                icon: Award
              }
            ].map((donation, index) => {
              const Icon = donation.icon;
              return (
                <Card key={index} className="p-6 text-center bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg border-0">
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{donation.amount}</h3>
                  <p className="text-gray-600">{donation.description}</p>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center">
            <div className="space-y-4">
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl px-8 py-3 text-lg mr-4">
                <Coins className="w-5 h-5 mr-2" />
                Make a Donation
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-green-300 text-green-600 hover:bg-green-50 rounded-xl px-8 py-3"
              >
                Monthly Giving Program
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              PawsHome is a 501(c)(3) nonprofit organization. All donations are tax-deductible.
            </p>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-pink-400" />
                  <span>123 Pet Street, San Francisco, CA 94102</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-pink-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-pink-400" />
                  <span>info@pawshome.org</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-pink-400" />
                  <div>
                    <p>Monday - Friday: 10am - 6pm</p>
                    <p>Saturday - Sunday: 9am - 5pm</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Ready to Find Your New Best Friend?</h3>
              <p className="text-gray-300 mb-6">
                Come visit us today and meet the amazing animals waiting for their forever homes. Our adoption counselors are here to help you find the perfect match.
              </p>
              <Button 
                onClick={() => onNavigate('browse')}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl px-6 py-3"
              >
                Browse Available Pets
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;