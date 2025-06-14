import { createLazyFileRoute } from '@tanstack/react-router'
import { styled } from '@linaria/react'

const colors = {
  textPrimary: '#2c3e50',
  textSecondary: '#555',
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0 0 1rem 0;
  text-align: center;
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${colors.textSecondary};
  text-align: center;
`

function Saved() {
  return (
    <Container>
      <Title>Saved</Title>
      <Subtitle>Coming soon - Your saved destinations and itineraries!</Subtitle>
    </Container>
  )
}

export const Route = createLazyFileRoute('/saved')({
  component: Saved,
})