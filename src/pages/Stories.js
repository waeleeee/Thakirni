import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { getAllStories } from '../data/storiesData';

const StoriesContainer = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const StoryCard = styled.div`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
  
  ${props => props.$focused && `
    border: 3px solid ${props.theme.primaryColor};
    box-shadow: 0 0 0 4px ${props.theme.primaryColor}20, 0 8px 25px rgba(0,0,0,0.15);
    transform: scale(1.05);
    animation: focusPulse 2s ease-in-out infinite;
    
    @keyframes focusPulse {
      0%, 100% { box-shadow: 0 0 0 4px ${props.theme.primaryColor}20, 0 8px 25px rgba(0,0,0,0.15); }
      50% { box-shadow: 0 0 0 6px ${props.theme.primaryColor}30, 0 12px 30px rgba(0,0,0,0.2); }
    }
  `}
`;

const StoryContent = styled.div`
  padding: 2rem;
`;

const StoryTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => props.theme.textColor};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const StoryDescription = styled.p`
  font-size: 0.85rem;
  line-height: 1.5;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const StoryFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.borderColor};
`;

const FavoriteButton = styled.button`
  background: ${props => props.isFavorite ? props.theme.accentColor : 'transparent'};
  color: ${props => props.isFavorite ? 'white' : props.theme.textColor};
  border: 1px solid ${props => props.theme.borderColor};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.accentColor};
    color: white;
  }
`;

const ReadMoreButton = styled(Link)`
  background: ${props => props.theme.primaryColor};
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.primaryColor}dd;
    transform: translateY(-2px);
  }
`;

const Stories = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [focusedStoryId, setFocusedStoryId] = useState(null);
  const location = useLocation();
  const focusedCardRef = useRef(null);

  const stories = getAllStories();

  useEffect(() => {
    // Handle search navigation and focus
    if (location.state?.focusedStoryId) {
      setFocusedStoryId(location.state.focusedStoryId);
      
      // Scroll to focused card after a short delay
      setTimeout(() => {
        if (focusedCardRef.current) {
          focusedCardRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 500);
      
      // Remove focus after 5 seconds
      setTimeout(() => {
        setFocusedStoryId(null);
      }, 5000);
    }
  }, [location.state]);

  return (
    <StoriesContainer>
      <Header>
        <Title>قصص الأنبياء</Title>
        <Subtitle>تعرف على قصص الأنبياء والمرسلين</Subtitle>
      </Header>

      <StoriesGrid>
        {stories.map((story) => (
          <StoryCard 
            key={story.id}
            $focused={focusedStoryId === story.id}
            ref={focusedStoryId === story.id ? focusedCardRef : null}
          >
            <StoryContent>
              <StoryTitle>{story.title}</StoryTitle>
              <StoryDescription>{story.description}</StoryDescription>
              
              <StoryFooter>
                <FavoriteButton
                  isFavorite={isFavorite('stories', story.id)}
                  onClick={() => toggleFavorite('stories', story)}
                >
                  {isFavorite('stories', story.id) ? 'محفوظ' : 'حفظ'}
                </FavoriteButton>
                
                <ReadMoreButton to={`/stories/${story.id}`}>
                  اقرأ المزيد
                </ReadMoreButton>
              </StoryFooter>
            </StoryContent>
          </StoryCard>
        ))}
      </StoriesGrid>
    </StoriesContainer>
  );
};

export default Stories; 