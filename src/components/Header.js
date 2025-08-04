import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { adhkarData } from '../data/adhkarData';
import { asmaAllahData } from '../data/asmaAllahData';
import { storiesData } from '../data/storiesData';
import { quranAyahStoriesData } from '../data/quranAyahStoriesData';

const HeaderContainer = styled.header`
  background: linear-gradient(90deg, #4A148C 0%, #7B1FA2 50%, #9C27B0 100%);
  padding: 0.8rem 1.5rem;
  box-shadow: 0 2px 20px rgba(74, 20, 140, 0.25);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 3px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  
  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    gap: 0.6rem;
  }
`;

const LogoIcon = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.05);
    
    img {
      filter: drop-shadow(0 6px 20px rgba(0, 0, 0, 0.4));
    }
  }
  
  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const LogoText = styled.span`
  font-family: 'Amiri', serif;
  letter-spacing: 2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 1px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.8rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.4rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(74, 20, 140, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const NotificationButton = styled(ActionButton)`
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    background: #E1BEE7;
    border-radius: 50%;
    border: 2px solid white;
    animation: ${props => props.$hasNotification ? 'pulse 2s infinite' : 'none'};
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ThemeToggle = styled(ActionButton)`
  &:hover {
    transform: translateY(-2px) rotate(180deg);
  }
`;

const SearchButton = styled(ActionButton)`
  &:hover {
    transform: translateY(-2px) scale(1.05);
  }
`;

const NotificationModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(74, 20, 140, 0.4);
  z-index: 2000;
  max-width: 500px;
  width: 90%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  animation: slideIn 0.5s ease-out;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1999;
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const NotificationTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const NotificationContent = styled.div`
  color: white;
  font-size: 1rem;
  line-height: 1.8;
  text-align: center;
  margin-bottom: 1.5rem;
  opacity: 0.95;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const NotificationSource = styled.div`
  color: #E1BEE7;
  font-size: 0.8rem;
  text-align: center;
  font-style: italic;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.7rem 1.8rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.85rem;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const SearchModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(74, 20, 140, 0.4);
  z-index: 2000;
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  animation: slideIn 0.5s ease-out;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SearchTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SearchInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 0.9rem;
  font-size: 1rem;
  color: white;
  outline: none;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    border-color: #E1BEE7;
    box-shadow: 0 0 20px rgba(225, 190, 231, 0.3);
  }
`;

const SearchSubmitButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.9rem 1.8rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SearchCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const CategoryButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.7rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.75rem;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const SearchResults = styled.div`
  margin-top: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
`;

const ResultItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    border-color: rgba(225, 190, 231, 0.5);
  }
  
  &::after {
    content: '👆';
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 0.8rem;
    opacity: 0.7;
  }
`;

const ResultTitle = styled.h4`
  color: #E1BEE7;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ResultContent = styled.p`
  color: white;
  font-size: 0.8rem;
  line-height: 1.5;
  opacity: 0.9;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const ResultCategory = styled.span`
  background: rgba(225, 190, 231, 0.2);
  color: #E1BEE7;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.65rem;
    padding: 0.15rem 0.4rem;
  }
`;

const NoResults = styled.div`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 2rem;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 1.5rem;
  }
`;

