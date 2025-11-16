import { useState } from 'react';

interface ShareButtonProps {
  link: string;
  label?: string;
  className?: string;
}

type ShareState = 'idle' | 'copied' | 'shared' | 'error';

const ShareButton = ({ link, label = 'Поделиться', className }: ShareButtonProps) => {
  const [state, setState] = useState<ShareState>('idle');

  const resetLater = () => {
    window.setTimeout(() => {
      setState('idle');
    }, 2600);
  };

  const copyLink = async () => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(link);
        setState('copied');
        resetLater();
        return;
      } catch (error) {
        // Fallback to manual copy below
      }
    }

    try {
      const tempArea = document.createElement('textarea');
      tempArea.value = link;
      tempArea.style.position = 'fixed';
      tempArea.style.opacity = '0';
      document.body.appendChild(tempArea);
      tempArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempArea);
      setState('copied');
      resetLater();
    } catch (error) {
      throw error;
    }
  };

  const handleClick = async () => {
    const canUseNativeShare = typeof (navigator as Navigator & { share?: unknown }).share === 'function';

    if (canUseNativeShare) {
      try {
        await (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share({
          url: link,
          title: 'Поздравление с днем рождения',
        });
        setState('shared');
        resetLater();
        return;
      } catch (error) {
        // Continue to clipboard fallback
      }
    }

    try {
      await copyLink();
    } catch (error) {
      setState('error');
      resetLater();
    }
  };

  let text = label;
  if (state === 'copied') {
    text = 'Ссылка скопирована!';
  } else if (state === 'shared') {
    text = 'Ссылка отправлена!';
  } else if (state === 'error') {
    text = 'Не удалось поделиться';
  }

  return (
    <button type="button" onClick={handleClick} className={`share-button ${state === 'error' ? 'share-button--error' : ''} ${className ?? ''}`.trim()}>
      {text}
    </button>
  );
};

export default ShareButton;
