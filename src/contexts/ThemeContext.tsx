import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // Проверяем localStorage или системные настройки
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('themeMode') as ThemeMode;
      if (saved) return saved;
      
      // Проверяем системные настройки
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    // Сохраняем тему в localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', themeMode);
      
      // Добавляем/удаляем класс на body для глобальных стилей
      document.body.classList.toggle('dark-theme', themeMode === 'dark');
      document.body.classList.toggle('light-theme', themeMode === 'light');
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (theme: ThemeMode) => {
    setThemeMode(theme);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};