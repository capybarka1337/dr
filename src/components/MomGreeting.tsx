import { useEffect, useMemo, useState } from 'react';

const MomGreeting = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [animationsActive, setAnimationsActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleChange();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimationsActive(false);
      return;
    }

    setAnimationsActive(true);

    const timer = setTimeout(() => setAnimationsActive(false), 8000);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  const greetingText = [
    "Любимая мамочка! ❤️",
    "",
    "Ты — самый родной и дорогой человек.",
    "Спасибо за твою безграничную любовь, заботу и поддержку.",
    "",
    "Твоя улыбка освещает этот мир, а твои объятия дарят тепло и покой.",
    "Ты всегда есть для тех, кто нуждается, и верила, когда было сложнее всего.",
    "",
    "Желаю крепкого здоровья, бесконечного счастья и радости!",
    "Пусть каждый день будет наполнен светом, любовью и улыбками!",
    "",
    "Этот сайт создан специально для тебя с помощью нейросетей.",
    "И эти тёплые слова тоже придумала нейросеть.",
    "",
    "Поздравляем! 💝",
    "",
    "✨ Сгенерировано нейросетью"
  ];

  const gradient = 'linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #ff9a9e 50%, #ffd6e8 75%, #fecfef 100%)';
  const cardBackground = 'rgba(255, 250, 252, 0.98)';
  const textColor = '#6b3d58';

  const confettiPieces = useMemo(() => {
    if (!animationsActive || prefersReducedMotion) {
      return [];
    }

    const colors = ['#ff9a9e', '#f5576c', '#fecfef', '#ffd6e8'];
    const totalPieces = 8;

    return Array.from({ length: totalPieces }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 2.5,
      duration: 5 + Math.random() * 4,
      color: colors[index % colors.length],
    }));
  }, [animationsActive, prefersReducedMotion]);

  const floatingHearts = useMemo(() => {
    if (!animationsActive || prefersReducedMotion) {
      return [];
    }

    const totalHearts = 4;

    return Array.from({ length: totalHearts }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 5 + Math.random() * 4,
    }));
  }, [animationsActive, prefersReducedMotion]);

  const containerClassName = [
    'shared-view',
    'mom-greeting',
    animationsActive ? 'mom-greeting--animated' : 'mom-greeting--static',
  ].join(' ');

  const shouldShowDecorations = isLoaded && animationsActive && !prefersReducedMotion;

  return (
    <div className={containerClassName} style={{ backgroundImage: gradient }}>
      {shouldShowDecorations && (
        <>
          {confettiPieces.length > 0 && (
            <div className="shared-view__confetti">
              {confettiPieces.map((piece) => (
                <div
                  key={piece.id}
                  className="shared-view__confetti-piece"
                  style={{
                    left: `${piece.left}%`,
                    animationDelay: `${piece.delay}s`,
                    animationDuration: `${piece.duration}s`,
                    backgroundColor: piece.color,
                  }}
                />
              ))}
            </div>
          )}

          {floatingHearts.length > 0 && (
            <div className="mom-greeting__hearts">
              {floatingHearts.map((heart) => (
                <div
                  key={heart.id}
                  className="mom-greeting__heart"
                  style={{
                    left: `${heart.left}%`,
                    animationDelay: `${heart.delay}s`,
                    animationDuration: `${heart.duration}s`,
                  }}
                >
                  ❤️
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div
        className={`shared-view__card mom-greeting__card ${isLoaded ? 'loaded' : ''}`}
        style={{
          backgroundColor: cardBackground,
          color: textColor,
          boxShadow: '0 40px 100px rgba(245, 87, 108, 0.4), 0 0 150px rgba(240, 147, 251, 0.3)',
        }}
      >
        <div className="shared-view__decorations">
          <div className="shared-view__sparkle shared-view__sparkle--1">✨</div>
          <div className="shared-view__sparkle shared-view__sparkle--2">💖</div>
          <div className="shared-view__sparkle shared-view__sparkle--3">🌸</div>
          <div className="shared-view__sparkle shared-view__sparkle--4">💝</div>
        </div>

        <div className="mom-greeting__header">
          <div className="mom-greeting__icon">🌹</div>
          <div className="mom-greeting__title">Для самой лучшей мамы на свете</div>
        </div>

        <div className="shared-view__content mom-greeting__content">
          {greetingText.map((line, index) =>
            line === "" ? (
              <div key={index} style={{ height: '0.5em' }} />
            ) : (
              <p
                key={index}
                className="shared-view__line"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {line}
              </p>
            )
          )}
        </div>

        <div className="mom-greeting__footer">
          <div className="mom-greeting__decoration">✨ 💐 ✨</div>
        </div>

        <div className="shared-view__corner-decoration shared-view__corner-decoration--tl"></div>
        <div className="shared-view__corner-decoration shared-view__corner-decoration--tr"></div>
        <div className="shared-view__corner-decoration shared-view__corner-decoration--bl"></div>
        <div className="shared-view__corner-decoration shared-view__corner-decoration--br"></div>
      </div>
    </div>
  );
};

export default MomGreeting;
