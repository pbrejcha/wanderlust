# Mapbox Integration Guide

This project includes Mapbox GL JS and related dependencies for implementing interactive maps.

## Dependencies Added

- **mapbox-gl** (^3.12.0) - Core Mapbox GL JS library
- **@types/mapbox-gl** (^3.4.1) - TypeScript definitions for Mapbox GL JS
- **@mapbox/mapbox-gl-geocoder** (^5.0.3) - Geocoding/search functionality
- **@types/mapbox__mapbox-gl-geocoder** (^5.0.0) - TypeScript definitions for geocoder

## Usage

### Basic Map Setup

```tsx
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9
    });
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};
```

### With Geocoder

```tsx
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MapWithGeocoder: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return;
    
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });

    map.current.addControl(geocoder);
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};
```

## Important Notes

1. **Access Token**: You need a Mapbox access token to use these components. Get one from [Mapbox](https://www.mapbox.com/).

2. **CSS Imports**: Make sure to import the required CSS files:
   - `mapbox-gl/dist/mapbox-gl.css` - Required for basic map functionality
   - `@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css` - Required when using geocoder

3. **TypeScript**: All dependencies include TypeScript definitions for full type safety.

4. **Build Configuration**: The project's TypeScript configuration has been updated to support ES module interop for better Mapbox compatibility.