export type ThemeKey = 'aurora' | 'sunrise' | 'lagoon' | 'forest' | 'sunset' | 'ocean' | 'lavender' | 'cherry';

export interface Theme {
  id: ThemeKey;
  name: string;
  gradient: string;
  cardBackground: string;
  textColor: string;
  mutedTextColor: string;
  buttonBackground: string;
  buttonHoverBackground: string;
  shadow: string;
}

export const THEMES: Record<ThemeKey, Theme> = {
  aurora: {
    id: 'aurora',
    name: 'Полярное сияние',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    cardBackground: 'rgba(21, 16, 37, 0.62)',
    textColor: '#ffffff',
    mutedTextColor: 'rgba(255, 255, 255, 0.8)',
    buttonBackground: 'rgba(255, 255, 255, 0.16)',
    buttonHoverBackground: 'rgba(255, 255, 255, 0.32)',
    shadow: '0 26px 60px rgba(59, 29, 90, 0.45)',
  },
  sunrise: {
    id: 'sunrise',
    name: 'Утреннее солнце',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    cardBackground: 'rgba(252, 250, 244, 0.72)',
    textColor: '#45230f',
    mutedTextColor: 'rgba(69, 35, 15, 0.76)',
    buttonBackground: 'rgba(69, 35, 15, 0.12)',
    buttonHoverBackground: 'rgba(69, 35, 15, 0.22)',
    shadow: '0 26px 60px rgba(226, 107, 48, 0.35)',
  },
  lagoon: {
    id: 'lagoon',
    name: 'Морская лагуна',
    gradient: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
    cardBackground: 'rgba(9, 33, 54, 0.56)',
    textColor: '#f4feff',
    mutedTextColor: 'rgba(244, 254, 255, 0.78)',
    buttonBackground: 'rgba(244, 254, 255, 0.18)',
    buttonHoverBackground: 'rgba(244, 254, 255, 0.32)',
    shadow: '0 26px 60px rgba(23, 72, 118, 0.42)',
  },
  forest: {
    id: 'forest',
    name: 'Лесная сказка',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    cardBackground: 'rgba(19, 35, 28, 0.64)',
    textColor: '#f0fff4',
    mutedTextColor: 'rgba(240, 255, 244, 0.82)',
    buttonBackground: 'rgba(240, 255, 244, 0.16)',
    buttonHoverBackground: 'rgba(240, 255, 244, 0.28)',
    shadow: '0 26px 60px rgba(19, 78, 48, 0.38)',
  },
  sunset: {
    id: 'sunset',
    name: 'Тропический закат',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
    cardBackground: 'rgba(255, 243, 224, 0.78)',
    textColor: '#5a3e2b',
    mutedTextColor: 'rgba(90, 62, 43, 0.72)',
    buttonBackground: 'rgba(90, 62, 43, 0.14)',
    buttonHoverBackground: 'rgba(90, 62, 43, 0.24)',
    shadow: '0 26px 60px rgba(255, 107, 107, 0.32)',
  },
  ocean: {
    id: 'ocean',
    name: 'Океанская глубина',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBackground: 'rgba(25, 20, 45, 0.68)',
    textColor: '#f8f9ff',
    mutedTextColor: 'rgba(248, 249, 255, 0.76)',
    buttonBackground: 'rgba(248, 249, 255, 0.12)',
    buttonHoverBackground: 'rgba(248, 249, 255, 0.22)',
    shadow: '0 26px 60px rgba(102, 126, 234, 0.41)',
  },
  lavender: {
    id: 'lavender',
    name: 'Лавандовое поле',
    gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    cardBackground: 'rgba(255, 253, 255, 0.82)',
    textColor: '#4a3458',
    mutedTextColor: 'rgba(74, 52, 88, 0.68)',
    buttonBackground: 'rgba(74, 52, 88, 0.10)',
    buttonHoverBackground: 'rgba(74, 52, 88, 0.18)',
    shadow: '0 26px 60px rgba(142, 197, 252, 0.36)',
  },
  cherry: {
    id: 'cherry',
    name: 'Сакура в цвету',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    cardBackground: 'rgba(255, 248, 250, 0.85)',
    textColor: '#6b4458',
    mutedTextColor: 'rgba(107, 68, 88, 0.74)',
    buttonBackground: 'rgba(107, 68, 88, 0.12)',
    buttonHoverBackground: 'rgba(107, 68, 88, 0.20)',
    shadow: '0 26px 60px rgba(255, 154, 158, 0.34)',
  },
};

export const DEFAULT_THEME: ThemeKey = 'aurora';

export const THEME_KEYS: ThemeKey[] = Object.keys(THEMES) as ThemeKey[];
