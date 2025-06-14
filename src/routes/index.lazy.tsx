import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { styled } from '@linaria/react'

// Color variables (matching existing theme)
const colors = {
  primary: '#3498db',
  primaryDark: '#2980b9',
  textPrimary: '#2c3e50',
  textSecondary: '#555',
  textLight: '#ffffff',
  backgroundWhite: '#ffffff',
  shadowPrimary: 'rgba(52, 152, 219, 0.3)',
  shadowPrimaryHover: 'rgba(52, 152, 219, 0.4)',
}

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

const CTAButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
  color: ${colors.textLight};
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
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

function Home() {
  return (
    <MainContent>
      <HeroSection>
        <HeroTitle>Wanderlust</HeroTitle>
        <HeroSubtitle>Adventure together</HeroSubtitle>
        <CTAButton to="/trips">Start Exploring</CTAButton>
      </HeroSection>
    </MainContent>
  )
}

export const Route = createLazyFileRoute('/')({
  component: Home,
})