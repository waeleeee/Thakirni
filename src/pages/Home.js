import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getCurrentTimeAdhkar } from '../data/adhkarData';
import { getAsmaAllahOfTheDay, asmaAllahData } from '../data/asmaAllahData';
import TasbihCounter from '../components/TasbihCounter';
import CardOfTheDay from '../components/CardOfTheDay';
import AsmaAllahCard from '../components/AsmaAllahCard';

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
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TimeInfo = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
  margin-bottom: 2rem;
`;

const AdhkarSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.theme.textColor};
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const AdhkarCard = styled.div`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const AdhkarText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.textColor};
  margin-bottom: 1rem;
  text-align: center;
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

const Home = () => {
  const [currentAdhkar, setCurrentAdhkar] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [timeInfo, setTimeInfo] = useState('');
  const [asmaOfTheDay, setAsmaOfTheDay] = useState(null);
  const [currentAsmaIndex, setCurrentAsmaIndex] = useState(0);
  const [showAllAsma, setShowAllAsma] = useState(false);

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

      <TasbihSection>
        <SectionTitle>مسبحة الاستغفار الرقمية</SectionTitle>
        <TasbihCounter />
      </TasbihSection>

      <AsmaAllahSection>
        <SectionTitle>
          {showAllAsma ? 'أسماء الله الحسنى' : 'اسم الله الحسنى لليوم'}
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
                استكشف جميع الأسماء الحسنى
              </NavigationButton>
            </div>
          </>
        )}
        
        {showAllAsma && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <NavigationButton onClick={() => {
              setShowAllAsma(false);
              setCurrentAsmaIndex(getAsmaAllahOfTheDay().id - 1);
            }}>
              العودة لاسم اليوم
            </NavigationButton>
          </div>
        )}
      </AsmaAllahSection>

      <CardOfTheDaySection>
        <SectionTitle>نصيحة اليوم</SectionTitle>
        <CardOfTheDay />
      </CardOfTheDaySection>
    </HomeContainer>
  );
};

export default Home; 