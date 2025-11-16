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
  icon: string;
}

export const THEMES: Record<ThemeKey, Theme> = {
  aurora: {
    id: 'aurora',
    name: 'Полярное сияние',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #c471ed 75%, #667eea 100%)',
    cardBackground: 'rgba(15, 10, 35, 0.75)',
    textColor: '#ffffff',
    mutedTextColor: 'rgba(255, 255, 255, 0.85)',
    buttonBackground: 'rgba(255, 255, 255, 0.18)',
    buttonHoverBackground: 'rgba(255, 255, 255, 0.35)',
    shadow: '0 32px 80px rgba(102, 126, 234, 0.55), 0 0 120px rgba(118, 75, 162, 0.3)',
    icon: '🌌',
  },
  sunrise: {
    id: 'sunrise',
    name: 'Утреннее солнце',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 20%, #ff8177 40%, #ff6b6b 60%, #feca57 80%, #ffecd2 100%)',
    cardBackground: 'rgba(255, 251, 245, 0.85)',
    textColor: '#5d2f0d',
    mutedTextColor: 'rgba(93, 47, 13, 0.78)',
    buttonBackground: 'rgba(93, 47, 13, 0.15)',
    buttonHoverBackground: 'rgba(93, 47, 13, 0.28)',
    shadow: '0 32px 80px rgba(252, 182, 159, 0.45), 0 0 100px rgba(255, 129, 119, 0.25)',
    icon: '🌅',
  },
  lagoon: {
    id: 'lagoon',
    name: 'Морская лагуна',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #43cea2 50%, #185a9d 75%, #4facfe 100%)',
    cardBackground: 'rgba(5, 25, 45, 0.78)',
    textColor: '#e6fffe',
    mutedTextColor: 'rgba(230, 255, 254, 0.82)',
    buttonBackground: 'rgba(230, 255, 254, 0.20)',
    buttonHoverBackground: 'rgba(230, 255, 254, 0.35)',
    shadow: '0 32px 80px rgba(67, 206, 162, 0.48), 0 0 120px rgba(24, 90, 157, 0.35)',
    icon: '🌊',
  },
  forest: {
    id: 'forest',
    name: 'Лесная сказка',
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 20%, #2c5364 40%, #134e5e 60%, #71b280 80%, #0f2027 100%)',
    cardBackground: 'rgba(10, 25, 15, 0.72)',
    textColor: '#f0fff4',
    mutedTextColor: 'rgba(240, 255, 244, 0.86)',
    buttonBackground: 'rgba(240, 255, 244, 0.18)',
    buttonHoverBackground: 'rgba(240, 255, 244, 0.32)',
    shadow: '0 32px 80px rgba(19, 78, 48, 0.45), 0 0 100px rgba(113, 178, 128, 0.3)',
    icon: '🌲',
  },
  sunset: {
    id: 'sunset',
    name: 'Тропический закат',
    gradient: 'linear-gradient(135deg, #ee9ca7 0%, #ff6b6b 25%, #feca57 50%, #ff8e53 75%, #ee9ca7 100%)',
    cardBackground: 'rgba(255, 240, 220, 0.85)',
    textColor: '#4a2f1a',
    mutedTextColor: 'rgba(74, 47, 26, 0.76)',
    buttonBackground: 'rgba(74, 47, 26, 0.16)',
    buttonHoverBackground: 'rgba(74, 47, 26, 0.28)',
    shadow: '0 32px 80px rgba(255, 107, 107, 0.42), 0 0 100px rgba(254, 202, 87, 0.3)',
    icon: '🌺',
  },
  ocean: {
    id: 'ocean',
    name: 'Океанская глубина',
    gradient: 'linear-gradient(135deg, #4158D0 0%, #C850C0 25%, #667eea 50%, #764ba2 75%, #4158D0 100%)',
    cardBackground: 'rgba(18, 12, 38, 0.78)',
    textColor: '#f8f9ff',
    mutedTextColor: 'rgba(248, 249, 255, 0.8)',
    buttonBackground: 'rgba(248, 249, 255, 0.15)',
    buttonHoverBackground: 'rgba(248, 249, 255, 0.28)',
    shadow: '0 32px 80px rgba(102, 126, 234, 0.48), 0 0 120px rgba(118, 75, 162, 0.35)',
    icon: '🐠',
  },
  lavender: {
    id: 'lavender',
    name: 'Лавандовое поле',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 25%, #e0c3fc 50%, #8ec5fc 75%, #fa709a 100%)',
    cardBackground: 'rgba(255, 253, 255, 0.88)',
    textColor: '#4a3458',
    mutedTextColor: 'rgba(74, 52, 88, 0.72)',
    buttonBackground: 'rgba(74, 52, 88, 0.12)',
    buttonHoverBackground: 'rgba(74, 52, 88, 0.22)',
    shadow: '0 32px 80px rgba(142, 197, 252, 0.42), 0 0 100px rgba(224, 195, 252, 0.3)',
    icon: '💜',
  },
  cherry: {
    id: 'cherry',
    name: 'Сакура в цвету',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #ff9a9e 50%, #fecfef 75%, #f093fb 100%)',
    cardBackground: 'rgba(255, 248, 250, 0.9)',
    textColor: '#6b4458',
    mutedTextColor: 'rgba(107, 68, 88, 0.78)',
    buttonBackground: 'rgba(107, 68, 88, 0.14)',
    buttonHoverBackground: 'rgba(107, 68, 88, 0.25)',
    shadow: '0 32px 80px rgba(255, 154, 158, 0.42), 0 0 100px rgba(240, 207, 239, 0.35)',
    icon: '🌸',
  },
};

export const DEFAULT_THEME: ThemeKey = 'aurora';

export const THEME_KEYS: ThemeKey[] = Object.keys(THEMES) as ThemeKey[];
