import React, { useState, useEffect } from 'react';
import { styled } from '@linaria/react';
import { Trip } from '../types';
import { loadTrips, initializeSampleData } from '../utils/storage';
import ItineraryManager from './ItineraryManager';

// Reuse colors from App.tsx
const colors = {
  primary: '#3498db',
  primaryDark: '#2980b9',
  textPrimary: '#2c3e50',
  textSecondary: '#555',
  textLight: '#ffffff',
  backgroundBeige: '#f5f5dc',
  backgroundWhite: '#ffffff',
  backgroundWhiteTransparent: 'rgba(255, 255, 255, 0.8)',
  borderLight: '#e0e0e0',
  gradientPurpleLight: '#667eea',
  gradientPurpleDark: '#764ba2',
  shadowPrimary: 'rgba(52, 152, 219, 0.3)',
  shadowPrimaryHover: 'rgba(52, 152, 219, 0.4)',
};

const TripsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const TripsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const TripsTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0 0 1rem 0;
`;

const TripsSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${colors.textSecondary};
  margin: 0;
`;

const TripsList = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const TripCard = styled.div`
  background: ${colors.backgroundWhite};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  border: 1px solid ${colors.borderLight};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const TripTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 0.5rem 0;
`;

const TripDescription = styled.p`
  color: ${colors.textSecondary};
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const TripDates = styled.div`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  font-weight: 500;
`;

const BackButton = styled.button`
  background: ${colors.backgroundWhite};
  color: ${colors.primary};
  border: 2px solid ${colors.primary};
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.primary};
    color: ${colors.textLight};
  }
`;

interface TripsPageProps {
  onNavigateHome: () => void;
}

const TripsPage: React.FC<TripsPageProps> = ({ onNavigateHome }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  useEffect(() => {
    initializeSampleData();
    setTrips(loadTrips());
  }, []);

  const handleTripSelect = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleBackToTrips = () => {
    setSelectedTrip(null);
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleDateString();
    const end = new Date(endDate).toLocaleDateString();
    return `${start} - ${end}`;
  };

  if (selectedTrip) {
    return (
      <TripsContainer>
        <BackButton onClick={handleBackToTrips}>
          ← Back to Trips
        </BackButton>
        <ItineraryManager trip={selectedTrip} />
      </TripsContainer>
    );
  }

  return (
    <TripsContainer>
      <BackButton onClick={onNavigateHome}>
        ← Back to Home
      </BackButton>
      
      <TripsHeader>
        <TripsTitle>Your Trips</TripsTitle>
        <TripsSubtitle>Manage your travel itineraries</TripsSubtitle>
      </TripsHeader>

      <TripsList>
        {trips.map((trip) => (
          <TripCard key={trip.id} onClick={() => handleTripSelect(trip)}>
            <TripTitle>{trip.title}</TripTitle>
            <TripDescription>{trip.description}</TripDescription>
            <TripDates>{formatDateRange(trip.startDate, trip.endDate)}</TripDates>
          </TripCard>
        ))}
      </TripsList>
    </TripsContainer>
  );
};

export default TripsPage;