export interface POI {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  address?: string;
  description?: string;
  category?: string;
  confirmed: boolean;
}

export interface Itinerary {
  id: string;
  name: string;
  pois: POI[];
  createdAt: Date;
}