import React from 'react';
import { styled } from '@linaria/react';
import { Itinerary } from '../types';

// Reuse colors from App.tsx
const colors = {
  primary: '#3498db',
  primaryDark: '#2980b9',
  textPrimary: '#2c3e50',
  textSecondary: '#555',
  textLight: '#ffffff',
  backgroundWhite: '#ffffff',
  borderLight: '#e0e0e0',
  error: '#e74c3c',
  success: '#27ae60',
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItineraryCard = styled.div`
  background: ${colors.backgroundWhite};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${colors.borderLight};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ItineraryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ItineraryTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid;
  
  ${props => props.variant === 'delete' ? `
    background: ${colors.error};
    color: ${colors.textLight};
    border-color: ${colors.error};
    
    &:hover {
      background: #c0392b;
      border-color: #c0392b;
    }
  ` : `
    background: ${colors.primary};
    color: ${colors.textLight};
    border-color: ${colors.primary};
    
    &:hover {
      background: ${colors.primaryDark};
      border-color: ${colors.primaryDark};
    }
  `}
`;

const ItineraryDescription = styled.p`
  color: ${colors.textSecondary};
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const ItineraryDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DetailLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.span`
  font-size: 0.9rem;
  color: ${colors.textPrimary};
  font-weight: 500;
`;

const POISection = styled.div`
  background: rgba(52, 152, 219, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
`;

const POITitle = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.primary};
  margin: 0 0 0.5rem 0;
`;

const POIDetail = styled.p`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  margin: 0.25rem 0;
  line-height: 1.4;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${colors.textSecondary};
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.textSecondary};
  margin: 0 0 0.5rem 0;
`;

const EmptyStateText = styled.p`
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
`;

interface ItineraryListProps {
  itineraries: Itinerary[];
  onEdit: (itinerary: Itinerary) => void;
  onDelete: (id: string) => void;
}

const ItineraryList: React.FC<ItineraryListProps> = ({
  itineraries,
  onEdit,
  onDelete
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'Not specified';
    return timeString;
  };

  if (itineraries.length === 0) {
    return (
      <EmptyState>
        <EmptyStateTitle>No itineraries yet</EmptyStateTitle>
        <EmptyStateText>
          Create your first itinerary to start planning your trip activities.
        </EmptyStateText>
      </EmptyState>
    );
  }

  return (
    <ListContainer>
      {itineraries.map((itinerary) => (
        <ItineraryCard key={itinerary.id}>
          <ItineraryHeader>
            <ItineraryTitle>{itinerary.title}</ItineraryTitle>
            <ActionButtons>
              <ActionButton onClick={() => onEdit(itinerary)}>
                Edit
              </ActionButton>
              <ActionButton 
                variant="delete" 
                onClick={() => onDelete(itinerary.id)}
              >
                Delete
              </ActionButton>
            </ActionButtons>
          </ItineraryHeader>
          
          <ItineraryDescription>{itinerary.description}</ItineraryDescription>
          
          <ItineraryDetails>
            <DetailItem>
              <DetailLabel>Start Date</DetailLabel>
              <DetailValue>{formatDate(itinerary.startDate)}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel>End Date</DetailLabel>
              <DetailValue>{formatDate(itinerary.endDate)}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel>Start Time</DetailLabel>
              <DetailValue>{formatTime(itinerary.startTime)}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel>End Time</DetailLabel>
              <DetailValue>{formatTime(itinerary.endTime)}</DetailValue>
            </DetailItem>
          </ItineraryDetails>
          
          {itinerary.poi && (
            <POISection>
              <POITitle>📍 Point of Interest</POITitle>
              <POIDetail><strong>Name:</strong> {itinerary.poi.name}</POIDetail>
              {itinerary.poi.address && (
                <POIDetail><strong>Address:</strong> {itinerary.poi.address}</POIDetail>
              )}
              {itinerary.poi.description && (
                <POIDetail><strong>Description:</strong> {itinerary.poi.description}</POIDetail>
              )}
            </POISection>
          )}
        </ItineraryCard>
      ))}
    </ListContainer>
  );
};

export default ItineraryList;