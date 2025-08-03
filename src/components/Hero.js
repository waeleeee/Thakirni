import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const HeroContainer = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
`;

const Shape = styled.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  
  &:nth-child(1) {
    width: 80px;
    height: 80px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    width: 120px;
    height: 120px;
    top: 60%;
    right: 10%;
    animation-delay: 2s;
  }
  
  &:nth-child(3) {
    width: 60px;
    height: 60px;
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 2rem;
  z-index: 1;
  animation: ${fadeInUp} 1s ease-out;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Hero = () => {
  const [counts, setCounts] = useState({ users: 0, projects: 0, satisfaction: 0 });

  useEffect(() => {
    const animateCounts = () => {
      const targetCounts = { users: 1000, projects: 150, satisfaction: 98 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounts({
          users: Math.floor(targetCounts.users * progress),
          projects: Math.floor(targetCounts.projects * progress),
          satisfaction: Math.floor(targetCounts.satisfaction * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateCounts, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HeroContainer id="home">
      <BackgroundShapes>
        <Shape />
        <Shape />
        <Shape />
      </BackgroundShapes>
      
      <HeroContent>
        <Title>Bienvenue sur Thakirni</Title>
        <Subtitle>
          Découvrez une plateforme moderne et innovante pour créer, 
          partager et collaborer sur vos projets les plus ambitieux
        </Subtitle>
        
        <CTAButton onClick={() => alert('Fonctionnalité à venir !')}>
          Commencer maintenant
        </CTAButton>
        
        <StatsContainer>
          <Stat>
            <StatNumber>{counts.users}+</StatNumber>
            <StatLabel>Utilisateurs actifs</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>{counts.projects}+</StatNumber>
            <StatLabel>Projets créés</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>{counts.satisfaction}%</StatNumber>
            <StatLabel>Satisfaction client</StatLabel>
          </Stat>
        </StatsContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero; 