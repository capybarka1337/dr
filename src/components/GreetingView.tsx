import ShareButton from './ShareButton';
import { DEFAULT_THEME, THEMES, ThemeKey } from '../themes';

interface GreetingViewProps {
  text: string;
  themeKey?: ThemeKey;
}

const GreetingView = ({ text, themeKey = DEFAULT_THEME }: GreetingViewProps) => {
  const theme = THEMES[themeKey] ?? THEMES[DEFAULT_THEME];
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const shareLink = typeof window !== 'undefined' ? window.location.href : '';
  const baseLink = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '/';

  return (
    <div className="shared-view" style={{ backgroundImage: theme.gradient }}>
      <div
        className="shared-view__card"
        style={{
          backgroundColor: theme.cardBackground,
          color: theme.textColor,
          boxShadow: theme.shadow,
        }}
      >
        <div className="shared-view__badge">{theme.name}</div>
        <div className="shared-view__content">
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
          Поделитесь теплом — отправьте открытку друзьям или родным.
        </p>
        <div className="shared-view__actions">
          {shareLink ? <ShareButton link={shareLink} label="Поделиться открыткой" className="shared-view__share" /> : null}
          <a className="shared-view__back" href={baseLink}>
            Создать своё поздравление
          </a>
        </div>
      </div>
    </div>
  );
};

export default GreetingView;
