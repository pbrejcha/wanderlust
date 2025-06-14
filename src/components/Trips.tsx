import React, { useState } from 'react';
import { styled } from '@linaria/react';
import { useTravelContext } from '../context/TravelContext';
import { Link } from '@tanstack/react-router';

// Reusing colors from App.tsx
const colors = {
  primary: '#3498db',
  primaryDark: '#2980b9',
  textPrimary: '#2c3e50',
  textSecondary: '#555',
  textLight: '#ffffff',
  backgroundWhite: '#ffffff',
  borderLight: '#e0e0e0',
  shadowPrimary: 'rgba(52, 152, 219, 0.3)',
  shadowPrimaryHover: 'rgba(52, 152, 219, 0.4)',
};

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
  color: ${colors.textLight};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px ${colors.shadowPrimary};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${colors.shadowPrimaryHover};
  }
`;

const TripGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TripCard = styled.div`
  background: ${colors.backgroundWhite};
  border: 1px solid ${colors.borderLight};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const TripName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 0.5rem 0;
`;

const TripDestination = styled.p`
  color: ${colors.textSecondary};
  margin: 0 0 0.5rem 0;
  font-weight: 500;
`;

const TripDescription = styled.p`
  color: ${colors.textSecondary};
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const TripDates = styled.p`
  color: ${colors.textSecondary};
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
`;

const ItineraryCount = styled.p`
  color: ${colors.primary};
  margin: 0 0 1rem 0;
  font-weight: 500;
  font-size: 0.9rem;
`;

const ViewButton = styled(Link)`
  display: inline-block;
  background: ${colors.primary};
  color: ${colors.textLight};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: ${colors.primaryDark};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${colors.backgroundWhite};
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  color: ${colors.textPrimary};
  margin: 0 0 1.5rem 0;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: ${colors.textPrimary};
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${colors.borderLight};
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${colors.borderLight};
  border-radius: 6px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const PrimaryButton = styled(Button)`
  background: ${colors.primary};
  color: ${colors.textLight};
  
  &:hover {
    background: ${colors.primaryDark};
  }
`;

const SecondaryButton = styled(Button)`
  background: ${colors.borderLight};
  color: ${colors.textPrimary};
  
  &:hover {
    background: #d0d0d0;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${colors.textSecondary};
`;

export const Trips = () => {
  const { trips, addTrip } = useTravelContext();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    destination: '',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTrip(formData);
    setFormData({
      name: '',
      description: '',
      destination: '',
      startDate: '',
      endDate: '',
    });
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Header>
        <Title>My Trips</Title>
        <AddButton onClick={() => setShowModal(true)}>
          Add New Trip
        </AddButton>
      </Header>

      {trips.length === 0 ? (
        <EmptyState>
          <h3>No trips yet</h3>
          <p>Start planning your next adventure by creating your first trip!</p>
        </EmptyState>
      ) : (
        <TripGrid>
          {trips.map((trip) => (
            <TripCard key={trip.id}>
              <TripName>{trip.name}</TripName>
              <TripDestination>📍 {trip.destination}</TripDestination>
              <TripDescription>{trip.description}</TripDescription>
              <TripDates>
                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
              </TripDates>
              <ItineraryCount>
                {trip.itineraries.length} itinerary{trip.itineraries.length !== 1 ? 'ies' : ''}
              </ItineraryCount>
              <ViewButton to={`/trips/${trip.id}`}>
                View Details
              </ViewButton>
            </TripCard>
          ))}
        </TripGrid>
      )}

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Add New Trip</ModalTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Trip Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="destination">Destination</Label>
                <Input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <TextArea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your trip..."
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <ButtonGroup>
                <PrimaryButton type="submit">Create Trip</PrimaryButton>
                <SecondaryButton type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </SecondaryButton>
              </ButtonGroup>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};