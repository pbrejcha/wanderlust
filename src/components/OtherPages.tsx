import { styled } from '@linaria/react';

const colors = {
  textPrimary: '#2c3e50',
  textSecondary: '#555',
};

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0 0 1rem 0;
`;

const Description = styled.p`
  color: ${colors.textSecondary};
  font-size: 1.1rem;
`;

export const Explore = () => {
  return (
    <Container>
      <Title>Explore</Title>
      <Description>Discover amazing destinations and plan your next adventure.</Description>
    </Container>
  );
};

export const Saved = () => {
  return (
    <Container>
      <Title>Saved</Title>
      <Description>Your saved destinations and trip ideas.</Description>
    </Container>
  );
};

export const Updates = () => {
  return (
    <Container>
      <Title>Updates</Title>
      <Description>Latest news and updates from your travel community.</Description>
    </Container>
  );
};