import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const TasbihContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: ${props => props.theme.cardBackground};
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadow};
  max-width: 400px;
  margin: 0 auto;
`;

const CounterDisplay = styled.div`
  text-align: center;
`;

const CounterNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 0.5rem;
`;

const CounterLabel = styled.div`
  font-size: 1.1rem;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
`;

const TasbihButton = styled.button`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.theme.gradient};
  border: none;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.2;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  }
  
  &:active {
    animation: ${pulse} 0.2s ease-in-out;
    transform: scale(0.95);
  }
`;

const ResetButton = styled.button`
  background: ${props => props.theme.accentColor};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.accentColor}dd;
    transform: translateY(-2px);
  }
`;

const DhikrOptions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const DhikrOption = styled.button`
  background: ${props => props.$active ? props.theme.primaryColor : props.theme.backgroundColor};
  color: ${props => props.$active ? 'white' : props.theme.textColor};
  border: 1px solid ${props => props.theme.borderColor};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.primaryColor};
    color: white;
  }
`;

const TasbihCounter = () => {
  const [count, setCount] = useState(0);
  const [selectedDhikr, setSelectedDhikr] = useState('استغفر الله');
  const [lastSaved, setLastSaved] = useState(0);

  const dhikrOptions = [
    'استغفر الله',
    'سبحان الله',
    'الحمد لله',
    'لا إله إلا الله',
    'الله أكبر'
  ];

  useEffect(() => {
    // Charger le compteur depuis le localStorage
    const savedCount = localStorage.getItem('tasbihCount');
    const savedDhikr = localStorage.getItem('selectedDhikr');
    
    if (savedCount) {
      setCount(parseInt(savedCount));
      setLastSaved(parseInt(savedCount));
    }
    
    if (savedDhikr) {
      setSelectedDhikr(savedDhikr);
    }
  }, []);

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('tasbihCount', newCount.toString());
    
    // Vibration (si supporté)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Son (optionnel)
    // const audio = new Audio('/sounds/click.mp3');
    // audio.play().catch(() => {}); // Ignorer les erreurs si le son n'est pas disponible
  };

  const handleReset = () => {
    setCount(0);
    setLastSaved(0);
    localStorage.setItem('tasbihCount', '0');
  };

  const handleDhikrChange = (dhikr) => {
    setSelectedDhikr(dhikr);
    localStorage.setItem('selectedDhikr', dhikr);
  };

  return (
    <TasbihContainer>
      <CounterDisplay>
        <CounterNumber>{count}</CounterNumber>
        <CounterLabel>عدد التسبيحات</CounterLabel>
      </CounterDisplay>

      <DhikrOptions>
        {dhikrOptions.map((dhikr) => (
          <DhikrOption
            key={dhikr}
            $active={selectedDhikr === dhikr}
            onClick={() => handleDhikrChange(dhikr)}
          >
            {dhikr}
          </DhikrOption>
        ))}
      </DhikrOptions>

      <TasbihButton onClick={handleClick}>
        {selectedDhikr}
      </TasbihButton>

      <ResetButton onClick={handleReset}>
        إعادة تعيين
      </ResetButton>
    </TasbihContainer>
  );
};

export default TasbihCounter; 