import { useEffect, useState } from 'react';

const MomGreeting = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const greetingText = [
    "Любимая мамочка! ❤️",
    "",
    "Ты — самый родной и дорогой человек в моей жизни.",
    "Спасибо тебе за твою безграничную любовь, заботу и поддержку.",
    "",
    "Твоя улыбка освещает мой мир, а твои объятия дарят тепло и покой.",
    "Ты всегда рядом, когда мне нужно, и веришь в меня даже тогда, когда я сам теряю веру.",
    "",
    "Желаю тебе крепкого здоровья, бесконечного счастья и радости!",
    "Пусть каждый твой день будет наполнен светом, любовью и улыбками!",
    "",
    "Я тебя очень-очень люблю! 💝",
    "",
    "Твой самый любящий ребенок 🌟"
  ];

  const gradient = 'linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #ff9a9e 50%, #ffd6e8 75%, #fecfef 100%)';
  const cardBackground = 'rgba(255, 250, 252, 0.95)';
  const textColor = '#6b3d58';

  return (
    <div className="shared-view mom-greeting" style={{ backgroundImage: gradient }}>
      {isLoaded && (
        <>
          <div className="shared-view__confetti">
            {[...Array(30)].map((_, i) => (
              <div 
                key={i} 
                className="shared-view__confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                  backgroundColor: i % 3 === 0 ? '#ff9a9e' : i % 3 === 1 ? '#f5576c' : '#fecfef'
                }}
              />
            ))}
          </div>
          
          <div className="mom-greeting__hearts">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="mom-greeting__heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 3}s`
                }}
              >
                ❤️
              </div>
            ))}
          </div>
        </>
      )}
      
      <div className={`shared-view__card mom-greeting__card ${isLoaded ? 'loaded' : ''}`} style={{
        backgroundColor: cardBackground,
        color: textColor,
        boxShadow: '0 40px 100px rgba(245, 87, 108, 0.4), 0 0 150px rgba(240, 147, 251, 0.3)',
      }}>
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
              <p key={index} className="shared-view__line" style={{
                animationDelay: `${index * 0.1}s`
              }}>
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
