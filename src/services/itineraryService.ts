import { Itinerary, ItineraryFormData } from '../types';
import { 
  loadItineraries, 
  saveItineraries, 
  getItinerariesByTripId,
  getItineraryById,
  generateId 
} from '../utils/storage';

export class ItineraryService {
  // Create a new itinerary
  static createItinerary(tripId: string, formData: ItineraryFormData): Itinerary {
    const now = new Date().toISOString();
    
    const newItinerary: Itinerary = {
      id: generateId(),
      tripId,
      title: formData.title,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      poi: formData.poi ? {
        id: formData.poi.id || generateId(),
        name: formData.poi.name || '',
        latitude: formData.poi.latitude,
        longitude: formData.poi.longitude,
        address: formData.poi.address,
        description: formData.poi.description,
      } : undefined,
      createdAt: now,
      updatedAt: now,
    };

    const itineraries = loadItineraries();
    itineraries.push(newItinerary);
    saveItineraries(itineraries);

    return newItinerary;
  }

  // Get all itineraries for a trip
  static getItinerariesForTrip(tripId: string): Itinerary[] {
    return getItinerariesByTripId(tripId);
  }

  // Get a specific itinerary by ID
  static getItinerary(id: string): Itinerary | undefined {
    return getItineraryById(id);
  }

  // Update an existing itinerary
  static updateItinerary(id: string, formData: ItineraryFormData): Itinerary | null {
    const itineraries = loadItineraries();
    const index = itineraries.findIndex(itinerary => itinerary.id === id);
    
    if (index === -1) {
      return null;
    }

    const existing = itineraries[index];
    const updatedItinerary: Itinerary = {
      ...existing,
      title: formData.title,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      poi: formData.poi ? {
        id: formData.poi.id || existing.poi?.id || generateId(),
        name: formData.poi.name || '',
        latitude: formData.poi.latitude,
        longitude: formData.poi.longitude,
        address: formData.poi.address,
        description: formData.poi.description,
      } : undefined,
      updatedAt: new Date().toISOString(),
    };

    itineraries[index] = updatedItinerary;
    saveItineraries(itineraries);

    return updatedItinerary;
  }

  // Delete an itinerary
  static deleteItinerary(id: string): boolean {
    const itineraries = loadItineraries();
    const index = itineraries.findIndex(itinerary => itinerary.id === id);
    
    if (index === -1) {
      return false;
    }

    itineraries.splice(index, 1);
    saveItineraries(itineraries);
    return true;
  }

  // Get itineraries sorted by start date
  static getItinerariesSorted(tripId: string): Itinerary[] {
    const itineraries = getItinerariesByTripId(tripId);
    return itineraries.sort((a, b) => {
      const dateA = new Date(`${a.startDate}T${a.startTime || '00:00'}`);
      const dateB = new Date(`${b.startDate}T${b.startTime || '00:00'}`);
      return dateA.getTime() - dateB.getTime();
    });
  }
}