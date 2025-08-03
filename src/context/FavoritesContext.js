import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Assurez-vous que toutes les catégories existent
      return {
        adhkar: parsed.adhkar || [],
        stories: parsed.stories || [],
        duas: parsed.duas || [],
        quranStories: parsed.quranStories || []
      };
    }
    return {
      adhkar: [],
      stories: [],
      duas: [],
      quranStories: []
    };
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (type, item) => {
    setFavorites(prev => ({
      ...prev,
      [type]: [...prev[type], item]
    }));
  };

  const removeFromFavorites = (type, itemId) => {
    setFavorites(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== itemId)
    }));
  };

  const isFavorite = (type, itemId) => {
    return favorites[type].some(item => item.id === itemId);
  };

  const toggleFavorite = (type, item) => {
    if (isFavorite(type, item.id)) {
      removeFromFavorites(type, item.id);
    } else {
      addToFavorites(type, item);
    }
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext }; 