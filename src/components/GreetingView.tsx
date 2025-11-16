import ShareButton from './ShareButton';
import { DEFAULT_THEME, THEMES, ThemeKey } from '../themes';
import { useEffect, useState } from 'react';

interface GreetingViewProps {
  text: string;
  themeKey?: ThemeKey;
}

const GreetingView = ({ text, themeKey = DEFAULT_THEME }: GreetingViewProps) => {
  const theme = THEMES[themeKey] ?? THEMES[DEFAULT_THEME];
  const [isLoaded, setIsLoaded] = useState(false);
  
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const shareLink = typeof window !== 'undefined' ? window.location.href : '';
  const baseLink = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '/';

  useEffect(() => {
    // Запускаем анимацию после монтирования
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isLongGreeting = lines.length > 3;

  return (
    <div className="shared-view" style={{ backgroundImage: theme.gradient }}>
      {/* Конфетти эффект */}
      {isLoaded && (
        <div className="shared-view__confetti">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="shared-view__confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      
      <div className={`shared-view__card ${isLoaded ? 'loaded' : ''} ${isLongGreeting ? 'long-greeting' : ''}`} style={{
        backgroundColor: theme.cardBackground,
        color: theme.textColor,
        boxShadow: theme.shadow,
      }}>
        {/* Декоративные элементы */}
        <div className="shared-view__decorations">
          <div className="shared-view__sparkle shared-view__sparkle--1">✨</div>
          <div className="shared-view__sparkle shared-view__sparkle--2">💫</div>
          <div className="shared-view__sparkle shared-view__sparkle--3">⭐</div>
        </div>

        <div className="shared-view__badge" style={{ 
          background: `linear-gradient(135deg, ${theme.buttonBackground}, ${theme.buttonHoverBackground})`,
          border: `1px solid ${theme.textColor}20`
        }}>
          <span style={{ marginRight: '6px' }}>{theme.icon}</span>
          {theme.name}
        </div>

        <div className={`shared-view__content ${isLongGreeting ? 'compact' : ''}`}>
          {lines.length > 0 ? (
            lines.map((line, index) => (
              <p key={`${line}-${index}`} className="shared-view__line">
                {line}
              </p>
            ))
          ) : (
            <p className="shared-view__line">Здесь появится текст поздравления.</p>
          )}
        </div>

        <p className="shared-view__note" style={{ color: theme.mutedTextColor }}>
          🎉 Поделитесь теплом — отправьте открытку друзьям или родным.
        </p>

        <div className="shared-view__actions">
          {shareLink ? (
            <ShareButton 
              link={shareLink} 
              label="Поделиться открыткой" 
              className="shared-view__share" 
            />
          ) : null}
          <a className="shared-view__back" href={baseLink}>
            <span>Создать своё поздравление</span>
          </a>
        </div>

        {/* Дополнительные декоративные элементы */}
        <div className="shared-view__corner-decoration shared-view__corner-decoration--tl"></div>
        <div className="shared-view__corner-decoration shared-view__corner-decoration--tr"></div>
        <div className="shared-view__corner-decoration shared-view__corner-decoration--bl"></div>
        <div className="shared-view__corner-decoration shared-view__corner-decoration--br"></div>
      </div>
    </div>
  );
};

export default GreetingView;
