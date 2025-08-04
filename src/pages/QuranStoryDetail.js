import React, { useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useFavorites } from '../context/FavoritesContext';
import { getAyahStoryById } from '../data/quranAyahStoriesData';

const DetailContainer = styled.div`
  padding: 1rem;
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
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.6rem 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.5rem 0.7rem;
  }
  
  &:hover {
    background: ${props => props.theme.primaryColor}dd;
    transform: translateY(-2px);
  }
`;

const StoryCard = styled.div`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadow};
  
  ${props => props.$focused && `
    border: 3px solid ${props.theme.primaryColor};
    box-shadow: 0 0 0 4px ${props.theme.primaryColor}20, 0 8px 25px rgba(0,0,0,0.15);
    animation: focusPulse 2s ease-in-out infinite;
    
    @keyframes focusPulse {
      0%, 100% { box-shadow: 0 0 0 4px ${props.theme.primaryColor}20, 0 8px 25px rgba(0,0,0,0.15); }
      50% { box-shadow: 0 0 0 6px ${props.theme.primaryColor}30, 0 12px 30px rgba(0,0,0,0.2); }
    }
  `}
`;

const StoryTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${props => props.theme.textColor};
  margin-bottom: 1.5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const AyahText = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px;
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 2.2;
  text-align: center;
  font-weight: 500;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.8rem;
  }
`;

const SurahInfo = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: ${props => props.theme.primaryColor};
  font-weight: 600;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
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

const SectionContent = styled.div`
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

const WisdomSection = styled.div`
  background: ${props => props.theme.backgroundColor};
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid ${props => props.theme.primaryColor};
`;

const WisdomText = styled.div`
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

const FavoriteButton = styled.button`
  background: ${props => props.isFavorite ? '#ef4444' : props.theme.primaryColor};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 auto;
  display: block;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.6rem 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.5rem 1rem;
  }
  
  &:hover {
    background: ${props => props.isFavorite ? '#dc2626' : props.theme.primaryColor}dd;
    transform: translateY(-2px);
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const NotFoundTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.textColor};
  margin-bottom: 1rem;
`;

const NotFoundText = styled.p`
  color: ${props => props.theme.textColor};
  opacity: 0.7;
  margin-bottom: 2rem;
`;

// Fonction pour convertir le Markdown en HTML
const formatWisdomText = (text) => {
  if (!text) return '';
  
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^(\d+)\.\s+(.*?)$/gm, '<li>$2</li>')
    .replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
};

const QuranStoryDetail = () => {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const location = useLocation();
  const storyCardRef = useRef(null);
  const story = getAyahStoryById(id);

  useEffect(() => {
    // Handle search navigation and focus
    if (location.state?.focusedQuranStoryId && location.state.focusedQuranStoryId === parseInt(id)) {
      // Scroll to story card after a short delay
      setTimeout(() => {
        if (storyCardRef.current) {
          storyCardRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 500);
    }
  }, [location.state, id]);

  if (!story) {
    return (
      <DetailContainer>
        <BackButton to="/quran-stories">← العودة إلى آيات القرآن</BackButton>
        <NotFound>
          <NotFoundTitle>لم يتم العثور على القصة</NotFoundTitle>
          <NotFoundText>عذراً، القصة المطلوبة غير موجودة</NotFoundText>
          <BackButton to="/quran-stories">العودة إلى آيات القرآن</BackButton>
        </NotFound>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <BackButton to="/quran-stories">← العودة إلى آيات القرآن</BackButton>
      
      <StoryCard 
        ref={storyCardRef}
        $focused={location.state?.focusedQuranStoryId === parseInt(id)}
      >
        <StoryTitle>{story.title}</StoryTitle>
        
        <AyahText>{story.ayah_text}</AyahText>
        
        <SurahInfo>{story.surah_and_ayah_number}</SurahInfo>
        
        <Section>
          <SectionTitle>القصة والسياق</SectionTitle>
          <SectionContent>{story.story_and_context}</SectionContent>
        </Section>
        
        <WisdomSection>
          <SectionTitle>الحكمة والعبرة</SectionTitle>
          <WisdomText 
            dangerouslySetInnerHTML={{ 
              __html: formatWisdomText(story.wisdom_and_reflection) 
            }} 
          />
        </WisdomSection>
        
        <FavoriteButton
          isFavorite={isFavorite('quranStories', story.id)}
          onClick={() => toggleFavorite('quranStories', story)}
        >
          {isFavorite('quranStories', story.id) ? '❤️ محفوظ في المفضلة' : '🤍 إضافة إلى المفضلة'}
        </FavoriteButton>
      </StoryCard>
    </DetailContainer>
  );
};

export default QuranStoryDetail; 