import { THEMES, ThemeKey } from '../themes';

interface GreetingCard {
  id: string;
  title: string;
  body: string[];
  theme: ThemeKey;
}

const PRESET_GREETINGS: GreetingCard[] = [
  {
    id: 'dad',
    title: 'С днем рождения, папа!',
    body: [
      'Спасибо за поддержку, смелость и доброту, которым ты учишь каждый день.',
      'Пускай новый год жизни будет наполнен вдохновением, радостью и победами.',
    ],
    theme: 'lagoon',
  },
  {
    id: 'mom',
    title: 'С днем рождения, мама!',
    body: [
      'Ты — наше тепло, забота и свет, благодаря тебе мир становится добрее.',
      'Пусть сбудутся самые тёплые мечты, а каждый день дарит улыбку.',
    ],
    theme: 'sunrise',
  },
  {
    id: 'friend',
    title: 'С днем рождения, друг!',
    body: [
      'Ты — настоящий подарок в моей жизни, спасибо за твою дружбу и поддержку.',
      'Пусть каждый день будет наполнен смехом, приключениями и яркими моментами!',
    ],
    theme: 'ocean',
  },
  {
    id: 'sister',
    title: 'С днем рождения, сестренка!',
    body: [
      'Ты моя лучшая подруга и самая родная душа, спасибо за то, что ты есть.',
      'Пусть твоя жизнь будет такой же яркой и прекрасной, как ты сама!',
    ],
    theme: 'lavender',
  },
  {
    id: 'brother',
    title: 'С днем рождения, брат!',
    body: [
      'Ты мой пример силы, уверенности и настоящего мужского характера.',
      'Желаю тебе покорять новые вершины и всегда оставаться таким же крутым!',
    ],
    theme: 'forest',
  },
  {
    id: 'colleague',
    title: 'С днем рождения, коллега!',
    body: [
      'С тобой работать — одно удовольствие, спасибо за профессионализм и поддержку.',
      'Желаю успехов в карьере, интересных проектов и гармонии во всем!',
    ],
    theme: 'sunset',
  },
  {
    id: 'love',
    title: 'С днем рождения, любимая!',
    body: [
      'Ты делаешь мой мир ярче и счастливее с каждым днем, спасибо за твою любовь.',
      'Пусть все твои мечты сбудутся, а я всегда буду рядом, чтобы поддержать тебя.',
    ],
    theme: 'cherry',
  },
  {
    id: 'grandma',
    title: 'С днем рождения, бабушка!',
    body: [
      'Твоя мудрость и доброта освещают нашу семью, спасибо за твою бесконечную любовь.',
      'Пусть каждый день приносит тебе радость, здоровье и тепло близких!',
    ],
    theme: 'aurora',
  },
];

interface DefaultGreetingsProps {
  onGenerate: (payload: { text: string; theme: ThemeKey }) => void;
}

const DefaultGreetings = ({ onGenerate }: DefaultGreetingsProps) => {
  const handleCardClick = (greeting: GreetingCard) => {
    const fullText = `${greeting.title}\n\n${greeting.body.join('\n')}`;
    onGenerate({ text: fullText, theme: greeting.theme });
  };

  return (
    <section className="default-greetings">
      <div className="section-heading">
        <span className="section-badge">Готовые поздравления</span>
        <h2 className="section-title">Для самых близких</h2>
        <p className="section-subtitle">
          Выберите тёплое поздравление для любимых людей — кликните, чтобы создать красивую открытку с уникальной ссылкой.
        </p>
      </div>
      <div className="default-greetings__cards">
        {PRESET_GREETINGS.map((greeting) => {
          const theme = THEMES[greeting.theme];
          return (
            <article
              key={greeting.id}
              className="greeting-card greeting-card--clickable"
              style={{
                backgroundImage: theme.gradient,
                color: theme.textColor,
                boxShadow: theme.shadow,
              }}
              onClick={() => handleCardClick(greeting)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(greeting);
                }
              }}
            >
              <div
                className="greeting-card__overlay"
                style={{ backgroundColor: theme.cardBackground }}
              >
                <h3 className="greeting-card__title">{greeting.title}</h3>
                <div className="greeting-card__text">
                  {greeting.body.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <div className="greeting-card__action">
                  <span className="greeting-card__hint">Нажмите, чтобы создать открытку →</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default DefaultGreetings;
