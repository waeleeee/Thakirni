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
  font-size: 2.5rem;
  font-weight: 700;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.textColor};
  opacity: 0.7;
  text-align: center;
  font-weight: 500;
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
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$active ? props.theme.shadow : 'none'};
  
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
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.borderColor};
`;

const ProgressTitle = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.textColor};
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
`;

const AdhkarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const AdhkarCard = styled.div`
  background: ${props => props.theme.cardBackground};
  border: 2px solid ${props => props.completed ? props.theme.successColor : props.theme.borderColor};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
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
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
    border-color: ${props => props.theme.primaryColor};
    
    &::before {
      transform: scaleX(1);
    }
  }
  
  &:active {
    transform: scale(0.98) translateY(-2px);
  }
  
  ${props => props.completed && `
    background: linear-gradient(135deg, ${props.theme.successColor}08 0%, ${props.theme.successColor}15 100%);
    
    &::before {
      transform: scaleX(1);
    }
  `}
`;

const AdhkarText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.textColor};
  margin-bottom: 1rem;
  text-align: center;
`;

const AdhkarExplanation = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.textColor};
  opacity: 0.7;
  margin-bottom: 1rem;
  text-align: center;
  font-style: italic;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
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
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.primaryColor};
  min-width: 80px;
  text-align: center;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.primaryColor}10;
  border-radius: 25px;
  border: 2px solid ${props => props.theme.primaryColor}30;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.primaryColor}20;
    border-color: ${props => props.theme.primaryColor}50;
  }
`;

const AdhkarSource = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.textColor};
  opacity: 0.6;
  text-align: center;
`;

const CompletionMessage = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.successColor} 0%, ${props => props.theme.successColor}dd 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px ${props => props.theme.successColor}40;
  animation: fadeIn 0.5s ease-in;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

const Adhkar = () => {
  const [activeCategory, setActiveCategory] = useState('morning');
  const [adhkarProgress, setAdhkarProgress] = useState({});
  const [showCompletion, setShowCompletion] = useState(false);

  const morningAdhkar = getMorningAdhkar();
  const eveningAdhkar = getEveningAdhkar();
  const currentAdhkar = activeCategory === 'morning' ? morningAdhkar : eveningAdhkar;

  useEffect(() => {
    // Charger le progrès depuis localStorage
    const savedProgress = localStorage.getItem(`adhkarProgress_${activeCategory}`);
    if (savedProgress) {
      setAdhkarProgress(JSON.parse(savedProgress));
    } else {
      // Initialiser le progrès
      const initialProgress = {};
      currentAdhkar.forEach(adhkar => {
        initialProgress[adhkar.id] = 0;
      });
      setAdhkarProgress(initialProgress);
    }
  }, [activeCategory]);

  useEffect(() => {
    // Sauvegarder le progrès
    localStorage.setItem(`adhkarProgress_${activeCategory}`, JSON.stringify(adhkarProgress));
    
    // Vérifier si tous les adhkar sont complétés
    const totalAdhkar = currentAdhkar.length;
    const completedAdhkar = Object.values(adhkarProgress).filter(count => count > 0).length;
    
    if (completedAdhkar === totalAdhkar && totalAdhkar > 0) {
      setShowCompletion(true);
      setTimeout(() => setShowCompletion(false), 5000);
    }
  }, [adhkarProgress, activeCategory]);

  const handleIncrement = (adhkarId) => {
    setAdhkarProgress(prev => ({
      ...prev,
      [adhkarId]: Math.min((prev[adhkarId] || 0) + 1, currentAdhkar.find(a => a.id === adhkarId)?.count || 1)
    }));
  };

  const handleDecrement = (adhkarId) => {
    setAdhkarProgress(prev => ({
      ...prev,
      [adhkarId]: Math.max((prev[adhkarId] || 0) - 1, 0)
    }));
  };

  const handleCardClick = (adhkarId) => {
    const currentCount = adhkarProgress[adhkarId] || 0;
    const maxCount = currentAdhkar.find(a => a.id === adhkarId)?.count || 1;
    
    if (currentCount < maxCount) {
      setAdhkarProgress(prev => ({
        ...prev,
        [adhkarId]: currentCount + 1
      }));
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
        {currentAdhkar.map((adhkar) => {
          const currentCount = adhkarProgress[adhkar.id] || 0;
          const isCompleted = currentCount >= adhkar.count;
          
                     return (
             <AdhkarCard 
               key={adhkar.id} 
               completed={isCompleted}
               onClick={() => handleCardClick(adhkar.id)}
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