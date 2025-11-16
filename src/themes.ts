export type ThemeKey = 'aurora' | 'sunrise' | 'lagoon';

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
};

export const DEFAULT_THEME: ThemeKey = 'aurora';

export const THEME_KEYS: ThemeKey[] = Object.keys(THEMES) as ThemeKey[];
