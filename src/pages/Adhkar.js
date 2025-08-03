import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMorningAdhkar, getEveningAdhkar } from '../data/adhkarData';
import ProgressBar from '../components/ProgressBar';

const AdhkarContainer = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.textColor};
  opacity: 0.7;
  text-align: center;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  background: ${props => props.$active ? props.theme.primaryColor : props.theme.cardBackground};
  color: ${props => props.$active ? 'white' : props.theme.textColor};
  border: 2px solid ${props => props.$active ? props.theme.primaryColor : props.theme.borderColor};
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$active ? props.theme.shadow : 'none'};
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.85rem;
  }
  
  &:hover {
    background: ${props => props.$active ? props.theme.primaryColor : props.theme.primaryColor}10;
    border-color: ${props => props.theme.primaryColor};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadow};
  }
`;

const ProgressSection = styled.div`
  background: ${props => props.theme.cardBackground};
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.borderColor};
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const ProgressTitle = styled.h3`
  font-size: 1.1rem;
  color: ${props => props.theme.textColor};
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AdhkarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const AdhkarCard = styled.div`
  background: ${props => props.theme.cardBackground};
  border: 2px solid ${props => props.completed ? props.theme.successColor : props.theme.borderColor};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  opacity: ${props => props.completed ? 0 : 1};
  transform: ${props => props.completed ? 'scale(0.8) translateY(20px)' : 'scale(1) translateY(0)'};
  pointer-events: ${props => props.completed ? 'none' : 'auto'};
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.completed ? props.theme.successColor : props.theme.primaryColor};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: ${props => props.completed ? 'scale(0.8) translateY(20px)' : 'translateY(-4px)'};
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
    border-color: ${props => props.theme.primaryColor};
    
    &::before {
      transform: scaleX(1);
    }
  }
  
  &:active {
    transform: ${props => props.completed ? 'scale(0.8) translateY(20px)' : 'scale(0.98) translateY(-2px)'};
  }
  
  ${props => props.completed && `
    background: linear-gradient(135deg, ${props.theme.successColor}08 0%, ${props.theme.successColor}15 100%);
    
    &::before {
      transform: scaleX(1);
    }
  `}
`;

const AdhkarText = styled.p`
  font-size: 0.9rem;
  line-height: 1.7;
  color: ${props => props.theme.textColor};
  margin-bottom: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.6;
  }
`;

const AdhkarExplanation = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.textColor};
  opacity: 0.7;
  margin-bottom: 1rem;
  text-align: center;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const CounterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CounterButton = styled.button`
  background: ${props => props.theme.primaryColor};
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 0.9rem;
  }
  
  &:hover {
    background: ${props => props.theme.primaryColor}dd;
    transform: scale(1.1);
  }
  
  &:disabled {
    background: ${props => props.theme.borderColor};
    cursor: not-allowed;
    transform: none;
  }
`;

const CounterDisplay = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.primaryColor};
  min-width: 70px;
  text-align: center;
  padding: 0.6rem 1.2rem;
  background: ${props => props.theme.primaryColor}10;
  border-radius: 25px;
  border: 2px solid ${props => props.theme.primaryColor}30;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    min-width: 60px;
    padding: 0.5rem 1rem;
  }
  
  &:hover {
    background: ${props => props.theme.primaryColor}20;
    border-color: ${props => props.theme.primaryColor}50;
  }
`;

const AdhkarSource = styled.div`
  font-size: 0.7rem;
  color: ${props => props.theme.textColor};
  opacity: 0.6;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.65rem;
  }
`;

const CompletionMessage = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.successColor} 0%, ${props => props.theme.successColor}dd 100%);
  color: white;
  padding: 1.2rem;
  border-radius: 16px;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px ${props => props.theme.successColor}40;
  animation: fadeIn 0.5s ease-in;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 1rem;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

