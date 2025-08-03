import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getCurrentTimeAdhkar } from '../data/adhkarData';
import { getAsmaAllahOfTheDay, asmaAllahData } from '../data/asmaAllahData';
import TasbihCounter from '../components/TasbihCounter';
import CardOfTheDay from '../components/CardOfTheDay';
import AsmaAllahCard from '../components/AsmaAllahCard';
import specificDuasData from '../data/specific_duas.json';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HomeContainer = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GreetingSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 1s ease-out;
`;

const Greeting = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const TimeInfo = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const AdhkarSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.textColor};
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${props => props.theme.primaryColor};
    border-radius: 2px;
  }
`;

const AdhkarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const AdhkarCard = styled.div`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: ${props => props.theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const AdhkarText = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${props => props.theme.textColor};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const AdhkarCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.primaryColor};
  font-weight: 600;
`;

const CountBadge = styled.span`
  background: ${props => props.theme.primaryColor};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const TasbihSection = styled.section`
  margin-bottom: 3rem;
`;

const CardOfTheDaySection = styled.section`
  margin-bottom: 2rem;
`;

const AsmaAllahSection = styled.section`
  margin-bottom: 3rem;
`;

const NavigationButton = styled.button`
  background: ${props => props.theme.primaryColor};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.primaryColorDark};
  }
`;

const SpecificDuasSection = styled.section`
  margin-bottom: 3rem;
`;

const DuasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const DuaCard = styled.div`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    border-color: ${props => props.theme.primaryColor};
  }
`;

const DuaTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DuaText = styled.p`
  font-size: 0.95rem;
  line-height: 1.8;
  color: ${props => props.theme.textColor};
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.7;
  }
`;

const DuaCategory = styled.span`
  background: ${props => props.theme.primaryColor}15;
  color: ${props => props.theme.primaryColor};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
  }
`;

const DuaSource = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.textColor};
  opacity: 0.7;
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const DuaContext = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
  line-height: 1.6;
  text-align: center;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ViewAllButton = styled.button`
  background: ${props => props.theme.primaryColor};
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.8rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 2rem auto 0;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.7rem 1.8rem;
  }
  
  &:hover {
    background: ${props => props.theme.primaryColor}dd;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(139, 0, 0, 0.3);
  }
`;

const Home = () => {
  const [currentAdhkar, setCurrentAdhkar] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [timeInfo, setTimeInfo] = useState('');
  const [asmaOfTheDay, setAsmaOfTheDay] = useState(null);
  const [currentAsmaIndex, setCurrentAsmaIndex] = useState(0);
  const [showAllAsma, setShowAllAsma] = useState(false);
  const [showAllDuas, setShowAllDuas] = useState(false);

  useEffect(() => {
    // Définir la salutation selon l'heure
    const hour = new Date().getHours();
    let greetingText = '';
    let timeText = '';

    if (hour >= 5 && hour < 12) {
      greetingText = 'صباح الخير';
      timeText = 'أذكار الصباح';
    } else if (hour >= 12 && hour < 17) {
      greetingText = 'مساء الخير';
      timeText = 'أذكار الظهر';
    } else if (hour >= 17 && hour < 20) {
      greetingText = 'مساء الخير';
      timeText = 'أذكار العصر';
    } else {
      greetingText = 'مساء الخير';
      timeText = 'أذكار المساء';
    }

    setGreeting(greetingText);
    setTimeInfo(timeText);
    setCurrentAdhkar(getCurrentTimeAdhkar().slice(0, 3)); // Afficher seulement 3 adhkar
    setAsmaOfTheDay(getAsmaAllahOfTheDay());
    setCurrentAsmaIndex(getAsmaAllahOfTheDay().id - 1);
  }, []);

  // Get first 3 specific duas for preview
  const previewDuas = specificDuasData.specific_duas.slice(0, 3);
  const allDuas = specificDuasData.specific_duas;

  return (
    <HomeContainer>
      <GreetingSection>
        <Greeting>{greeting} 🌅</Greeting>
        <TimeInfo>{timeInfo}</TimeInfo>
      </GreetingSection>

      <AdhkarSection>
        <SectionTitle>أذكار الوقت</SectionTitle>
        <AdhkarGrid>
          {currentAdhkar.map((adhkar) => (
            <AdhkarCard key={adhkar.id}>
              <AdhkarText>{adhkar.text}</AdhkarText>
              <AdhkarCount>
                عدد المرات: <CountBadge>{adhkar.count}</CountBadge>
              </AdhkarCount>
            </AdhkarCard>
          ))}
        </AdhkarGrid>
      </AdhkarSection>

      <SpecificDuasSection>
        <SectionTitle>ادعية مخصصة</SectionTitle>
        <DuasGrid>
          {(showAllDuas ? allDuas : previewDuas).map((dua) => (
            <DuaCard key={dua.id}>
              <DuaCategory>{dua.category}</DuaCategory>
              <DuaTitle>{dua.title}</DuaTitle>
              <DuaText>{dua.dua_text}</DuaText>
              <DuaSource>المصدر: {dua.source}</DuaSource>
              <DuaContext>{dua.context_and_benefit}</DuaContext>
            </DuaCard>
          ))}
        </DuasGrid>
        {!showAllDuas && (
          <ViewAllButton onClick={() => setShowAllDuas(true)}>
            عرض جميع الأدعية المخصصة
          </ViewAllButton>
        )}
      </SpecificDuasSection>

      <TasbihSection>
        <SectionTitle>مسبحة الاستغفار الرقمية</SectionTitle>
        <TasbihCounter />
      </TasbihSection>

      <AsmaAllahSection>
        <SectionTitle>
          {showAllAsma ? 'أسماء الله الحسنى' : 'اسماء الله الحسنى '}
        </SectionTitle>
        
        {showAllAsma ? (
          <>
            <AsmaAllahCard 
              asma={asmaAllahData[currentAsmaIndex]} 
              onNext={() => setCurrentAsmaIndex((prev) => (prev + 1) % asmaAllahData.length)}
              onPrevious={() => setCurrentAsmaIndex((prev) => prev === 0 ? asmaAllahData.length - 1 : prev - 1)}
              showNavigation={true}
            />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>
                {currentAsmaIndex + 1} من {asmaAllahData.length}
              </span>
            </div>
          </>
        ) : (
          <>
            {asmaOfTheDay && <AsmaAllahCard asma={asmaOfTheDay} />}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <NavigationButton onClick={() => setShowAllAsma(true)}>
                عرض جميع أسماء الله الحسنى
              </NavigationButton>
            </div>
          </>
        )}
      </AsmaAllahSection>

      <CardOfTheDaySection>
        <CardOfTheDay />
      </CardOfTheDaySection>
    </HomeContainer>
  );
};

export default Home; 