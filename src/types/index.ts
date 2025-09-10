export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed: string;
  age: number;
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large';
  location: string;
  description: string;
  personality: string[];
  vaccinated: boolean;
  spayed: boolean;
  images: string[];
  adoptionFee: number;
  status: 'available' | 'pending' | 'adopted';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Application {
  id: string;
  userId: string;
  petId: string;
  status: 'pending' | 'approved' | 'rejected';
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  petExperience: string;
  whyAdopt: string;
  submittedAt: Date;
}

export interface Testimonial {
  id: string;
  userName: string;
  petName: string;
  story: string;
  image: string;
  date: Date;
}

export interface FilterOptions {
  species?: string;
  breed?: string;
  age?: string;
  gender?: string;
  size?: string;
  location?: string;
}