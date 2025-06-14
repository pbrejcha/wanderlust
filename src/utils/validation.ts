import { ItineraryFormData, ValidationError } from '../types';

export const validateItinerary = (data: ItineraryFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validate required fields
  if (!data.title.trim()) {
    errors.push({ field: 'title', message: 'Title is required' });
  }

  if (!data.description.trim()) {
    errors.push({ field: 'description', message: 'Description is required' });
  }

  if (!data.startDate) {
    errors.push({ field: 'startDate', message: 'Start date is required' });
  }

  if (!data.endDate) {
    errors.push({ field: 'endDate', message: 'End date is required' });
  }

  // Validate date logic
  if (data.startDate && data.endDate) {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    
    if (startDate > endDate) {
      errors.push({ field: 'endDate', message: 'End date must be after start date' });
    }
  }

  // Validate time logic if both times are provided
  if (data.startTime && data.endTime && data.startDate === data.endDate) {
    const [startHour, startMin] = data.startTime.split(':').map(Number);
    const [endHour, endMin] = data.endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    if (startMinutes >= endMinutes) {
      errors.push({ field: 'endTime', message: 'End time must be after start time on the same day' });
    }
  }

  // Validate title length
  if (data.title.length > 100) {
    errors.push({ field: 'title', message: 'Title must be 100 characters or less' });
  }

  // Validate description length
  if (data.description.length > 500) {
    errors.push({ field: 'description', message: 'Description must be 500 characters or less' });
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationError[]): boolean => {
  return errors.length > 0;
};

export const getFieldError = (errors: ValidationError[], field: string): string | undefined => {
  const error = errors.find(e => e.field === field);
  return error?.message;
};