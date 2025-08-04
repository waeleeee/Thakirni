import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useFavorites } from '../context/FavoritesContext';
import { getAllAyahStories, getRandomAyahStory } from '../data/quranAyahStoriesData';

// Fonction pour convertir le Markdown en HTML
const formatWisdomText = (text) => {
  if (!text) return '';
  
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^(\d+)\.\s+(.*?)$/gm, '<li>$2</li>')
    .replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
};

const QuranStoriesContainer = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${props => props.theme.textColor};
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.85rem;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const RandomStoryCard = styled.div`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: ${props => props.theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const RandomStoryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 1rem;
  text-align: center;
`;

const AyahText = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 2;
  text-align: center;
  font-weight: 500;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const SurahInfo = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: ${props => props.theme.textColor};
  opacity: 0.7;
  margin-bottom: 1rem;
`;

const StoryContent = styled.div`
  font-size: 1rem;
  line-height: 1.8;
  color: ${props => props.theme.textColor};
  margin-bottom: 1rem;
`;

const WisdomSection = styled.div`
  background: ${props => props.theme.backgroundColor};
  border-radius: 12px;
  padding: 1rem;
  border-left: 4px solid ${props => props.theme.primaryColor};
`;

const WisdomTitle = styled.h4`
  font-size: 1rem;
  font-weight: bold;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 0.5rem;
`;

const WisdomText = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${props => props.theme.textColor};
  white-space: pre-line;
  
  strong {
    font-weight: bold;
    color: ${props => props.theme.primaryColor};
  }
  
  ol {
    margin: 0.5rem 0;
    padding-right: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const RefreshButton = styled.button`
  background: ${props => props.theme.primaryColor};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 auto;
  display: block;
  
  &:hover {
    background: ${props => props.theme.primaryColor}dd;
    transform: translateY(-2px);
  }
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const StoryCard = styled(Link)`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadow};
  transition: all 0.3s ease;
  text-decoration: none;
  display: block;
  
  &:hover {
    transform: translateY(-4px);
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

const StoryCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => props.theme.textColor};
  margin-bottom: 0.5rem;
`;

const StoryCardAyah = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

const StoryCardSurah = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.primaryColor};
  font-weight: 500;
`;

const FavoriteButton = styled.button`
  background: ${props => props.isFavorite ? '#ef4444' : 'transparent'};
  color: ${props => props.isFavorite ? 'white' : props.theme.textColor};
  border: 1px solid ${props => props.isFavorite ? '#ef4444' : props.theme.borderColor};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: ${props => props.isFavorite ? '#dc2626' : props.theme.backgroundColor};
  }
`;

const QuranStories = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [randomStory, setRandomStory] = useState(getRandomAyahStory());
  const [focusedQuranStoryId, setFocusedQuranStoryId] = useState(null);
  const location = useLocation();
  const focusedCardRef = useRef(null);
  const allStories = getAllAyahStories();

  const handleRefreshRandom = () => {
    setRandomStory(getRandomAyahStory());
  };

  useEffect(() => {
    // Handle search navigation and focus
    if (location.state?.focusedQuranStoryId) {
      setFocusedQuranStoryId(location.state.focusedQuranStoryId);
      
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
        setFocusedQuranStoryId(null);
      }, 5000);
    }
  }, [location.state]);

  return (
    <QuranStoriesContainer>
      <Header>
        <Title>آيات من القرآن</Title>
        <Subtitle>قصص وحكم من آيات القرآن الكريم</Subtitle>
      </Header>

      <RandomStoryCard>
        <RandomStoryTitle>آية اليوم</RandomStoryTitle>
        <AyahText>{randomStory.ayah_text}</AyahText>
        <SurahInfo>{randomStory.surah_and_ayah_number}</SurahInfo>
        <StoryContent>{randomStory.story_and_context}</StoryContent>
        
        <WisdomSection>
          <WisdomTitle>الحكمة والعبرة:</WisdomTitle>
          <WisdomText 
            dangerouslySetInnerHTML={{ 
              __html: formatWisdomText(randomStory.wisdom_and_reflection) 
            }} 
          />
        </WisdomSection>

        <FavoriteButton
          isFavorite={isFavorite('quranStories', randomStory.id)}
          onClick={() => toggleFavorite('quranStories', randomStory)}
        >
          {isFavorite('quranStories', randomStory.id) ? '❤️ محفوظ' : '🤍 حفظ'}
        </FavoriteButton>

        <RefreshButton onClick={handleRefreshRandom}>
          🔄 آية جديدة
        </RefreshButton>
      </RandomStoryCard>

      <StoriesGrid>
        {allStories.map((story) => (
          <StoryCard 
            key={story.id} 
            to={`/quran-stories/${story.id}`}
            $focused={focusedQuranStoryId === story.id}
            ref={focusedQuranStoryId === story.id ? focusedCardRef : null}
          >
            <StoryCardTitle>{story.title}</StoryCardTitle>
            <StoryCardAyah>{story.ayah_text.substring(0, 100)}...</StoryCardAyah>
            <StoryCardSurah>{story.surah_and_ayah_number}</StoryCardSurah>
            
            <FavoriteButton
              isFavorite={isFavorite('quranStories', story.id)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite('quranStories', story);
              }}
            >
              {isFavorite('quranStories', story.id) ? '❤️ محفوظ' : '🤍 حفظ'}
            </FavoriteButton>
          </StoryCard>
        ))}
      </StoriesGrid>
    </QuranStoriesContainer>
  );
};

export default QuranStories; 