// Daily advice data - messages from Allah
const dailyAdvice = [
  {
    id: 1,
    message: "يا عبدي، تذكر أن الصبر مفتاح الفرج، والرضا سبيل السعادة. لا تستعجل الأمور، فلكل شيء وقت محدد.",
    source: "رسالة من الله تعالى"
  },
  {
    id: 2,
    message: "يا بني آدم، اعلم أن الدنيا دار اختبار، والآخرة دار قرار. اعمل لدنياك كأنك تعيش أبداً، واعمل لآخرتك كأنك تموت غداً.",
    source: "رسالة من الله تعالى"
  },
  {
    id: 3,
    message: "يا عبدي، إن الصلاة نور، والصدقة برهان، والصبر ضياء. فاحرص على ما ينفعك، واستعن بالله ولا تعجز.",
    source: "رسالة من الله تعالى"
  },
  {
    id: 4,
    message: "يا بني آدم، تذكر أن الله مع الصابرين، ومع المتوكلين، ومع المخلصين. فكن منهم وارحم من في الأرض يرحمك من في السماء.",
    source: "رسالة من الله تعالى"
  },
  {
    id: 5,
    message: "يا عبدي، إن الحمد لله يملأ الميزان، وسبحان الله والحمد لله تملآن ما بين السماء والأرض. فأكثر من ذكره واشكره.",
    source: "رسالة من الله تعالى"
  },
  {
    id: 6,
    message: "يا بني آدم، اعلم أن الله يحب المحسنين، والمتطهرين، والتوابين. فكن محسناً في عملك، متطهراً في قلبك، تواباً إلى ربك.",
    source: "رسالة من الله تعالى"
  },
  {
    id: 7,
    message: "يا عبدي، تذكر أن الدعاء مخ العبادة، وأن الله قريب من عباده. فلا تيأس من رحمة الله، وادعه في كل وقت وحين.",
    source: "رسالة من الله تعالى"
  },
  {
    id: 8,
    message: "يا بني آدم، إن الله جميل يحب الجمال، طيب يحب الطيب، نظيف يحب النظافة. فكن جميلاً في أخلاقك، طيباً في كلامك، نظيفاً في عملك.",
    source: "رسالة من الله تعالى"
  },
  {
    id: 9,
    message: "يا عبدي، اعلم أن العلم نور، والجهل ظلام. فاطلب العلم من المهد إلى اللحد، وعلِّم غيرك ما تعلمت.",
    source: "رسالة من الله تعالى"
  },
  {
    id: 10,
    message: "يا بني آدم، تذكر أن الله غفور رحيم، يقبل التوبة عن عباده ويعفو عن السيئات. فتب إلى الله واطلب مغفرته.",
    source: "رسالة من الله تعالى"
  }
];

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [currentAdvice, setCurrentAdvice] = useState(null);
  const [hasNotification, setHasNotification] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNotificationClick = () => {
    if (hasNotification) {
      setShowNotification(true);
      setHasNotification(false);
    } else {
      // Show notification immediately when clicked, even if no pending notification
      showRandomAdvice();
      setShowNotification(true);
    }
  };

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const performSearch = (query) => {
    const results = [];
    const searchTerm = query.trim();
    
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    // Helper function for Arabic text search
    const arabicSearch = (text, searchTerm) => {
      if (!text || !searchTerm) return false;
      return text.includes(searchTerm) || 
             text.includes(searchTerm.replace(/[أإآ]/g, 'ا')) ||
             text.includes(searchTerm.replace(/[ىي]/g, 'ي')) ||
             text.includes(searchTerm.replace(/[ةه]/g, 'ه'));
    };

    // Search in Adhkar
    adhkarData.adhkar.forEach((dhikr) => {
      if (arabicSearch(dhikr.text, searchTerm) || 
          arabicSearch(dhikr.explanation, searchTerm) ||
          arabicSearch(dhikr.source, searchTerm)) {
        results.push({
          type: 'adhkar',
          id: dhikr.id,
          title: `أذكار ${dhikr.category === 'morning' ? 'الصباح' : 'المساء'}`,
          content: dhikr.text.substring(0, 150) + '...',
          category: '📿 الأذكار',
          fullData: dhikr
        });
      }
    });

    // Search in Asma Allah
    asmaAllahData.forEach((asma) => {
      if (arabicSearch(asma.name, searchTerm) || 
          arabicSearch(asma.meaning, searchTerm) ||
          arabicSearch(asma.reflection, searchTerm)) {
        results.push({
          type: 'asma',
          id: asma.id,
          title: asma.name,
          content: asma.meaning.substring(0, 150) + '...',
          category: '🕌 أسماء الله',
          fullData: asma
        });
      }
    });

    // Search in Stories
    storiesData.forEach((story) => {
      if (arabicSearch(story.title, searchTerm) || 
          arabicSearch(story.description, searchTerm) ||
          arabicSearch(story.prophet_name, searchTerm) ||
          arabicSearch(story.content, searchTerm)) {
        results.push({
          type: 'story',
          id: story.id,
          title: story.title,
          content: story.description,
          category: '📖 القصص',
          fullData: story
        });
      }
    });

    // Search in Quran Stories
    quranAyahStoriesData.forEach((quranStory) => {
      if (arabicSearch(quranStory.title, searchTerm) || 
          arabicSearch(quranStory.ayah_text, searchTerm) ||
          arabicSearch(quranStory.story_and_context, searchTerm)) {
        results.push({
          type: 'quran',
          id: quranStory.id,
          title: quranStory.title,
          content: quranStory.ayah_text.substring(0, 150) + '...',
          category: '📜 القرآن',
          fullData: quranStory
        });
      }
    });

    setSearchResults(results);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  const handleResultClick = (result) => {
    // Navigate based on result type
    switch (result.type) {
      case 'adhkar':
        navigate('/adhkar', { 
          state: { 
            focusedAdhkarId: result.id 
          } 
        });
        break;
      case 'asma':
        // Navigate to home and set the specific Asma Allah to show
        navigate('/', { 
          state: { 
            showAsmaAllah: true, 
            selectedAsmaId: result.id 
          } 
        });
        break;
      case 'story':
        navigate(`/stories/${result.id}`, { 
          state: { 
            focusedStoryId: result.id 
          } 
        });
        break;
      case 'quran':
        navigate(`/quran-stories/${result.id}`, { 
          state: { 
            focusedQuranStoryId: result.id 
          } 
        });
        break;
      default:
        break;
    }
    closeSearch();
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  const showRandomAdvice = () => {
    const randomIndex = Math.floor(Math.random() * dailyAdvice.length);
    setCurrentAdvice(dailyAdvice[randomIndex]);
    setHasNotification(true);
  };

  useEffect(() => {
    // Show notification every 10 minutes (600,000 milliseconds)
    const interval = setInterval(() => {
      showRandomAdvice();
    }, 600000); // 10 minutes

    // Show initial notification after 10 minutes
    const initialTimeout = setTimeout(() => {
      showRandomAdvice();
    }, 600000);

    // For testing: Show first notification after 5 seconds
    const testTimeout = setTimeout(() => {
      showRandomAdvice();
    }, 5000); // 5 seconds for testing

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
      clearTimeout(testTimeout);
    };
  }, []);

  return (
    <>
      <HeaderContainer>
        <Nav>
          <Logo onClick={handleLogoClick}>
            <LogoIcon>
              <img src="/logo.png" alt="Logo" />
            </LogoIcon>
          </Logo>
          
                                <HeaderActions>
             <SearchButton onClick={handleSearchClick}>
               🔍
             </SearchButton>
             
             <NotificationButton 
               onClick={handleNotificationClick}
               $hasNotification={hasNotification}
             >
               🔔
             </NotificationButton>
           </HeaderActions>
        </Nav>
      </HeaderContainer>

             {showNotification && currentAdvice && (
         <>
           <ModalOverlay onClick={closeNotification} />
           <NotificationModal>
             <NotificationTitle>نصيحة اليوم</NotificationTitle>
             <NotificationContent>
               {currentAdvice.message}
             </NotificationContent>
             <NotificationSource>
               {currentAdvice.source}
             </NotificationSource>
             <CloseButton onClick={closeNotification}>
               إغلاق
             </CloseButton>
           </NotificationModal>
         </>
       )}

       {showSearch && (
         <>
           <ModalOverlay onClick={closeSearch} />
           <SearchModal>
             <SearchForm onSubmit={handleSearchSubmit}>
               <SearchTitle>البحث في ذكرني</SearchTitle>
                               <SearchInput
                  type="text"
                  placeholder="ابحث في الأذكار، القصص، أسماء الله الحسنى..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  autoFocus
                />
                               <SearchSubmitButton type="submit" disabled={!searchQuery.trim()}>
                  🔍 بحث
                </SearchSubmitButton>
                               <SearchCategories>
                  <CategoryButton type="button" onClick={() => {
                    setSearchQuery('أذكار الصباح');
                    performSearch('أذكار الصباح');
                  }}>
                    📿 الأذكار
                  </CategoryButton>
                  <CategoryButton type="button" onClick={() => {
                    setSearchQuery('قصص الأنبياء');
                    performSearch('قصص الأنبياء');
                  }}>
                    📖 القصص
                  </CategoryButton>
                  <CategoryButton type="button" onClick={() => {
                    setSearchQuery('أسماء الله الحسنى');
                    performSearch('أسماء الله الحسنى');
                  }}>
                    🕌 أسماء الله
                  </CategoryButton>
                  <CategoryButton type="button" onClick={() => {
                    setSearchQuery('آيات قرآنية');
                    performSearch('آيات قرآنية');
                  }}>
                    📜 القرآن
                  </CategoryButton>
                </SearchCategories>
                
                                 {searchResults.length > 0 && (
                   <SearchResults>
                     {searchResults.map((result, index) => (
                       <ResultItem 
                         key={`${result.type}-${result.id}-${index}`}
                         onClick={() => handleResultClick(result)}
                       >
                         <ResultTitle>{result.title}</ResultTitle>
                         <ResultContent>{result.content}</ResultContent>
                         <ResultCategory>{result.category}</ResultCategory>
                       </ResultItem>
                     ))}
                   </SearchResults>
                 )}
                
                {searchQuery.trim() && searchResults.length === 0 && (
                  <NoResults>
                    لا توجد نتائج لـ "{searchQuery}"
                  </NoResults>
                )}
             </SearchForm>
           </SearchModal>
         </>
       )}
    </>
  );
};

export default Header; 