import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockPets } from '../data/mockData';
import { ChevronLeft, Upload, CheckCircle, User, Home, Heart, FileText } from 'lucide-react';

interface AdoptionFormPageProps {
  petId: string;
  onNavigate: (page: string, petId?: string) => void;
}

const AdoptionFormPage: React.FC<AdoptionFormPageProps> = ({ petId, onNavigate }) => {
  const pet = mockPets.find(p => p.id === petId);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    // Address Information
    street: '',
    city: '',
    state: '',
    zipCode: '',
    housingType: '',
    rentOwn: '',
    landlordApproval: false,
    // Household Information
    householdSize: '',
    hasChildren: '',
    childrenAges: '',
    hasOtherPets: '',
    otherPetsDetails: '',
    // Experience & Lifestyle
    petExperience: '',
    workSchedule: '',
    exerciseCommitment: '',
    // Adoption Specific
    whyAdopt: '',
    whyThisPet: '',
    vetReference: '',
    emergencyPlan: '',
    // Agreement
    agreesToTerms: false,
    agreesToHomeVisit: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 4;

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 text-center bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pet Not Found</h2>
          <p className="text-gray-600 mb-6">The pet you're applying for doesn't exist.</p>
          <Button onClick={() => onNavigate('browse')} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl">
            Browse Other Pets
          </Button>
        </Card>
      </div>
    );
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 text-center bg-white rounded-2xl shadow-lg max-w-md mx-4">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
            <p className="text-gray-600">
              Thank you for your interest in adopting {pet.name}. We'll review your application and get back to you within 2-3 business days.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">What's Next?</h3>
            <ul className="text-sm text-gray-600 space-y-1 text-left">
              <li>• Application review (1-2 days)</li>
              <li>• Reference check</li>
              <li>• Schedule meet & greet</li>
              <li>• Home visit (if approved)</li>
              <li>• Finalize adoption</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => onNavigate('dashboard')}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl"
            >
              View My Applications
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate('browse')}
              className="w-full border-2 border-pink-300 text-pink-600 hover:bg-pink-50 rounded-xl"
            >
              Browse More Pets
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <User className="w-12 h-12 text-pink-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl"
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl"
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl"
            required
          />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Select value={formData.age} onValueChange={(value) => updateFormData('age', value)}>
            <SelectTrigger className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl">
              <SelectValue placeholder="Select your age" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="18-25">18-25 years</SelectItem>
              <SelectItem value="26-35">26-35 years</SelectItem>
              <SelectItem value="36-45">36-45 years</SelectItem>
              <SelectItem value="46-55">46-55 years</SelectItem>
              <SelectItem value="56+">56+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderHousingInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Home className="w-12 h-12 text-pink-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-800">Housing & Household</h3>
        <p className="text-gray-600">Information about your living situation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            value={formData.street}
            onChange={(e) => updateFormData('street', e.target.value)}
            className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl"
            required
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
            className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl"
            required
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => updateFormData('state', e.target.value)}
            className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl"
            required
          />
        </div>
        <div>
          <Label htmlFor="housingType">Housing Type</Label>
          <Select value={formData.housingType} onValueChange={(value) => updateFormData('housingType', value)}>
            <SelectTrigger className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl">
              <SelectValue placeholder="Select housing type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="rentOwn">Do you rent or own?</Label>
          <Select value={formData.rentOwn} onValueChange={(value) => updateFormData('rentOwn', value)}>
            <SelectTrigger className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="own">Own</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {formData.rentOwn === 'rent' && (
        <div className="bg-yellow-50 p-4 rounded-xl">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="landlordApproval"
              checked={formData.landlordApproval}
              onCheckedChange={(checked) => updateFormData('landlordApproval', checked)}
            />
            <Label htmlFor="landlordApproval" className="text-sm">
              I have landlord approval to have pets
            </Label>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="hasChildren">Do you have children?</Label>
          <Select value={formData.hasChildren} onValueChange={(value) => updateFormData('hasChildren', value)}>
            <SelectTrigger className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.hasChildren === 'yes' && (
          <div>
            <Label htmlFor="childrenAges">Children's Ages</Label>
            <Input
              id="childrenAges"
              value={formData.childrenAges}
              onChange={(e) => updateFormData('childrenAges', e.target.value)}
              placeholder="e.g., 5, 8, 12"
              className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Heart className="w-12 h-12 text-pink-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-800">Pet Experience & Lifestyle</h3>
        <p className="text-gray-600">Help us understand your experience with pets</p>
      </div>

      <div>
        <Label htmlFor="petExperience">Describe your experience with pets</Label>
        <Textarea
          id="petExperience"
          value={formData.petExperience}
          onChange={(e) => updateFormData('petExperience', e.target.value)}
          placeholder="Tell us about your experience caring for pets..."
          className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl min-h-[100px]"
          required
        />
      </div>

      <div>
        <Label htmlFor="hasOtherPets">Do you currently have other pets?</Label>
        <Select value={formData.hasOtherPets} onValueChange={(value) => updateFormData('hasOtherPets', value)}>
          <SelectTrigger className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.hasOtherPets === 'yes' && (
        <div>
          <Label htmlFor="otherPetsDetails">Please describe your other pets</Label>
          <Textarea
            id="otherPetsDetails"
            value={formData.otherPetsDetails}
            onChange={(e) => updateFormData('otherPetsDetails', e.target.value)}
            placeholder="Type, age, temperament, etc."
            className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl"
          />
        </div>
      )}

      <div>
        <Label htmlFor="workSchedule">What is your work schedule?</Label>
        <Select value={formData.workSchedule} onValueChange={(value) => updateFormData('workSchedule', value)}>
          <SelectTrigger className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl">
            <SelectValue placeholder="Select schedule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time (40+ hours)</SelectItem>
            <SelectItem value="part-time">Part-time (20-39 hours)</SelectItem>
            <SelectItem value="remote">Work from home</SelectItem>
            <SelectItem value="flexible">Flexible schedule</SelectItem>
            <SelectItem value="retired">Retired</SelectItem>
            <SelectItem value="student">Student</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="whyAdopt">Why do you want to adopt a pet?</Label>
        <Textarea
          id="whyAdopt"
          value={formData.whyAdopt}
          onChange={(e) => updateFormData('whyAdopt', e.target.value)}
          placeholder="Tell us your motivation for adopting..."
          className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl min-h-[100px]"
          required
        />
      </div>

      <div>
        <Label htmlFor="whyThisPet">Why are you interested in {pet.name} specifically?</Label>
        <Textarea
          id="whyThisPet"
          value={formData.whyThisPet}
          onChange={(e) => updateFormData('whyThisPet', e.target.value)}
          placeholder="What drew you to this particular pet?"
          className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl min-h-[100px]"
          required
        />
      </div>
    </div>
  );

  const renderFinalStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FileText className="w-12 h-12 text-pink-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-800">Final Details & Agreement</h3>
        <p className="text-gray-600">Complete your application</p>
      </div>

      <div>
        <Label htmlFor="vetReference">Veterinarian Reference (if applicable)</Label>
        <Input
          id="vetReference"
          value={formData.vetReference}
          onChange={(e) => updateFormData('vetReference', e.target.value)}
          placeholder="Vet clinic name and phone number"
          className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl"
        />
      </div>

      <div>
        <Label htmlFor="emergencyPlan">What is your plan if you can no longer care for the pet?</Label>
        <Textarea
          id="emergencyPlan"
          value={formData.emergencyPlan}
          onChange={(e) => updateFormData('emergencyPlan', e.target.value)}
          placeholder="Describe your backup plan..."
          className="mt-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl"
          required
        />
      </div>

      {/* Document Upload Section */}
      <Card className="p-6 bg-gray-50 rounded-xl">
        <h4 className="font-semibold text-gray-800 mb-3">Document Upload</h4>
        <p className="text-sm text-gray-600 mb-4">
          Please upload any relevant documents (ID, lease agreement, etc.)
        </p>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 mb-2">Drag and drop files here, or click to select</p>
          <Button variant="outline" className="border-2 border-pink-300 text-pink-600 rounded-xl">
            Choose Files
          </Button>
        </div>
      </Card>

      {/* Agreements */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreesToTerms"
            checked={formData.agreesToTerms}
            onCheckedChange={(checked) => updateFormData('agreesToTerms', checked)}
            className="mt-1"
          />
          <Label htmlFor="agreesToTerms" className="text-sm leading-relaxed">
            I agree to the terms and conditions of adoption, including the adoption fee of ${pet.adoptionFee} and understand that this application does not guarantee adoption.
          </Label>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreesToHomeVisit"
            checked={formData.agreesToHomeVisit}
            onCheckedChange={(checked) => updateFormData('agreesToHomeVisit', checked)}
            className="mt-1"
          />
          <Label htmlFor="agreesToHomeVisit" className="text-sm leading-relaxed">
            I consent to a home visit as part of the adoption process and understand that all information provided will be verified.
          </Label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('pet-profile', pet.id)}
          className="mb-6 text-gray-600 hover:text-pink-600 rounded-xl"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to {pet.name}'s Profile
        </Button>

        {/* Pet Info Header */}
        <Card className="p-6 mb-8 bg-white rounded-2xl shadow-lg border-0">
          <div className="flex items-center gap-4">
            <ImageWithFallback
              src={pet.images[0]}
              alt={pet.name}
              className="w-16 h-16 object-cover rounded-xl"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Adoption Application</h1>
              <p className="text-gray-600">
                Applying to adopt <span className="font-semibold text-pink-600">{pet.name}</span> - {pet.breed}
              </p>
            </div>
          </div>
        </Card>

        {/* Progress Bar */}
        <Card className="p-6 mb-8 bg-white rounded-2xl shadow-lg border-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Application Progress</h2>
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Personal Info</span>
            <span>Housing</span>
            <span>Experience</span>
            <span>Final Details</span>
          </div>
        </Card>

        {/* Form Content */}
        <Card className="p-8 bg-white rounded-2xl shadow-lg border-0">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderPersonalInfo()}
            {currentStep === 2 && renderHousingInfo()}
            {currentStep === 3 && renderExperience()}
            {currentStep === 4 && renderFinalStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl px-6"
              >
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl px-6"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!formData.agreesToTerms || !formData.agreesToHomeVisit}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdoptionFormPage;