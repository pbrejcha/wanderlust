import React, { useState } from 'react';
import { styled } from '@linaria/react';
import { useTravelContext } from '../context/TravelContext';
import { useParams, Link } from '@tanstack/react-router';
import { Itinerary, Activity } from '../types';

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

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${colors.primary};
  text-decoration: none;
  margin-bottom: 1rem;
  font-weight: 500;
  
  &:hover {
    color: ${colors.primaryDark};
  }
`;

const TripHeader = styled.div`
  background: ${colors.backgroundWhite};
  border: 1px solid ${colors.borderLight};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TripTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0 0 0.5rem 0;
`;

const TripDestination = styled.h2`
  font-size: 1.25rem;
  color: ${colors.textSecondary};
  margin: 0 0 1rem 0;
  font-weight: 500;
`;

const TripDescription = styled.p`
  color: ${colors.textSecondary};
  margin: 0 0 1rem 0;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const TripDates = styled.p`
  color: ${colors.textSecondary};
  margin: 0;
  font-size: 1rem;
`;

const ItinerariesSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
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

const ItineraryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const ItineraryCard = styled.div`
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

const ItineraryName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 0.5rem 0;
`;

const ItineraryDescription = styled.p`
  color: ${colors.textSecondary};
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const ItineraryDates = styled.p`
  color: ${colors.textSecondary};
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
`;

const ActivityCount = styled.p`
  color: ${colors.primary};
  margin: 0 0 1rem 0;
  font-weight: 500;
  font-size: 0.9rem;
`;

const ItineraryActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditButton = styled.button`
  background: ${colors.primary};
  color: ${colors.textLight};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: ${colors.primaryDark};
  }
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: ${colors.textLight};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #c0392b;
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
  border: 2px dashed ${colors.borderLight};
  border-radius: 12px;
`;

const NotFound = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${colors.textSecondary};
`;

export const TripDetail = () => {
  const { tripId } = useParams({ from: '/trips/$tripId' });
  const { getTripById, addItinerary, updateItinerary, deleteItinerary } = useTravelContext();
  const [showModal, setShowModal] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    activities: Activity[];
  }>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    activities: [],
  });

  const trip = getTripById(tripId);

  if (!trip) {
    return (
      <Container>
        <BackLink to="/trips">← Back to Trips</BackLink>
        <NotFound>
          <h2>Trip not found</h2>
          <p>The trip you're looking for doesn't exist.</p>
        </NotFound>
      </Container>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItinerary) {
      updateItinerary(editingItinerary, formData);
    } else {
      addItinerary(tripId, formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      activities: [],
    });
    setEditingItinerary(null);
    setShowModal(false);
  };

  const handleEdit = (itinerary: Itinerary) => {
    setFormData({
      name: itinerary.name,
      description: itinerary.description,
      startDate: itinerary.startDate,
      endDate: itinerary.endDate,
      activities: itinerary.activities,
    });
    setEditingItinerary(itinerary.id);
    setShowModal(true);
  };

  const handleDelete = (itineraryId: string) => {
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      deleteItinerary(itineraryId);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <BackLink to="/trips">← Back to Trips</BackLink>
      
      <TripHeader>
        <TripTitle>{trip.name}</TripTitle>
        <TripDestination>📍 {trip.destination}</TripDestination>
        <TripDescription>{trip.description}</TripDescription>
        <TripDates>
          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
        </TripDates>
      </TripHeader>

      <ItinerariesSection>
        <SectionHeader>
          <SectionTitle>Itineraries ({trip.itineraries.length})</SectionTitle>
          <AddButton onClick={() => setShowModal(true)}>
            Add Itinerary
          </AddButton>
        </SectionHeader>

        {trip.itineraries.length === 0 ? (
          <EmptyState>
            <h3>No itineraries yet</h3>
            <p>Start planning your trip by creating your first itinerary!</p>
          </EmptyState>
        ) : (
          <ItineraryGrid>
            {trip.itineraries.map((itinerary) => (
              <ItineraryCard key={itinerary.id}>
                <ItineraryName>{itinerary.name}</ItineraryName>
                <ItineraryDescription>{itinerary.description}</ItineraryDescription>
                <ItineraryDates>
                  {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
                </ItineraryDates>
                <ActivityCount>
                  {itinerary.activities.length} activity{itinerary.activities.length !== 1 ? 'ies' : ''}
                </ActivityCount>
                <ItineraryActions>
                  <EditButton onClick={() => handleEdit(itinerary)}>
                    Edit
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(itinerary.id)}>
                    Delete
                  </DeleteButton>
                </ItineraryActions>
              </ItineraryCard>
            ))}
          </ItineraryGrid>
        )}
      </ItinerariesSection>

      {showModal && (
        <Modal onClick={() => resetForm()}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>
              {editingItinerary ? 'Edit Itinerary' : 'Add New Itinerary'}
            </ModalTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Itinerary Name</Label>
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
                <Label htmlFor="description">Description</Label>
                <TextArea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe this itinerary..."
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
                <PrimaryButton type="submit">
                  {editingItinerary ? 'Update Itinerary' : 'Create Itinerary'}
                </PrimaryButton>
                <SecondaryButton type="button" onClick={resetForm}>
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