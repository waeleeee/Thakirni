import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesContainer = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: ${props => props.theme.cardBackground};
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadow};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.textColor};
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  color: ${props => props.theme.textColor};
  opacity: 0.7;
  margin-bottom: 2rem;
`;

const ExploreButton = styled(Link)`
  background: ${props => props.theme.primaryColor};
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.primaryColor}dd;
    transform: translateY(-2px);
  }
`;

const CategorySection = styled.div`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.theme.textColor};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CategoryIcon = styled.span`
  font-size: 1.5rem;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const FavoriteItem = styled.div`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const ItemTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.theme.textColor};
  margin-bottom: 1rem;
`;

const ItemContent = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.borderColor};
`;

const RemoveButton = styled.button`
  background: ${props => props.theme.accentColor};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.accentColor}dd;
    transform: translateY(-2px);
  }
`;

const ViewButton = styled(Link)`
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

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  const hasFavorites = Object.values(favorites).some(items => items.length > 0);

  if (!hasFavorites) {
    return (
      <FavoritesContainer>
        <Header>
          <Title>المفضلة</Title>
          <Subtitle>كنزك الروحي الخاص</Subtitle>
        </Header>

        <EmptyState>
          <EmptyIcon>💎</EmptyIcon>
          <EmptyTitle>لا توجد مفضلات بعد</EmptyTitle>
          <EmptyText>
            ابدأ بإضافة الأذكار والقصص المفضلة لديك لتجدها هنا بسهولة
          </EmptyText>
          <ExploreButton to="/adhkar">استكشف الأذكار</ExploreButton>
        </EmptyState>
      </FavoritesContainer>
    );
  }

  return (
    <FavoritesContainer>
      <Header>
        <Title>المفضلة</Title>
        <Subtitle>كنزك الروحي الخاص</Subtitle>
      </Header>

      {favorites.adhkar.length > 0 && (
        <CategorySection>
          <CategoryTitle>
            <CategoryIcon>📿</CategoryIcon>
            الأذكار المفضلة ({favorites.adhkar.length})
          </CategoryTitle>
          <ItemsGrid>
            {favorites.adhkar.map((adhkar) => (
              <FavoriteItem key={adhkar.id}>
                <ItemTitle>{adhkar.text.substring(0, 50)}...</ItemTitle>
                <ItemContent>{adhkar.explanation}</ItemContent>
                <ItemFooter>
                  <RemoveButton onClick={() => removeFromFavorites('adhkar', adhkar.id)}>
                    حذف
                  </RemoveButton>
                  <ViewButton to="/adhkar">عرض الأذكار</ViewButton>
                </ItemFooter>
              </FavoriteItem>
            ))}
          </ItemsGrid>
        </CategorySection>
      )}

      {favorites.stories.length > 0 && (
        <CategorySection>
          <CategoryTitle>
            <CategoryIcon>📖</CategoryIcon>
            القصص المفضلة ({favorites.stories.length})
          </CategoryTitle>
          <ItemsGrid>
            {favorites.stories.map((story) => (
              <FavoriteItem key={story.id}>
                <ItemTitle>{story.title}</ItemTitle>
                <ItemContent>{story.description || 'قصة من قصص الأنبياء'}</ItemContent>
                <ItemFooter>
                  <RemoveButton onClick={() => removeFromFavorites('stories', story.id)}>
                    حذف
                  </RemoveButton>
                  <ViewButton to={`/stories/${story.id}`}>قراءة القصة</ViewButton>
                </ItemFooter>
              </FavoriteItem>
            ))}
          </ItemsGrid>
        </CategorySection>
      )}

      {favorites.duas.length > 0 && (
        <CategorySection>
          <CategoryTitle>
            <CategoryIcon>🕊️</CategoryIcon>
            الأدعية المفضلة ({favorites.duas.length})
          </CategoryTitle>
          <ItemsGrid>
            {favorites.duas.map((dua) => (
              <FavoriteItem key={dua.id}>
                <ItemTitle>{dua.title}</ItemTitle>
                <ItemContent>{dua.text}</ItemContent>
                <ItemFooter>
                  <RemoveButton onClick={() => removeFromFavorites('duas', dua.id)}>
                    حذف
                  </RemoveButton>
                </ItemFooter>
              </FavoriteItem>
            ))}
          </ItemsGrid>
        </CategorySection>
      )}

      {favorites.quranStories.length > 0 && (
        <CategorySection>
          <CategoryTitle>
            <CategoryIcon>📜</CategoryIcon>
            آيات القرآن المفضلة ({favorites.quranStories.length})
          </CategoryTitle>
          <ItemsGrid>
            {favorites.quranStories.map((story) => (
              <FavoriteItem key={story.id}>
                <ItemTitle>{story.title}</ItemTitle>
                <ItemContent>{story.ayah_text.substring(0, 100)}...</ItemContent>
                <ItemFooter>
                  <RemoveButton onClick={() => removeFromFavorites('quranStories', story.id)}>
                    حذف
                  </RemoveButton>
                                     <ViewButton to={`/quran-stories/${story.id}`}>قراءة الآية</ViewButton>
                </ItemFooter>
              </FavoriteItem>
            ))}
          </ItemsGrid>
        </CategorySection>
      )}
    </FavoritesContainer>
  );
};

export default Favorites; 