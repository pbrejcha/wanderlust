import { styled } from '@linaria/react'
import './App.css'

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f5dc 0%, #ffffff 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e0e0e0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  text-decoration: none;
  
  &:hover {
    color: #3498db;
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
  color: #555;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: #3498db;
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
  color: #555;
  transition: color 0.2s ease;
  
  &:hover {
    color: #3498db;
  }
`

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
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
  color: #2c3e50;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #555;
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
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
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
  return (
    <AppContainer>
      <NavBar>
        <Logo href="/">Wanderlust</Logo>
        <NavLinks>
          <NavLink href="/explore">Explore</NavLink>
          <NavLink href="/trips">Trips</NavLink>
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
          <HeroTitle>Welcome to Wanderlust</HeroTitle>
          <HeroSubtitle>Discover amazing destinations and create unforgettable travel experiences</HeroSubtitle>
          <CTAButton>Start Exploring</CTAButton>
        </HeroSection>
      </MainContent>
    </AppContainer>
  )
}

export default App
