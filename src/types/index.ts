// Point of Interest interface
export interface POI {
  id: string;
  name: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  description?: string;
}

// Itinerary interface with required fields
export interface Itinerary {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  startTime?: string; // Optional time in HH:MM format
  endTime?: string; // Optional time in HH:MM format
  poi?: POI; // Optional point of interest
  tripId: string; // Reference to parent trip
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Trip interface
export interface Trip {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Form data for creating/editing itineraries
export interface ItineraryFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  poi?: Partial<POI>;
}

// Validation error interface
export interface ValidationError {
  field: string;
  message: string;
}