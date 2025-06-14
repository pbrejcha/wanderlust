import React, { useState, useEffect, useCallback } from 'react';
import { styled } from '@linaria/react';
import { Trip, Itinerary, ItineraryFormData } from '../types';
import { ItineraryService } from '../services/itineraryService';
import ItineraryForm from './ItineraryForm';
import ItineraryList from './ItineraryList';

// Reuse colors from App.tsx
const colors = {
  primary: '#3498db',
  primaryDark: '#2980b9',
  textPrimary: '#2c3e50',
  textSecondary: '#555',
  textLight: '#ffffff',
  backgroundWhite: '#ffffff',
  borderLight: '#e0e0e0',
  shadowPrimary: 'rgba(52, 152, 219, 0.3)',
};

const ManagerContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const TripTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0 0 0.5rem 0;
`;

const TripDates = styled.p`
  font-size: 1.1rem;
  color: ${colors.textSecondary};
  margin: 0 0 1rem 0;
`;

const TripDescription = styled.p`
  font-size: 1rem;
  color: ${colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 2px solid ${colors.borderLight};
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
  color: ${colors.textLight};
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px ${colors.shadowPrimary};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ContentSection = styled.div`
  margin-bottom: 2rem;
`;

const ConfirmDialog = styled.div`
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

const ConfirmContent = styled.div`
  background: ${colors.backgroundWhite};
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const ConfirmTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 1rem 0;
`;

const ConfirmText = styled.p`
  color: ${colors.textSecondary};
  margin: 0 0 2rem 0;
  line-height: 1.5;
`;

const ConfirmButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const ConfirmButton = styled.button<{ variant?: 'danger' | 'cancel' }>`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid;
  
  ${props => props.variant === 'danger' ? `
    background: #e74c3c;
    color: ${colors.textLight};
    border-color: #e74c3c;
    
    &:hover {
      background: #c0392b;
      border-color: #c0392b;
    }
  ` : `
    background: ${colors.backgroundWhite};
    color: ${colors.textSecondary};
    border-color: ${colors.borderLight};
    
    &:hover {
      background: ${colors.borderLight};
    }
  `}
`;

interface ItineraryManagerProps {
  trip: Trip;
}

const ItineraryManager: React.FC<ItineraryManagerProps> = ({ trip }) => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState<Itinerary | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadItineraries = useCallback(() => {
    const tripItineraries = ItineraryService.getItinerariesSorted(trip.id);
    setItineraries(tripItineraries);
  }, [trip.id]);

  useEffect(() => {
    loadItineraries();
  }, [loadItineraries]);

  const handleAddClick = () => {
    setEditingItinerary(null);
    setShowForm(true);
  };

  const handleEditClick = (itinerary: Itinerary) => {
    setEditingItinerary(itinerary);
    setShowForm(true);
  };

  const handleFormSubmit = (formData: ItineraryFormData) => {
    if (editingItinerary) {
      // Update existing itinerary
      ItineraryService.updateItinerary(editingItinerary.id, formData);
    } else {
      // Create new itinerary
      ItineraryService.createItinerary(trip.id, formData);
    }
    
    setShowForm(false);
    setEditingItinerary(null);
    loadItineraries();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingItinerary(null);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      ItineraryService.deleteItinerary(deleteConfirm);
      setDeleteConfirm(null);
      loadItineraries();
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleDateString();
    const end = new Date(endDate).toLocaleDateString();
    return start === end ? start : `${start} - ${end}`;
  };

  const getFormInitialData = (): ItineraryFormData | undefined => {
    if (!editingItinerary) return undefined;
    
    return {
      title: editingItinerary.title,
      description: editingItinerary.description,
      startDate: editingItinerary.startDate,
      endDate: editingItinerary.endDate,
      startTime: editingItinerary.startTime,
      endTime: editingItinerary.endTime,
      poi: editingItinerary.poi ? {
        name: editingItinerary.poi.name,
        address: editingItinerary.poi.address,
        description: editingItinerary.poi.description
      } : undefined
    };
  };

  return (
    <ManagerContainer>
      <Header>
        <TripTitle>{trip.title}</TripTitle>
        <TripDates>{formatDateRange(trip.startDate, trip.endDate)}</TripDates>
        <TripDescription>{trip.description}</TripDescription>
      </Header>

      <ActionsBar>
        <SectionTitle>Itineraries ({itineraries.length})</SectionTitle>
        <AddButton onClick={handleAddClick}>
          + Add Itinerary
        </AddButton>
      </ActionsBar>

      <ContentSection>
        {showForm ? (
          <ItineraryForm
            initialData={getFormInitialData()}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            submitLabel={editingItinerary ? 'Update Itinerary' : 'Create Itinerary'}
          />
        ) : (
          <ItineraryList
            itineraries={itineraries}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}
      </ContentSection>

      {deleteConfirm && (
        <ConfirmDialog>
          <ConfirmContent>
            <ConfirmTitle>Delete Itinerary</ConfirmTitle>
            <ConfirmText>
              Are you sure you want to delete this itinerary? This action cannot be undone.
            </ConfirmText>
            <ConfirmButtons>
              <ConfirmButton onClick={cancelDelete}>Cancel</ConfirmButton>
              <ConfirmButton variant="danger" onClick={confirmDelete}>
                Delete
              </ConfirmButton>
            </ConfirmButtons>
          </ConfirmContent>
        </ConfirmDialog>
      )}
    </ManagerContainer>
  );
};

export default ItineraryManager;