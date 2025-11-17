import { useMemo } from 'react';
import CustomGreetingForm from './components/CustomGreetingForm';
import DefaultGreetings from './components/DefaultGreetings';
import GreetingView from './components/GreetingView';
import MomGreeting from './components/MomGreeting';
import { DEFAULT_THEME, THEMES, ThemeKey } from './themes';

type GeneratedData = {
  text: string;
  theme: ThemeKey;
};

const App = () => {
  const searchParams = useMemo(() => {
    if (typeof window === 'undefined') {
      return new URLSearchParams('');
    }
    return new URLSearchParams(window.location.search);
  }, []);
  
  const specialPage = searchParams.get('sp');
  if (specialPage === 'mom2024') {
    return <MomGreeting />;
  }
  
  const sharedText = searchParams.get('text')?.trim();
  const requestedTheme = (searchParams.get('theme') as ThemeKey) ?? DEFAULT_THEME;
  const shareTheme = THEMES[requestedTheme] ? requestedTheme : DEFAULT_THEME;

  if (sharedText) {
    return <GreetingView text={sharedText} themeKey={shareTheme} />;
  }

  const handleGenerate = ({ text, theme }: GeneratedData) => {
    if (typeof window === 'undefined') {
      return;
    }

    const url = new URL(window.location.href);
    url.search = '';
    url.hash = '';
    url.searchParams.set('text', text);
    if (theme !== DEFAULT_THEME) {
      url.searchParams.set('theme', theme);
    }

    const fullLink = url.toString();
    
    // Сразу переходим на открытку
    window.location.href = fullLink;
  };

  return (
    <div className="landing">
      <header className="hero">
        <div className="hero__badge">✨ Красивые поздравления</div>
        <h1 className="hero__title">Создайте открытку для особенных людей</h1>
        <p className="hero__subtitle">
          Выберите из 20+ готовых поздравлений или напишите свои слова. Мгновенно создайте стильную открытку с уникальной ссылкой для отправки.
        </p>
        <div className="hero__features">
          <div className="feature">
            <span className="feature__icon">🎨</span>
            <span className="feature__text">8 уникальных тем</span>
          </div>
          <div className="feature">
            <span className="feature__icon">💝</span>
            <span className="feature__text">20+ готовых поздравлений</span>
          </div>
          <div className="feature">
            <span className="feature__icon">🔗</span>
            <span className="feature__text">Мгновенные ссылки</span>
          </div>
        </div>
      </header>
      <main className="content">
        <DefaultGreetings onGenerate={handleGenerate} />
        <CustomGreetingForm onGenerate={handleGenerate} />
      </main>
      <footer className="footer">
        <span>С любовью и вдохновением · {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default App;
