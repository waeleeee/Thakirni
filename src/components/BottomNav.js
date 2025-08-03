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
  z-index: 1000;
  padding: 0.75rem 0;
  backdrop-filter: blur(20px);
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0 1rem;
`;

const NavItem = styled.li`
  flex: 1;
  text-align: center;
  position: relative;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${props => props.$active ? props.theme.primaryColor : props.theme.textColor};
  padding: 0.75rem 0.5rem;
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  background: ${props => props.$active ? 'rgba(139, 0, 0, 0.1)' : 'transparent'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$active ? 'linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(220, 20, 60, 0.1) 100%)' : 'transparent'};
    border-radius: 16px;
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
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  
  ${NavLink}:hover & {
    transform: scale(1.1);
  }
  
  ${NavLink}[$active="1"] & {
    transform: scale(1.15);
    filter: drop-shadow(0 2px 4px rgba(139, 0, 0, 0.3));
  }
`;

const NavText = styled.span`
  font-size: 0.75rem;
  font-weight: ${props => props.$active ? '700' : '500'};
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  color: ${props => props.$active ? props.theme.primaryColor : props.theme.textColor};
  
  ${NavLink}:hover & {
    color: ${props => props.theme.primaryColor};
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0.5rem;
  height: 0.5rem;
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
                <NavIcon>
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