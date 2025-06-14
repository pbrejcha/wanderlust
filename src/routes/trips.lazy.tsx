import { createLazyFileRoute } from '@tanstack/react-router'
import { styled } from '@linaria/react'
import MapItinerary from '../components/MapItinerary'

// Color variables (matching existing theme)
const colors = {
  primary: '#3498db',
  textPrimary: '#2c3e50',
  textSecondary: '#555',
  backgroundWhite: '#ffffff',
  borderLight: '#e0e0e0',
}

const TripsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 80px);
`

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0 0 1rem 0;
  text-align: center;
`

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${colors.textSecondary};
  text-align: center;
  margin: 0 0 2rem 0;
`

const MapContainer = styled.div`
  background: ${colors.backgroundWhite};
  border-radius: 12px;
  border: 1px solid ${colors.borderLight};
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

function Trips() {
  return (
    <TripsContainer>
      <PageTitle>Create Your Itinerary</PageTitle>
      <PageSubtitle>
        Search for locations, click on the map to select points of interest, and build your perfect trip
      </PageSubtitle>
      <MapContainer>
        <MapItinerary />
      </MapContainer>
    </TripsContainer>
  )
}

export const Route = createLazyFileRoute('/trips')({
  component: Trips,
})