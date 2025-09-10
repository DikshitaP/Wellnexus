import { Pet, Testimonial } from '../types';

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    species: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'male',
    size: 'large',
    location: 'San Francisco, CA',
    description: 'Buddy is a friendly and energetic Golden Retriever who loves playing fetch and going on long walks. He\'s great with kids and other dogs.',
    personality: ['friendly', 'energetic', 'playful'],
    vaccinated: true,
    spayed: true,
    images: ['https://images.unsplash.com/photo-1720705313994-12cd7930da3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMGFkb3B0aW9ufGVufDF8fHx8MTc1NjkyMDk0N3ww&ixlib=rb-4.1.0&q=80&w=1080'],
    adoptionFee: 250,
    status: 'available'
  },
  {
    id: '2',
    name: 'Luna',
    species: 'cat',
    breed: 'Siamese',
    age: 2,
    gender: 'female',
    size: 'medium',
    location: 'Oakland, CA',
    description: 'Luna is a beautiful and intelligent Siamese cat who loves to cuddle and play with feather toys. She\'s very social and loves attention.',
    personality: ['affectionate', 'intelligent', 'social'],
    vaccinated: true,
    spayed: true,
    images: ['https://images.unsplash.com/photo-1609074418406-d197af17b4b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcmVzY3VlfGVufDF8fHx8MTc1NjkyMDk0N3ww&ixlib=rb-4.1.0&q=80&w=1080'],
    adoptionFee: 150,
    status: 'available'
  },
  {
    id: '3',
    name: 'Max',
    species: 'dog',
    breed: 'Labrador Mix',
    age: 5,
    gender: 'male',
    size: 'large',
    location: 'Berkeley, CA',
    description: 'Max is a gentle giant who loves long walks and relaxing in the yard. He\'s perfect for a family looking for a calm, loving companion.',
    personality: ['gentle', 'calm', 'loyal'],
    vaccinated: true,
    spayed: true,
    images: ['https://images.unsplash.com/photo-1720705313994-12cd7930da3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMGFkb3B0aW9ufGVufDF8fHx8MTc1NjkyMDk0N3ww&ixlib=rb-4.1.0&q=80&w=1080'],
    adoptionFee: 200,
    status: 'available'
  },
  {
    id: '4',
    name: 'Whiskers',
    species: 'cat',
    breed: 'Domestic Shorthair',
    age: 1,
    gender: 'male',
    size: 'small',
    location: 'San Francisco, CA',
    description: 'Whiskers is a playful kitten who loves to explore and chase toys. He\'s very curious and would do well in an active household.',
    personality: ['playful', 'curious', 'active'],
    vaccinated: true,
    spayed: false,
    images: ['https://images.unsplash.com/photo-1609074418406-d197af17b4b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcmVzY3VlfGVufDF8fHx8MTc1NjkyMDk0N3ww&ixlib=rb-4.1.0&q=80&w=1080'],
    adoptionFee: 100,
    status: 'available'
  },
  {
    id: '5',
    name: 'Bella',
    species: 'dog',
    breed: 'Border Collie',
    age: 4,
    gender: 'female',
    size: 'medium',
    location: 'Palo Alto, CA',
    description: 'Bella is an intelligent and active Border Collie who loves mental stimulation and physical exercise. She would thrive with an active family.',
    personality: ['intelligent', 'active', 'trainable'],
    vaccinated: true,
    spayed: true,
    images: ['https://images.unsplash.com/photo-1720705313994-12cd7930da3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMGFkb3B0aW9ufGVufDF8fHx8MTc1NjkyMDk0N3ww&ixlib=rb-4.1.0&q=80&w=1080'],
    adoptionFee: 300,
    status: 'available'
  },
  {
    id: '6',
    name: 'Shadow',
    species: 'cat',
    breed: 'Maine Coon',
    age: 6,
    gender: 'male',
    size: 'large',
    location: 'San Jose, CA',
    description: 'Shadow is a majestic Maine Coon who loves to lounge and observe. He\'s very laid-back and would be perfect for someone looking for a calm companion.',
    personality: ['calm', 'independent', 'majestic'],
    vaccinated: true,
    spayed: true,
    images: ['https://images.unsplash.com/photo-1609074418406-d197af17b4b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcmVzY3VlfGVufDF8fHx8MTc1NjkyMDk0N3ww&ixlib=rb-4.1.0&q=80&w=1080'],
    adoptionFee: 200,
    status: 'available'
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    userName: 'Sarah Johnson',
    petName: 'Charlie',
    story: 'Adopting Charlie was the best decision we ever made. He brought so much joy to our family and has been the perfect companion for our kids.',
    image: 'https://images.unsplash.com/photo-1550869678-3f22cdd0a409?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB3aXRoJTIwcGV0fGVufDF8fHx8MTc1NjkyMDk0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    date: new Date('2024-01-15')
  },
  {
    id: '2',
    userName: 'Michael Chen',
    petName: 'Mittens',
    story: 'Mittens has transformed our home with her playful energy and loving nature. The adoption process was smooth and the staff was incredibly helpful.',
    image: 'https://images.unsplash.com/photo-1550869678-3f22cdd0a409?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB3aXRoJTIwcGV0fGVufDF8fHx8MTc1NjkyMDk0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    date: new Date('2024-02-20')
  },
  {
    id: '3',
    userName: 'Emily Rodriguez',
    petName: 'Rocky',
    story: 'Rocky came to us a bit shy, but with patience and love, he has become the most loyal and loving dog. We couldn\'t imagine life without him.',
    image: 'https://images.unsplash.com/photo-1550869678-3f22cdd0a409?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB3aXRoJTIwcGV0fGVufDF8fHx8MTc1NjkyMDk0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    date: new Date('2024-03-10')
  }
];