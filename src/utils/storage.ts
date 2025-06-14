import { Trip, Itinerary } from '../types';

const TRIPS_KEY = 'wanderlust_trips';
const ITINERARIES_KEY = 'wanderlust_itineraries';

// Trip storage utilities
export const saveTrips = (trips: Trip[]): void => {
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
};

export const loadTrips = (): Trip[] => {
  const stored = localStorage.getItem(TRIPS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getTripById = (id: string): Trip | undefined => {
  const trips = loadTrips();
  return trips.find(trip => trip.id === id);
};

// Itinerary storage utilities
export const saveItineraries = (itineraries: Itinerary[]): void => {
  localStorage.setItem(ITINERARIES_KEY, JSON.stringify(itineraries));
};

export const loadItineraries = (): Itinerary[] => {
  const stored = localStorage.getItem(ITINERARIES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getItinerariesByTripId = (tripId: string): Itinerary[] => {
  const itineraries = loadItineraries();
  return itineraries.filter(itinerary => itinerary.tripId === tripId);
};

export const getItineraryById = (id: string): Itinerary | undefined => {
  const itineraries = loadItineraries();
  return itineraries.find(itinerary => itinerary.id === id);
};

// Utility function to generate unique IDs
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Initialize with sample data if empty
export const initializeSampleData = (): void => {
  const trips = loadTrips();
  if (trips.length === 0) {
    const sampleTrip: Trip = {
      id: generateId(),
      title: 'European Adventure',
      description: 'A wonderful journey through Europe',
      startDate: '2024-06-01',
      endDate: '2024-06-15',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveTrips([sampleTrip]);
  }
};