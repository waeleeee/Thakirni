import React from 'react';
import styled, { keyframes } from 'styled-components';

const fillAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${props => props.percentage}%;
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  background: ${props => props.theme.borderColor};
  border-radius: 25px;
  height: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.theme.primaryColor} 0%, ${props => props.theme.successColor} 100%);
  border-radius: 25px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${props => props.percentage}%;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: ${fillAnimation} 1.5s ease-out;
  }
`;

const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.percentage > 50 ? 'white' : props.theme.textColor};
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const ProgressBar = ({ percentage = 0 }) => {
  return (
    <ProgressContainer>
      <ProgressFill percentage={percentage} />
      <ProgressText percentage={percentage}>
        {Math.round(percentage)}%
      </ProgressText>
    </ProgressContainer>
  );
};

export default ProgressBar; 