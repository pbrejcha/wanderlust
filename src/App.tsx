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

const PolaroidContainer = styled.div`
  background: white;
  padding: 1rem 1rem 3rem 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transform: rotate(-2deg);
  transition: transform 0.3s ease;
  border-radius: 2px;
  
  &:hover {
    transform: rotate(0deg) scale(1.02);
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 0.8rem 2.5rem 0.8rem;
  }
`

const IllustrationBox = styled.div`
  width: 300px;
  height: 200px;
  background: linear-gradient(135deg, #87CEEB 0%, #F0E68C 100%);
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  
  @media (max-width: 480px) {
    width: 250px;
    height: 166px;
  }
`

const BeachScene = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(180deg, #F0E68C 0%, #DEB887 100%);
`

const Ocean = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(180deg, #87CEEB 0%, #4682B4 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
    animation: wave 3s ease-in-out infinite;
  }
  
  @keyframes wave {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(10px); }
  }
`

const Sun = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #FFD700;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
`

const Woman = styled.div`
  position: absolute;
  bottom: 20px;
  right: 40px;
  width: 12px;
  height: 30px;
  background: #8B4513;
  border-radius: 6px 6px 0 0;
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 2px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #DEB887;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    left: -2px;
    width: 16px;
    height: 10px;
    background: #FF6B6B;
    border-radius: 2px;
  }
`

const PolaroidCaption = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-family: 'Courier New', monospace;
  color: #555;
  font-size: 0.9rem;
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
        <PolaroidContainer>
          <IllustrationBox>
            <Sun />
            <Ocean />
            <BeachScene />
            <Woman />
          </IllustrationBox>
          <PolaroidCaption>dreaming of distant shores</PolaroidCaption>
        </PolaroidContainer>
      </MainContent>
    </AppContainer>
  )
}

export default App
