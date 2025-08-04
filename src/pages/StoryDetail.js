import React, { useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useFavorites } from '../context/FavoritesContext';
import { getStoryById } from '../data/storiesData';

const StoryDetailContainer = styled.div`
  padding: 2rem 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.primaryColor};
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.primaryColor}dd;
    transform: translateY(-2px);
  }
`;

const StoryHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const StoryIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const StoryTitle = styled.h1`
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

const StoryContent = styled.div`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadow};
  line-height: 1.7;
  font-size: 1rem;
  color: ${props => props.theme.textColor};
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 1.2rem;
  }
  
  ${props => props.$focused && `
    border: 3px solid ${props.theme.primaryColor};
    box-shadow: 0 0 0 4px ${props.theme.primaryColor}20, 0 8px 25px rgba(0,0,0,0.15);
    animation: focusPulse 2s ease-in-out infinite;
    
    @keyframes focusPulse {
      0%, 100% { box-shadow: 0 0 0 4px ${props.theme.primaryColor}20, 0 8px 25px rgba(0,0,0,0.15); }
      50% { box-shadow: 0 0 0 6px ${props.theme.primaryColor}30, 0 12px 30px rgba(0,0,0,0.2); }
    }
  `}
  
  // Enhanced styling for story content
  p {
    margin-bottom: 1.2rem;
    text-align: justify;
    line-height: 1.8;
  }
  
  h2, h3, h4 {
    color: ${props => props.theme.primaryColor};
    margin: 1.5rem 0 1rem 0;
    font-weight: bold;
  }
  
  h2 {
    font-size: 1.3rem;
    border-bottom: 2px solid ${props => props.theme.primaryColor};
    padding-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 1.1rem;
    border-bottom: 2px solid ${props => props.theme.primaryColor};
    padding-bottom: 0.5rem;
  }
  
  h4 {
    font-size: 1rem;
  }
  
  blockquote {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 12px;
    padding: 1.2rem;
    margin: 1.5rem 0;
    font-size: 1rem;
    line-height: 2.2;
    text-align: center;
    font-weight: 500;
    color: #1e293b;
    border: 1px solid #e2e8f0;
    font-style: italic;
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding: 1rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.8rem;
      padding: 0.8rem;
    }
    
    strong {
      font-weight: bold;
      color: ${props => props.theme.primaryColor};
    }
    
    em {
      font-style: normal;
      opacity: 0.8;
      font-size: 0.9rem;
    }
  }
  
  ul {
    margin: 1rem 0;
    padding-right: 1.5rem;
  }
  
  li {
    margin-bottom: 0.8rem;
    line-height: 1.6;
  }
`;

const QuranicVerse = styled.blockquote`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px;
  padding: 1.2rem;
  margin: 1.5rem 0;
  font-size: 1rem;
  line-height: 2.2;
  text-align: center;
  font-weight: 500;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.8rem;
  }
`;

const Dua = styled.div`
  background: ${props => props.theme.backgroundColor};
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid ${props => props.theme.primaryColor};
  margin: 1.5rem 0;
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.8;
  color: ${props => props.theme.textColor};
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 1rem;
  }
`;

const Lesson = styled.div`
  background: ${props => props.theme.backgroundColor};
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid ${props => props.theme.accentColor};
  margin: 1.5rem 0;
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const LessonTitle = styled.h4`
  color: ${props => props.theme.accentColor};
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const LessonContent = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${props => props.theme.textColor};
  white-space: pre-line;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
  
  strong {
    font-weight: bold;
    color: ${props => props.theme.primaryColor};
  }
  
  ol {
    margin: 0.3rem 0;
    padding-right: 1.5rem;
  }
  
  li {
    margin-bottom: 0.4rem;
  }
  
  p {
    margin-bottom: 0.4rem;
  }
`;

const StorySection = styled.div`
  margin-bottom: 2rem;
`;

const StorySectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 1rem;
  border-bottom: 2px solid ${props => props.theme.primaryColor};
  padding-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const StorySectionContent = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${props => props.theme.textColor};
  text-align: justify;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const StoryFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const FavoriteButton = styled.button`
  background: ${props => props.isFavorite ? props.theme.accentColor : props.theme.primaryColor};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.accentColor};
    transform: translateY(-2px);
  }
`;

const StoryDetail = () => {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const location = useLocation();
  const contentRef = useRef(null);

  const story = getStoryById(id);

  useEffect(() => {
    // Handle search navigation and focus
    if (location.state?.focusedStoryId && location.state.focusedStoryId === parseInt(id)) {
      // Scroll to content after a short delay
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 500);
    }
  }, [location.state, id]);

  if (!story) {
    return (
      <StoryDetailContainer>
        <BackButton to="/stories">← العودة للقصص</BackButton>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>القصة غير موجودة</h2>
          <p>عذراً، القصة المطلوبة غير متوفرة حالياً.</p>
        </div>
      </StoryDetailContainer>
    );
  }

  return (
    <StoryDetailContainer>
      <BackButton to="/stories">← العودة للقصص</BackButton>
      
      <StoryHeader>
        <StoryIcon>{story.icon}</StoryIcon>
        <StoryTitle>{story.title}</StoryTitle>
      </StoryHeader>

      <StoryContent 
        ref={contentRef}
        $focused={location.state?.focusedStoryId === parseInt(id)}
        dangerouslySetInnerHTML={{ __html: story.content }} 
      />

      <StoryFooter>
        <FavoriteButton
          isFavorite={isFavorite('stories', parseInt(id))}
          onClick={() => toggleFavorite('stories', { id: parseInt(id), ...story })}
        >
          {isFavorite('stories', parseInt(id)) ? '❤️ محفوظ في المفضلة' : '🤍 إضافة للمفضلة'}
        </FavoriteButton>
      </StoryFooter>
    </StoryDetailContainer>
  );
};

export default StoryDetail; 