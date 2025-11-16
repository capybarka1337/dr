import { THEMES, ThemeKey } from '../themes';

interface GreetingCard {
  id: string;
  title: string;
  subtitle?: string;
  body: string[];
  theme: ThemeKey;
  badge?: string;
  accentEmoji?: string;
  isFeatured?: boolean;
}

const PRESET_GREETINGS: GreetingCard[] = [
  {
    id: 'mom_admin',
    title: 'Мама, вы — наше вдохновение',
    subtitle: 'Особенное поздравление от команды открыток',
    body: [
      'Дорогая мама, вы учите нас замечать красоту в простых жестах и делиться ею с миром.',
      'Администратор и вся команда нашего сервиса поздравлений поздравляют вас с днём рождения и желают, чтобы забота, которой вы окружаете близких, возвращалась к вам светом и нежностью.',
      'Пусть каждый новый день приносит вдохновение, лёгкость и улыбки тех, кого вы любите.',
    ],
    theme: 'cherry',
    badge: '💌 От команды проекта',
    accentEmoji: '👑',
    isFeatured: true,
  },
  {
    id: 'dad',
    title: 'С днем рождения, папа!',
    body: [
      'Спасибо за поддержку, смелость и доброту, которым ты учишь каждый день.',
      'Пускай новый год жизни будет наполнен вдохновением, радостью и победами.',
    ],
    theme: 'lagoon',
    accentEmoji: '🛠️',
  },
  {
    id: 'mom',
    title: 'С днем рождения, мама!',
    body: [
      'Ты — наше тепло, забота и свет, благодаря тебе мир становится добрее.',
      'Пусть сбудутся самые тёплые мечты, а каждый день дарит улыбку.',
    ],
    theme: 'sunrise',
    accentEmoji: '🌷',
    badge: 'Самая родная',
  },
  {
    id: 'friend',
    title: 'С днем рождения, друг!',
    body: [
      'Ты — настоящий подарок в моей жизни, спасибо за твою дружбу и поддержку.',
      'Пусть каждый день будет наполнен смехом, приключениями и яркими моментами!',
    ],
    theme: 'ocean',
    accentEmoji: '🎉',
  },
  {
    id: 'sister',
    title: 'С днем рождения, сестренка!',
    body: [
      'Ты моя лучшая подруга и самая родная душа, спасибо за то, что ты есть.',
      'Пусть твоя жизнь будет такой же яркой и прекрасной, как ты сама!',
    ],
    theme: 'lavender',
    accentEmoji: '💖',
  },
  {
    id: 'brother',
    title: 'С днем рождения, брат!',
    body: [
      'Ты мой пример силы, уверенности и настоящего мужского характера.',
      'Желаю тебе покорять новые вершины и всегда оставаться таким же крутым!',
    ],
    theme: 'forest',
    accentEmoji: '🚀',
  },
  {
    id: 'colleague',
    title: 'С днем рождения, коллега!',
    body: [
      'С тобой работать — одно удовольствие, спасибо за профессионализм и поддержку.',
      'Желаю успехов в карьере, интересных проектов и гармонии во всем!',
    ],
    theme: 'sunset',
    accentEmoji: '💼',
  },
  {
    id: 'love',
    title: 'С днем рождения, любимая!',
    body: [
      'Ты делаешь мой мир ярче и счастливее с каждым днем, спасибо за твою любовь.',
      'Пусть все твои мечты сбудутся, а я всегда буду рядом, чтобы поддержать тебя.',
    ],
    theme: 'cherry',
    accentEmoji: '💘',
  },
  {
    id: 'grandma',
    title: 'С днем рождения, бабушка!',
    body: [
      'Твоя мудрость и доброта освещают нашу семью, спасибо за твою бесконечную любовь.',
      'Пусть каждый день приносит тебе радость, здоровье и тепло близких!',
    ],
    theme: 'aurora',
    accentEmoji: '🫶',
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
          const accentEmoji = greeting.accentEmoji ?? theme.icon;

          return (
            <article
              key={greeting.id}
              className={`greeting-card greeting-card--clickable ${greeting.isFeatured ? 'greeting-card--featured' : ''}`}
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
              <div className="greeting-card__glow" aria-hidden="true"></div>
              <div className="greeting-card__particles" aria-hidden="true">
                <span className="greeting-card__particle greeting-card__particle--1">✦</span>
                <span className="greeting-card__particle greeting-card__particle--2">✶</span>
                <span className="greeting-card__particle greeting-card__particle--3">✺</span>
              </div>
              <div
                className="greeting-card__overlay"
                style={{ backgroundColor: theme.cardBackground }}
              >
                <div className="greeting-card__header">
                  <div className="greeting-card__icon" aria-hidden="true">
                    <span>{accentEmoji}</span>
                  </div>
                  <div className="greeting-card__heading">
                    {greeting.badge ? <span className="greeting-card__badge">{greeting.badge}</span> : null}
                    <h3 className="greeting-card__title">{greeting.title}</h3>
                    {greeting.subtitle ? <p className="greeting-card__subtitle">{greeting.subtitle}</p> : null}
                  </div>
                </div>
                <div className="greeting-card__text">
                  {greeting.body.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <div className="greeting-card__action">
                  <span className="greeting-card__hint">
                    <span className="greeting-card__hint-icon">→</span>
                    Создать открытку
                  </span>
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
