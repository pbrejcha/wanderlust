import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { styled } from '@linaria/react';
import { POI } from '../types';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

// Color variables
const colors = {
  primary: '#3498db',
  primaryDark: '#2980b9',
  success: '#27ae60',
  warning: '#f39c12',
  danger: '#e74c3c',
  textPrimary: '#2c3e50',
  textSecondary: '#555',
  textLight: '#ffffff',
  backgroundWhite: '#ffffff',
  borderLight: '#e0e0e0',
  shadowLight: 'rgba(0, 0, 0, 0.1)',
}

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
`

const MapElement = styled.div`
  width: 100%;
  height: 100%;
`

const Sidebar = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 350px;
  max-height: calc(100% - 20px);
  background: ${colors.backgroundWhite};
  border-radius: 8px;
  border: 1px solid ${colors.borderLight};
  box-shadow: 0 4px 12px ${colors.shadowLight};
  overflow-y: auto;
  z-index: 1000;
  
  @media (max-width: 768px) {
    width: 280px;
  }
  
  @media (max-width: 480px) {
    position: relative;
    top: 0;
    right: 0;
    width: 100%;
    margin-top: 1rem;
  }
`

const SidebarHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${colors.borderLight};
  background: ${colors.primary};
  color: ${colors.textLight};
  border-radius: 8px 8px 0 0;
`

const SidebarTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`

const POIList = styled.div`
  padding: 1rem;
`

const POIItem = styled.div<{ confirmed: boolean }>`
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${colors.borderLight};
  border-radius: 6px;
  background: ${({ confirmed }) => confirmed ? '#f8f9fa' : colors.backgroundWhite};
  border-left: 4px solid ${({ confirmed }) => confirmed ? colors.success : colors.warning};
`

const POIName = styled.div`
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 0.25rem;
`

const POIAddress = styled.div`
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  margin-bottom: 0.5rem;
`

const POIActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ActionButton = styled.button<{ variant?: 'confirm' | 'remove' }>`
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ variant }) => variant === 'confirm' ? `
    background: ${colors.success};
    color: ${colors.textLight};
    
    &:hover {
      background: #229954;
    }
  ` : variant === 'remove' ? `
    background: ${colors.danger};
    color: ${colors.textLight};
    
    &:hover {
      background: #c0392b;
    }
  ` : `
    background: ${colors.primary};
    color: ${colors.textLight};
    
    &:hover {
      background: ${colors.primaryDark};
    }
  `}
`

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: ${colors.textSecondary};
`

const Instructions = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-top: 1px solid ${colors.borderLight};
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  line-height: 1.4;
`

// Default access token for demo purposes - in production, this should come from environment variables
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

const MapItinerary: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [pois, setPois] = useState<POI[]>([]);

  const addPOI = useCallback((poi: POI) => {
    setPois(prev => [...prev, poi]);
    
    // Create marker
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.style.backgroundColor = poi.confirmed ? colors.success : colors.warning;
    markerElement.style.width = '12px';
    markerElement.style.height = '12px';
    markerElement.style.borderRadius = '50%';
    markerElement.style.border = '2px solid white';
    markerElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
    markerElement.style.cursor = 'pointer';

    const marker = new mapboxgl.Marker({ element: markerElement })
      .setLngLat(poi.coordinates)
      .addTo(map.current!);

    // Add popup with POI details
    const popup = new mapboxgl.Popup({ offset: 15 })
      .setHTML(`
        <div style="padding: 0.5rem;">
          <strong>${poi.name}</strong><br>
          ${poi.address}<br>
          <small>Status: ${poi.confirmed ? 'Confirmed' : 'Pending'}</small>
        </div>
      `);
    
    marker.setPopup(popup);
    markersRef.current[poi.id] = marker;
  }, []);

  const handleMapClick = useCallback((e: mapboxgl.MapMouseEvent) => {
    const poi: POI = {
      id: `click-${Date.now()}`,
      name: `Point of Interest`,
      coordinates: [e.lngLat.lng, e.lngLat.lat],
      address: `${e.lngLat.lat.toFixed(4)}, ${e.lngLat.lng.toFixed(4)}`,
      confirmed: false
    };
    addPOI(poi);
  }, [addPOI]);

  // Initialize map
  useEffect(() => {
    if (map.current) return; // initialize map only once

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40], // Default to NYC area
      zoom: 10
    });

    // Add geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mapboxgl: mapboxgl as any,
      placeholder: 'Search for places...',
      proximity: {
        longitude: -74.5,
        latitude: 40
      }
    });

    map.current.addControl(geocoder, 'top-left');

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Handle map click to add POIs
    map.current.on('click', handleMapClick);

    // Handle geocoder result
    geocoder.on('result', (e) => {
      const result = e.result;
      const poi: POI = {
        id: `geocoder-${Date.now()}`,
        name: result.text || result.place_name,
        coordinates: result.center as [number, number],
        address: result.place_name,
        confirmed: false
      };
      addPOI(poi);
    });

    return () => {
      map.current?.remove();
    };
  }, [addPOI, handleMapClick]);

  const confirmPOI = useCallback((poiId: string) => {
    setPois(prev => prev.map(poi => 
      poi.id === poiId ? { ...poi, confirmed: true } : poi
    ));
    
    // Update marker color
    const marker = markersRef.current[poiId];
    if (marker) {
      const element = marker.getElement();
      element.style.backgroundColor = colors.success;
      
      // Update popup
      const poi = pois.find(p => p.id === poiId);
      if (poi) {
        const popup = new mapboxgl.Popup({ offset: 15 })
          .setHTML(`
            <div style="padding: 0.5rem;">
              <strong>${poi.name}</strong><br>
              ${poi.address}<br>
              <small>Status: Confirmed</small>
            </div>
          `);
        marker.setPopup(popup);
      }
    }
  }, [pois]);

  const removePOI = useCallback((poiId: string) => {
    setPois(prev => prev.filter(poi => poi.id !== poiId));
    
    // Remove marker
    const marker = markersRef.current[poiId];
    if (marker) {
      marker.remove();
      delete markersRef.current[poiId];
    }
  }, []);

  return (
    <MapContainer>
      <MapElement ref={mapContainer} />
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>Selected Points of Interest ({pois.length})</SidebarTitle>
        </SidebarHeader>
        <POIList>
          {pois.length === 0 ? (
            <EmptyState>
              No points of interest selected yet.<br />
              Search for places or click on the map to add them.
            </EmptyState>
          ) : (
            pois.map(poi => (
              <POIItem key={poi.id} confirmed={poi.confirmed}>
                <POIName>{poi.name}</POIName>
                <POIAddress>{poi.address}</POIAddress>
                <POIActions>
                  {!poi.confirmed && (
                    <ActionButton 
                      variant="confirm"
                      onClick={() => confirmPOI(poi.id)}
                    >
                      Confirm
                    </ActionButton>
                  )}
                  <ActionButton 
                    variant="remove"
                    onClick={() => removePOI(poi.id)}
                  >
                    Remove
                  </ActionButton>
                </POIActions>
              </POIItem>
            ))
          )}
        </POIList>
        <Instructions>
          <strong>How to use:</strong><br />
          • Search for places using the search box<br />
          • Click anywhere on the map to add a point<br />
          • Confirm points to add them to your itinerary<br />
          • Remove unwanted points with the remove button
        </Instructions>
      </Sidebar>
    </MapContainer>
  );
};

export default MapItinerary;