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
];

const DefaultGreetings = () => {
  return (
    <section className="default-greetings">
      <div className="section-heading">
        <span className="section-badge">Готовые поздравления</span>
        <h2 className="section-title">Для самых близких</h2>
        <p className="section-subtitle">
          Откройте уютные открытки для мамы и папы — их можно отправить прямо сейчас.
        </p>
      </div>
      <div className="default-greetings__cards">
        {PRESET_GREETINGS.map((greeting) => {
          const theme = THEMES[greeting.theme];
          return (
            <article
              key={greeting.id}
              className="greeting-card"
              style={{
                backgroundImage: theme.gradient,
                color: theme.textColor,
                boxShadow: theme.shadow,
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
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default DefaultGreetings;
