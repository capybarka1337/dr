import { useMemo, useState } from 'react';
import CustomGreetingForm from './components/CustomGreetingForm';
import DefaultGreetings from './components/DefaultGreetings';
import GreetingView from './components/GreetingView';
import { DEFAULT_THEME, THEMES, ThemeKey } from './themes';

type GeneratedData = {
  text: string;
  theme: ThemeKey;
};

const App = () => {
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);

  const searchParams = useMemo(() => {
    if (typeof window === 'undefined') {
      return new URLSearchParams('');
    }
    return new URLSearchParams(window.location.search);
  }, []);
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
    setGeneratedLink(fullLink);
    setGeneratedData({ text, theme });
    window.history.replaceState(null, '', fullLink);
  };

  return (
    <div className="landing">
      <header className="hero">
        <div className="hero__badge">Минималистичные поздравления</div>
        <h1 className="hero__title">Тёплые слова для особенного дня</h1>
        <p className="hero__subtitle">
          Создайте стильную открытку за минуту и поделитесь ссылкой — никакого сложного оформления, только красота и забота.
        </p>
      </header>
      <main className="content">
        <DefaultGreetings />
        <CustomGreetingForm onGenerate={handleGenerate} generatedLink={generatedLink} generatedData={generatedData} />
      </main>
      <footer className="footer">
        <span>С любовью и вдохновением · {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default App;
