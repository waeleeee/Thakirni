import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRandomTip, getAllTips } from '../data/spiritualTipsData';

const CardContainer = styled.div`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadow};
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.gradient};
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.textColor};
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const CardCategory = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.primaryColor};
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CardSource = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.textColor};
  opacity: 0.7;
  font-style: italic;
`;

const RefreshButton = styled.button`
  background: ${props => props.theme.primaryColor};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: ${props => props.theme.primaryColor}dd;
    transform: translateY(-2px);
  }
`;

const CardOfTheDay = () => {
  const [currentTip, setCurrentTip] = useState(null);

  useEffect(() => {
    // Générer un conseil basé sur la date du jour
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    
    // Utiliser la date pour sélectionner un conseil de manière déterministe
    const allTips = getAllTips();
    const tipIndex = dayOfYear % allTips.length;
    
    setCurrentTip(allTips[tipIndex]);
  }, []);

  const handleRefresh = () => {
    const newTip = getRandomTip();
    setCurrentTip(newTip);
  };

  if (!currentTip) {
    return (
      <CardContainer>
        <CardTitle>جاري التحميل...</CardTitle>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <CardCategory>{currentTip.category}</CardCategory>
      <CardContent>{currentTip.tip}</CardContent>
      <CardSource>المصدر: {currentTip.source}</CardSource>
      <RefreshButton onClick={handleRefresh}>
        نصيحة جديدة
      </RefreshButton>
    </CardContainer>
  );
};

export default CardOfTheDay; 