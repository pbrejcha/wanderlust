import React, { useState, useEffect } from 'react';
import { styled } from '@linaria/react';
import { ItineraryFormData, ValidationError } from '../types';
import { validateItinerary, getFieldError } from '../utils/validation';

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

const FormContainer = styled.div`
  background: ${colors.backgroundWhite};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid ${colors.borderLight};
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 1.5rem 0;
`;

const FormGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr 1fr;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: ${colors.textPrimary};
  font-size: 0.9rem;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 0.8rem;
  border: 2px solid ${props => props.hasError ? colors.error : colors.borderLight};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? colors.error : colors.primary};
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  padding: 0.8rem;
  border: 2px solid ${props => props.hasError ? colors.error : colors.borderLight};
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? colors.error : colors.primary};
  }
`;

const ErrorMessage = styled.span`
  color: ${colors.error};
  font-size: 0.8rem;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid;
  
  ${props => props.variant === 'primary' ? `
    background: ${colors.primary};
    color: ${colors.textLight};
    border-color: ${colors.primary};
    
    &:hover {
      background: ${colors.primaryDark};
      border-color: ${colors.primaryDark};
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

const RequiredIndicator = styled.span`
  color: ${colors.error};
  margin-left: 0.25rem;
`;

interface ItineraryFormProps {
  initialData?: ItineraryFormData;
  onSubmit: (data: ItineraryFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

const ItineraryForm: React.FC<ItineraryFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Save Itinerary'
}) => {
  const [formData, setFormData] = useState<ItineraryFormData>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    poi: {
      name: '',
      address: '',
      description: ''
    }
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: keyof ItineraryFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePOIChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      poi: {
        ...prev.poi,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateItinerary(formData);
    setErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <FormContainer>
      <FormTitle>{initialData ? 'Edit Itinerary' : 'Add New Itinerary'}</FormTitle>
      
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup className="full-width">
            <Label>
              Title<RequiredIndicator>*</RequiredIndicator>
            </Label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              hasError={!!getFieldError(errors, 'title')}
              placeholder="Enter itinerary title"
            />
            {getFieldError(errors, 'title') && (
              <ErrorMessage>{getFieldError(errors, 'title')}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup className="full-width">
            <Label>
              Description<RequiredIndicator>*</RequiredIndicator>
            </Label>
            <TextArea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              hasError={!!getFieldError(errors, 'description')}
              placeholder="Describe your itinerary"
            />
            {getFieldError(errors, 'description') && (
              <ErrorMessage>{getFieldError(errors, 'description')}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>
              Start Date<RequiredIndicator>*</RequiredIndicator>
            </Label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              hasError={!!getFieldError(errors, 'startDate')}
            />
            {getFieldError(errors, 'startDate') && (
              <ErrorMessage>{getFieldError(errors, 'startDate')}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>
              End Date<RequiredIndicator>*</RequiredIndicator>
            </Label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              hasError={!!getFieldError(errors, 'endDate')}
            />
            {getFieldError(errors, 'endDate') && (
              <ErrorMessage>{getFieldError(errors, 'endDate')}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Start Time (Optional)</Label>
            <Input
              type="time"
              value={formData.startTime || ''}
              onChange={(e) => handleChange('startTime', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>End Time (Optional)</Label>
            <Input
              type="time"
              value={formData.endTime || ''}
              onChange={(e) => handleChange('endTime', e.target.value)}
              hasError={!!getFieldError(errors, 'endTime')}
            />
            {getFieldError(errors, 'endTime') && (
              <ErrorMessage>{getFieldError(errors, 'endTime')}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup className="full-width">
            <Label>Point of Interest (Optional)</Label>
            <Input
              type="text"
              value={formData.poi?.name || ''}
              onChange={(e) => handlePOIChange('name', e.target.value)}
              placeholder="Name of place or attraction"
            />
          </FormGroup>

          <FormGroup className="full-width">
            <Label>POI Address (Optional)</Label>
            <Input
              type="text"
              value={formData.poi?.address || ''}
              onChange={(e) => handlePOIChange('address', e.target.value)}
              placeholder="Address of the point of interest"
            />
          </FormGroup>

          <FormGroup className="full-width">
            <Label>POI Description (Optional)</Label>
            <TextArea
              value={formData.poi?.description || ''}
              onChange={(e) => handlePOIChange('description', e.target.value)}
              placeholder="Additional details about the point of interest"
            />
          </FormGroup>
        </FormGrid>

        <ButtonGroup>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {submitLabel}
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default ItineraryForm;