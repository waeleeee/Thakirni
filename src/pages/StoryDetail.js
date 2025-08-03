import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
`;

const QuranicVerse = styled.blockquote`
  background: ${props => props.theme.primaryColor}10;
  border-right: 4px solid ${props => props.theme.primaryColor};
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 8px;
  font-style: italic;
  color: ${props => props.theme.primaryColor};
  font-weight: 500;
`;

const Dua = styled.div`
  background: ${props => props.theme.secondaryColor}10;
  border: 1px solid ${props => props.theme.secondaryColor};
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
`;

const Lesson = styled.div`
  background: ${props => props.theme.accentColor}10;
  border: 1px solid ${props => props.theme.accentColor};
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 8px;
`;

const LessonTitle = styled.h4`
  color: ${props => props.theme.accentColor};
  margin-bottom: 0.5rem;
  font-weight: bold;
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

  const story = getStoryById(id);

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

      <StoryContent dangerouslySetInnerHTML={{ __html: story.content }} />

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