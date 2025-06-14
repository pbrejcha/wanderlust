import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { styled } from '@linaria/react'

// Color variables (matching App.tsx)
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

const Logo = styled(Link)`
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

const NavLink = styled(Link)`
  color: ${colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${colors.primary};
  }
  
  &.active {
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

export const Route = createRootRoute({
  component: () => (
    <AppContainer>
      <NavBar>
        <Logo to="/">Wanderlust</Logo>
        <NavLinks>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/trips">Trips</NavLink>
          <NavLink to="/saved">Saved</NavLink>
          <NavLink to="/updates">Updates</NavLink>
          <UserSection>
            <NotificationBell>🔔</NotificationBell>
            <UserAvatar>U</UserAvatar>
          </UserSection>
        </NavLinks>
      </NavBar>

      <Outlet />
    </AppContainer>
  ),
})