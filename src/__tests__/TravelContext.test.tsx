import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TravelProvider, useTravelContext } from '../context/TravelContext';
import React from 'react';
import '@testing-library/jest-dom';

// Test component to verify context functionality
const TestComponent = () => {
  const { trips, addTrip, addItinerary } = useTravelContext();

  const handleAddTrip = () => {
    addTrip({
      name: 'Test Trip',
      description: 'A test trip',
      destination: 'Paris',
      startDate: '2024-01-01',
      endDate: '2024-01-07',
    });
  };

  const handleAddItinerary = () => {
    if (trips.length > 0) {
      addItinerary(trips[0].id, {
        name: 'Test Itinerary',
        description: 'A test itinerary',
        startDate: '2024-01-01',
        endDate: '2024-01-03',
        activities: [],
      });
    }
  };

  return (
    <div>
      <div data-testid="trip-count">{trips.length}</div>
      <div data-testid="itinerary-count">
        {trips.length > 0 ? trips[0].itineraries.length : 0}
      </div>
      <button onClick={handleAddTrip} data-testid="add-trip">
        Add Trip
      </button>
      <button onClick={handleAddItinerary} data-testid="add-itinerary">
        Add Itinerary
      </button>
      {trips.length > 0 && (
        <div data-testid="trip-name">{trips[0].name}</div>
      )}
      {trips.length > 0 && trips[0].itineraries.length > 0 && (
        <div data-testid="itinerary-name">{trips[0].itineraries[0].name}</div>
      )}
    </div>
  );
};

describe('TravelContext', () => {
  it('should handle trip and itinerary association correctly', () => {
    render(
      <TravelProvider>
        <TestComponent />
      </TravelProvider>
    );

    // Initially no trips
    expect(screen.getByTestId('trip-count')).toHaveTextContent('0');
    expect(screen.getByTestId('itinerary-count')).toHaveTextContent('0');

    // Add a trip
    fireEvent.click(screen.getByTestId('add-trip'));
    expect(screen.getByTestId('trip-count')).toHaveTextContent('1');
    expect(screen.getByTestId('trip-name')).toHaveTextContent('Test Trip');

    // Add an itinerary to the trip
    fireEvent.click(screen.getByTestId('add-itinerary'));
    expect(screen.getByTestId('itinerary-count')).toHaveTextContent('1');
    expect(screen.getByTestId('itinerary-name')).toHaveTextContent('Test Itinerary');
  });

  it('should properly associate itineraries with their parent trip', () => {
    const TestAssociation = () => {
      const { trips, addTrip, addItinerary } = useTravelContext();
      
      React.useEffect(() => {
        // Add a trip
        addTrip({
          name: 'Paris Trip',
          description: 'Exploring Paris',
          destination: 'Paris, France',
          startDate: '2024-06-01',
          endDate: '2024-06-10',
        });
      }, [addTrip]);

      React.useEffect(() => {
        if (trips.length > 0) {
          // Add multiple itineraries to the trip
          addItinerary(trips[0].id, {
            name: 'Museum Tour',
            description: 'Visit the Louvre and other museums',
            startDate: '2024-06-02',
            endDate: '2024-06-03',
            activities: [],
          });
          
          addItinerary(trips[0].id, {
            name: 'City Walk',
            description: 'Walk around the city center',
            startDate: '2024-06-04',
            endDate: '2024-06-04',
            activities: [],
          });
        }
      }, [trips, addItinerary]);

      return (
        <div>
          <div data-testid="trip-count">{trips.length}</div>
          {trips.map((trip) => (
            <div key={trip.id}>
              <div data-testid={`trip-${trip.id}-itinerary-count`}>
                {trip.itineraries.length}
              </div>
              {trip.itineraries.map((itinerary) => (
                <div key={itinerary.id} data-testid={`itinerary-${itinerary.id}-trip-id`}>
                  {itinerary.tripId}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    };

    render(
      <TravelProvider>
        <TestAssociation />
      </TravelProvider>
    );

    // Wait for effects to run
    setTimeout(() => {
      expect(screen.getByTestId('trip-count')).toHaveTextContent('1');
      // The trip should have 2 itineraries
      const tripElements = screen.getAllByTestId(/trip-.*-itinerary-count/);
      expect(tripElements[0]).toHaveTextContent('2');
      
      // Each itinerary should reference the correct trip ID
      const itineraryElements = screen.getAllByTestId(/itinerary-.*-trip-id/);
      expect(itineraryElements).toHaveLength(2);
    }, 100);
  });
});