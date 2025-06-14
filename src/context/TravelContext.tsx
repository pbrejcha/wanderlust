import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Trip, Itinerary } from '../types';

interface TravelContextType {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id' | 'createdAt' | 'updatedAt' | 'itineraries'>) => void;
  updateTrip: (id: string, trip: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addItinerary: (tripId: string, itinerary: Omit<Itinerary, 'id' | 'createdAt' | 'updatedAt' | 'tripId'>) => void;
  updateItinerary: (id: string, itinerary: Partial<Itinerary>) => void;
  deleteItinerary: (id: string) => void;
  getTripById: (id: string) => Trip | undefined;
  getItinerariesByTripId: (tripId: string) => Itinerary[];
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const useTravelContext = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravelContext must be used within a TravelProvider');
  }
  return context;
};

const generateId = () => Math.random().toString(36).substr(2, 9);
const getCurrentTimestamp = () => new Date().toISOString();

export const TravelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);

  const addTrip = (tripData: Omit<Trip, 'id' | 'createdAt' | 'updatedAt' | 'itineraries'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: generateId(),
      itineraries: [],
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };
    setTrips(prev => [...prev, newTrip]);
  };

  const updateTrip = (id: string, tripData: Partial<Trip>) => {
    setTrips(prev => prev.map(trip => 
      trip.id === id 
        ? { ...trip, ...tripData, updatedAt: getCurrentTimestamp() }
        : trip
    ));
  };

  const deleteTrip = (id: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== id));
  };

  const addItinerary = (tripId: string, itineraryData: Omit<Itinerary, 'id' | 'createdAt' | 'updatedAt' | 'tripId'>) => {
    const newItinerary: Itinerary = {
      ...itineraryData,
      id: generateId(),
      tripId,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };

    setTrips(prev => prev.map(trip => 
      trip.id === tripId 
        ? { 
            ...trip, 
            itineraries: [...trip.itineraries, newItinerary],
            updatedAt: getCurrentTimestamp()
          }
        : trip
    ));
  };

  const updateItinerary = (id: string, itineraryData: Partial<Itinerary>) => {
    setTrips(prev => prev.map(trip => ({
      ...trip,
      itineraries: trip.itineraries.map(itinerary =>
        itinerary.id === id
          ? { ...itinerary, ...itineraryData, updatedAt: getCurrentTimestamp() }
          : itinerary
      ),
      updatedAt: trip.itineraries.some(it => it.id === id) ? getCurrentTimestamp() : trip.updatedAt
    })));
  };

  const deleteItinerary = (id: string) => {
    setTrips(prev => prev.map(trip => ({
      ...trip,
      itineraries: trip.itineraries.filter(itinerary => itinerary.id !== id),
      updatedAt: trip.itineraries.some(it => it.id === id) ? getCurrentTimestamp() : trip.updatedAt
    })));
  };

  const getTripById = (id: string): Trip | undefined => {
    return trips.find(trip => trip.id === id);
  };

  const getItinerariesByTripId = (tripId: string): Itinerary[] => {
    const trip = getTripById(tripId);
    return trip ? trip.itineraries : [];
  };

  const value: TravelContextType = {
    trips,
    addTrip,
    updateTrip,
    deleteTrip,
    addItinerary,
    updateItinerary,
    deleteItinerary,
    getTripById,
    getItinerariesByTripId,
  };

  return (
    <TravelContext.Provider value={value}>
      {children}
    </TravelContext.Provider>
  );
};