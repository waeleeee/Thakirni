import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ThemeContext } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { useState } from 'react';

// Components
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import PWAInstall from './components/PWAInstall';
import OfflineStatus from './components/OfflineStatus';

// Pages
import Home from './pages/Home';
import Adhkar from './pages/Adhkar';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail';
import QuranStories from './pages/QuranStories';
import QuranStoryDetail from './pages/QuranStoryDetail';
import Favorites from './pages/Favorites';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    direction: rtl;
    height: 100%;
    overflow-x: hidden;
  }
  
  body {
    font-family: 'Noto Kufi Arabic', sans-serif;
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    transition: all 0.3s ease;
    line-height: 1.6;
    height: 100%;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  /* Ensure smooth scrolling */
  * {
    scroll-behavior: smooth;
  }
  
  /* Fix for iOS Safari */
  @supports (-webkit-touch-callout: none) {
    body {
      -webkit-overflow-scrolling: touch;
    }
  }
`;

const AppContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  padding-bottom: 130px; // Increased space for larger bottom navigation
  padding-top: 0; // Will be adjusted by OfflineStatus component
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; // Smooth scrolling on iOS
`;

// Themes
const lightTheme = {
  backgroundColor: '#fafafa',
  textColor: '#374151',
  primaryColor: '#8b5cf6',
  secondaryColor: '#10b981',
  accentColor: '#f59e0b',
  cardBackground: '#ffffff',
  borderColor: '#e5e7eb',
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
  successColor: '#10b981',
  warningColor: '#f59e0b',
  infoColor: '#3b82f6'
};

const darkTheme = {
  backgroundColor: '#111827',
  textColor: '#f9fafb',
  primaryColor: '#a78bfa',
  secondaryColor: '#34d399',
  accentColor: '#fbbf24',
  cardBackground: '#1f2937',
  borderColor: '#374151',
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  gradient: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
  successColor: '#34d399',
  warningColor: '#fbbf24',
  infoColor: '#60a5fa'
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, theme }}>
      <ThemeProvider theme={theme}>
        <FavoritesProvider>
          <GlobalStyle />
          <Router>
            <AppContainer>
              <OfflineStatus />
              <Header />
              <MainContent>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/adhkar" element={<Adhkar />} />
                  <Route path="/stories" element={<Stories />} />
                  <Route path="/stories/:id" element={<StoryDetail />} />
                  <Route path="/quran-stories" element={<QuranStories />} />
                  <Route path="/quran-stories/:id" element={<QuranStoryDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Routes>
              </MainContent>
              <BottomNav />
              <PWAInstall />
            </AppContainer>
          </Router>
        </FavoritesProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;