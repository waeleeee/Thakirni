import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const BottomNavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.cardBackground};
  border-top: 2px solid ${props => props.theme.primaryColor};
  box-shadow: 0 -8px 25px rgba(139, 0, 0, 0.15);
  z-index: 999;
  padding: 1.2rem 0;
  backdrop-filter: blur(20px);
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  margin: 0 1rem 0.5rem 1rem;
  border-radius: 20px 20px 0 0;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0 1rem;
  width: 100%;
  max-width: 500px;
`;

const NavItem = styled.li`
  flex: 1;
  text-align: center;
  position: relative;
  margin: 0 0.2rem;
  min-width: 0;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${props => props.$active ? props.theme.primaryColor : props.theme.textColor};
  padding: 0.8rem 0.3rem;
  border-radius: 18px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  background: ${props => props.$active ? 'rgba(139, 0, 0, 0.1)' : 'transparent'};
  min-width: 60px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$active ? 'linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(220, 20, 60, 0.1) 100%)' : 'transparent'};
    border-radius: 18px;
    opacity: ${props => props.$active ? 1 : 0};
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: rgba(139, 0, 0, 0.05);
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(139, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const NavIcon = styled.div`
  font-size: 2.2rem;
  margin-bottom: 0.6rem;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${props => props.$active ? 'rgba(139, 0, 0, 0.1)' : 'transparent'};
  
  ${NavLink}:hover & {
    transform: scale(1.1);
    background: rgba(139, 0, 0, 0.05);
  }
  
  ${NavLink}[$active="1"] & {
    transform: scale(1.15);
    filter: drop-shadow(0 2px 4px rgba(139, 0, 0, 0.3));
    background: rgba(139, 0, 0, 0.15);
  }
`;

const NavText = styled.span`
  font-size: 0.6rem;
  font-weight: ${props => props.$active ? '700' : '500'};
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  color: ${props => props.$active ? props.theme.primaryColor : props.theme.textColor};
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  
  @media (max-width: 480px) {
    font-size: 0.55rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.5rem;
  }
  
  ${NavLink}:hover & {
    color: ${props => props.theme.primaryColor};
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  top: -0.3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0.6rem;
  height: 0.6rem;
  background: ${props => props.theme.primaryColor};
  border-radius: 50%;
  opacity: ${props => props.$active ? 1 : 0};
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(139, 0, 0, 0.5);
`;

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { 
      path: '/', 
      icon: '🏠', 
      text: 'الرئيسية',
      altIcon: '🏛️'
    },
    { 
      path: '/adhkar', 
      icon: '📿', 
      text: 'الأذكار',
      altIcon: '🕌'
    },
    { 
      path: '/stories', 
      icon: '📖', 
      text: 'القصص',
      altIcon: '📚'
    },
    { 
      path: '/quran-stories', 
      icon: '📜', 
      text: 'آيات القرآن',
      altIcon: '🕋'
    },
    { 
      path: '/favorites', 
      icon: '❤️', 
      text: 'المفضلة',
      altIcon: '⭐'
    }
  ];

  return (
    <BottomNavContainer>
      <NavList>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavItem key={item.path}>
              <NavLink 
                to={item.path} 
                $active={isActive ? 1 : 0}
              >
                <ActiveIndicator $active={isActive} />
                <NavIcon $active={isActive}>
                  {isActive ? item.altIcon : item.icon}
                </NavIcon>
                <NavText $active={isActive}>
                  {item.text}
                </NavText>
              </NavLink>
            </NavItem>
          );
        })}
      </NavList>
    </BottomNavContainer>
  );
};

export default BottomNav; 