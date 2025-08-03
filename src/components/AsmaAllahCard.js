import React, { useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;
  max-width: 500px;
  margin: 0 auto;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  }
`;

const AsmaName = styled.h3`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.theme.primaryColor};
  text-align: center;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const MeaningTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.textColor};
  margin-bottom: 0.5rem;
  text-align: right;
`;

const MeaningText = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: ${props => props.theme.textColor};
  margin-bottom: 1.5rem;
  text-align: right;
  opacity: 0.9;
`;

const ReflectionTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 0.5rem;
  text-align: right;
`;

const ReflectionText = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: ${props => props.theme.textColor};
  text-align: right;
  opacity: 0.9;
`;

const ToggleButton = styled.button`
  background: ${props => props.theme.primaryColor};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.primaryColorDark};
  }
`;

const AsmaAllahCard = ({ asma, onNext, onPrevious, showNavigation = false }) => {
  const [showReflection, setShowReflection] = useState(false);

  return (
    <CardContainer onClick={() => setShowReflection(!showReflection)}>
      <AsmaName>{asma.name}</AsmaName>
      
      <MeaningTitle>المعنى:</MeaningTitle>
      <MeaningText>{asma.meaning}</MeaningText>
      
      {showReflection && (
        <>
          <ReflectionTitle>التأمل:</ReflectionTitle>
          <ReflectionText>{asma.reflection}</ReflectionText>
        </>
      )}
      
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <ToggleButton onClick={(e) => {
          e.stopPropagation();
          setShowReflection(!showReflection);
        }}>
          {showReflection ? 'إخفاء التأمل' : 'عرض التأمل'}
        </ToggleButton>
      </div>

      {showNavigation && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', gap: '1rem' }}>
          <ToggleButton onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}>
            السابق
          </ToggleButton>
          <ToggleButton onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}>
            التالي
          </ToggleButton>
        </div>
      )}
    </CardContainer>
  );
};

export default AsmaAllahCard; 