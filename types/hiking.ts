export interface HikingSpot {
  id: string;
  name: string;
  location: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  rating: number;
  reviewCount: number;
  distance: string;
  image: string;
  featured: boolean;
  description: string;
  weatherConditions: string;
  wildlifePresent: boolean;
  wildlifeDetails: string;
  permissionRequired: boolean;
  permissionDetails: string;
  nearbyShops: boolean;
  shopDetails: string;
  ticketRequired: boolean;
  ticketPrice: string;
  dangerousSpots: string;
  waterAvailable: boolean;
  campingAllowed: boolean;
  campingDetails: string;
  distanceFromUser: string;
  addedBy: string;
  addedDate: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  trailsVisited: number;
  reviewsCount: number;
  achievements: Achievement[];
  joinDate: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedDate: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  placeId: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: DailyForecast[];
}

export interface DailyForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
}