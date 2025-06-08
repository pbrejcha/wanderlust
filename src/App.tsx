import { styled } from '@linaria/react'
import './App.css'

const LandingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const Hero = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`

const MainTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #646cff 0%, #61dafb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  width: 100%;
`

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(100, 108, 255, 0.2);
  }
`

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #61dafb;
`

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
`

const CTASection = styled.section`
  text-align: center;
  margin-top: 2rem;
`

const CTAButton = styled.button`
  background: linear-gradient(135deg, #646cff 0%, #61dafb 100%);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(100, 108, 255, 0.4);
  }
  
  @media (max-width: 768px) {
    margin: 0.5rem;
    display: block;
    width: 100%;
    max-width: 300px;
  }
`

const SecondaryButton = styled(CTAButton)`
  background: transparent;
  border: 2px solid #61dafb;
  color: #61dafb;
  
  &:hover {
    background: #61dafb;
    color: #242424;
  }
`

function App() {
  return (
    <LandingContainer>
      <Hero>
        <MainTitle>¡Vamos!</MainTitle>
        <Subtitle>
          Plan your perfect adventure with friends. Create collaborative itineraries, 
          discover amazing places, and make memories that last a lifetime.
        </Subtitle>
      </Hero>

      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon>🗺️</FeatureIcon>
          <FeatureTitle>Multi-Day Trip Planning</FeatureTitle>
          <FeatureDescription>
            Organize your adventure across multiple days with detailed daily itineraries. 
            Plan each day perfectly with timed activities and seamless transitions.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>📍</FeatureIcon>
          <FeatureTitle>Points of Interest</FeatureTitle>
          <FeatureDescription>
            Discover and add amazing places to your itinerary. From hidden gems to 
            must-see attractions, build the perfect collection of experiences.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>👥</FeatureIcon>
          <FeatureTitle>Collaborate with Friends</FeatureTitle>
          <FeatureDescription>
            Travel planning is better together! Invite friends to contribute ideas, 
            vote on activities, and build the perfect group adventure.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>📅</FeatureIcon>
          <FeatureTitle>Date-Specific Planning</FeatureTitle>
          <FeatureDescription>
            Assign specific dates and times to your activities. Keep everyone 
            synchronized with detailed schedules and real-time updates.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🎯</FeatureIcon>
          <FeatureTitle>Smart Recommendations</FeatureTitle>
          <FeatureDescription>
            Get personalized suggestions based on your interests, travel style, 
            and group preferences. Discover experiences you'll love.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>📱</FeatureIcon>
          <FeatureTitle>Always Accessible</FeatureTitle>
          <FeatureDescription>
            Access your plans anywhere, anytime. Sync across devices and stay 
            connected with your travel companions throughout your journey.
          </FeatureDescription>
        </FeatureCard>
      </FeatureGrid>

      <CTASection>
        <CTAButton>Start Planning Your Adventure</CTAButton>
        <SecondaryButton>Learn More</SecondaryButton>
      </CTASection>
    </LandingContainer>
  )
}

export default App