const Adhkar = () => {
  const [activeCategory, setActiveCategory] = useState('morning');
  const [adhkarProgress, setAdhkarProgress] = useState({});
  const [showCompletion, setShowCompletion] = useState(false);
  const [completedAdhkar, setCompletedAdhkar] = useState(new Set());

  const morningAdhkar = getMorningAdhkar();
  const eveningAdhkar = getEveningAdhkar();
  const currentAdhkar = activeCategory === 'morning' ? morningAdhkar : eveningAdhkar;

  // Function to trigger vibration/haptic feedback
  const triggerHapticFeedback = () => {
    // Vibration API for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50); // Short vibration
    }
    
    // Haptic feedback for iOS
    if (window.navigator && window.navigator.hapticFeedback) {
      window.navigator.hapticFeedback.trigger('light');
    }
  };

  useEffect(() => {
    // Initialize progress to zero for fresh start each session
    const initialProgress = {};
    currentAdhkar.forEach(adhkar => {
      initialProgress[adhkar.id] = 0;
    });
    setAdhkarProgress(initialProgress);
    setCompletedAdhkar(new Set()); // Reset completed adhkar
  }, [activeCategory]);

  useEffect(() => {
    // Vérifier si tous les adhkar sont complétés
    const totalAdhkar = currentAdhkar.length;
    const completedAdhkar = Object.values(adhkarProgress).filter(count => count > 0).length;
    
    if (completedAdhkar === totalAdhkar && totalAdhkar > 0) {
      setShowCompletion(true);
      setTimeout(() => setShowCompletion(false), 5000);
    }
  }, [adhkarProgress, activeCategory]);

  const handleIncrement = (adhkarId) => {
    triggerHapticFeedback();
    setAdhkarProgress(prev => ({
      ...prev,
      [adhkarId]: Math.min((prev[adhkarId] || 0) + 1, currentAdhkar.find(a => a.id === adhkarId)?.count || 1)
    }));
  };

  const handleDecrement = (adhkarId) => {
    triggerHapticFeedback();
    setAdhkarProgress(prev => ({
      ...prev,
      [adhkarId]: Math.max((prev[adhkarId] || 0) - 1, 0)
    }));
  };

  const handleCardClick = (adhkarId) => {
    const currentCount = adhkarProgress[adhkarId] || 0;
    const maxCount = currentAdhkar.find(a => a.id === adhkarId)?.count || 1;
    
    if (currentCount < maxCount) {
      triggerHapticFeedback();
      setAdhkarProgress(prev => ({
        ...prev,
        [adhkarId]: currentCount + 1
      }));
      
      // If this completes the adhkar, add to completed set after a delay
      if (currentCount + 1 >= maxCount) {
        setTimeout(() => {
          setCompletedAdhkar(prev => new Set([...prev, adhkarId]));
        }, 1000); // Delay to show completion animation
      }
    }
  };

  const getProgressPercentage = () => {
    const totalCount = currentAdhkar.reduce((sum, adhkar) => sum + adhkar.count, 0);
    const currentCount = Object.values(adhkarProgress).reduce((sum, count) => sum + count, 0);
    return totalCount > 0 ? (currentCount / totalCount) * 100 : 0;
  };

  const getCompletedCount = () => {
    return currentAdhkar.filter(adhkar => 
      (adhkarProgress[adhkar.id] || 0) >= adhkar.count
    ).length;
  };

  // Filter out completed adhkar that should disappear
  const visibleAdhkar = currentAdhkar.filter(adhkar => {
    const currentCount = adhkarProgress[adhkar.id] || 0;
    const isCompleted = currentCount >= adhkar.count;
    return !isCompleted || !completedAdhkar.has(adhkar.id);
  });

  return (
    <AdhkarContainer>
      <Header>
        <Title>الأذكار</Title>
        <Subtitle>أذكار الصباح والمساء</Subtitle>
      </Header>

      <CategoryTabs>
        <Tab 
          $active={activeCategory === 'morning'} 
          onClick={() => setActiveCategory('morning')}
        >
          أذكار الصباح 🌅
        </Tab>
        <Tab 
          $active={activeCategory === 'evening'} 
          onClick={() => setActiveCategory('evening')}
        >
          أذكار المساء 🌙
        </Tab>
      </CategoryTabs>

      <ProgressSection>
        <ProgressTitle>
          التقدم: {getCompletedCount()} من {currentAdhkar.length} مكتمل
        </ProgressTitle>
        <ProgressBar percentage={getProgressPercentage()} />
      </ProgressSection>

      {showCompletion && (
        <CompletionMessage>
          🎉 تقبل الله طاعتك، يومك مبارك بإذن الله
        </CompletionMessage>
      )}

      <AdhkarGrid>
        {visibleAdhkar.map((adhkar) => {
          const currentCount = adhkarProgress[adhkar.id] || 0;
          const isCompleted = currentCount >= adhkar.count;
          const shouldDisappear = completedAdhkar.has(adhkar.id);
          
          return (
            <AdhkarCard 
              key={adhkar.id} 
              completed={isCompleted}
              onClick={() => handleCardClick(adhkar.id)}
              style={{
                opacity: shouldDisappear ? 0 : 1,
                transform: shouldDisappear ? 'scale(0.8) translateY(20px)' : 'scale(1) translateY(0)',
                pointerEvents: shouldDisappear ? 'none' : 'auto'
              }}
            >
              <AdhkarText>{adhkar.text}</AdhkarText>
              <AdhkarExplanation>{adhkar.explanation}</AdhkarExplanation>
              
              <CounterSection>
                <CounterDisplay>
                  {currentCount} / {adhkar.count}
                </CounterDisplay>
              </CounterSection>
              
              <AdhkarSource>المصدر: {adhkar.source}</AdhkarSource>
            </AdhkarCard>
          );
        })}
      </AdhkarGrid>
    </AdhkarContainer>
  );
};

export default Adhkar; 