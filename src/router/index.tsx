import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router';
import { styled } from '@linaria/react';
import { Home } from '../components/Home';
import { Trips } from '../components/Trips';
import { TripDetail } from '../components/TripDetail';
import { Explore, Saved, Updates } from '../components/OtherPages';

// Reusing colors from App.tsx
const colors = {
  primary: '#3498db',
  textPrimary: '#2c3e50',
  textSecondary: '#555',
  textLight: '#ffffff',
  backgroundBeige: '#f5f5dc',
  backgroundWhite: '#ffffff',
  backgroundWhiteTransparent: 'rgba(255, 255, 255, 0.8)',
  borderLight: '#e0e0e0',
};

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, ${colors.backgroundBeige} 0%, ${colors.backgroundWhite} 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

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
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  text-decoration: none;
  
  &:hover {
    color: ${colors.primary};
  }
`;

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
`;

const NavLink = styled.a`
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
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationBell = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
  color: ${colors.textSecondary};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${colors.primary};
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.textLight};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
`;

function RootComponent() {
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
      <Outlet />
    </AppContainer>
  );
}

const rootRoute = createRootRoute({
  component: RootComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const exploreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/explore',
  component: Explore,
});

const tripsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trips',
  component: Trips,
});

const tripDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trips/$tripId',
  component: TripDetail,
});

const savedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/saved',
  component: Saved,
});

const updatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/updates',
  component: Updates,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  exploreRoute,
  tripsRoute,
  tripDetailRoute,
  savedRoute,
  updatesRoute,
]);

export const router = createRouter({ routeTree });