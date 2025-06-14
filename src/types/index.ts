export interface Itinerary {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  activities: Activity[];
  tripId: string; // Foreign key to associate with trip
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
}

export interface Trip {
  id: string;
  name: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  itineraries: Itinerary[]; // Array of associated itineraries
  createdAt: string;
  updatedAt: string;
}