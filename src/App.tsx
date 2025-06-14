import { styled } from '@linaria/react'
import { useState } from 'react'
import './App.css'
import TripsPage from './components/TripsPage'

// Color variables
const colors = {
  // Primary colors
  primary: '#3498db',
  primaryDark: '#2980b9',
  
  // Text colors
  textPrimary: '#2c3e50',
  textSecondary: '#555',
  textLight: '#ffffff',
  
  // Background colors
  backgroundBeige: '#f5f5dc',
  backgroundWhite: '#ffffff',
  backgroundWhiteTransparent: 'rgba(255, 255, 255, 0.8)',
  
  // Border colors
  borderLight: '#e0e0e0',
  
  // Gradient colors
  gradientPurpleLight: '#667eea',
  gradientPurpleDark: '#764ba2',
  
  // Shadow colors
  shadowPrimary: 'rgba(52, 152, 219, 0.3)',
  shadowPrimaryHover: 'rgba(52, 152, 219, 0.4)',
}

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, ${colors.backgroundBeige} 0%, ${colors.backgroundWhite} 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid ${colors.borderLight};
  background: ${colors.backgroundWhiteTransparent};
  backdrop-filter: blur(10px);
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  text-decoration: none;
  
  &:hover {
    color: ${colors.primary};
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`

const NavLink = styled.a`
  color: ${colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${colors.primary};
  }
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const NotificationBell = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
  color: ${colors.textSecondary};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${colors.primary};
  }
`

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.gradientPurpleLight} 0%, ${colors.gradientPurpleDark} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.textLight};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
`

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: 2rem;
`

const HeroSection = styled.section`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    max-width: 90%;
  }
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0 0 1rem 0;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const HeroSubtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${colors.textSecondary};
  margin: 0 0 2rem 0;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const CTAButton = styled.button`
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
  color: ${colors.textLight};
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px ${colors.shadowPrimary};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${colors.shadowPrimaryHover};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'trips'>('home');

  const handleNavigateToTrips = () => {
    setCurrentPage('trips');
  };

  const handleNavigateToHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'trips') {
    return <TripsPage onNavigateHome={handleNavigateToHome} />;
  }

  return (
    <AppContainer>
      <NavBar>
        <Logo href="/">Wanderlust</Logo>
        <NavLinks>
          <NavLink href="/explore">Explore</NavLink>
          <NavLink href="#" onClick={(e) => { e.preventDefault(); handleNavigateToTrips(); }}>Trips</NavLink>
          <NavLink href="/saved">Saved</NavLink>
          <NavLink href="/updates">Updates</NavLink>
          <UserSection>
            <NotificationBell>🔔</NotificationBell>
            <UserAvatar>U</UserAvatar>
          </UserSection>
        </NavLinks>
      </NavBar>

      <MainContent>
        <HeroSection>
          <HeroTitle>Wanderlust</HeroTitle>
          <HeroSubtitle>Adventure together</HeroSubtitle>
          <CTAButton onClick={handleNavigateToTrips}>Start Exploring</CTAButton>
        </HeroSection>
      </MainContent>
    </AppContainer>
  )
}

export default App
