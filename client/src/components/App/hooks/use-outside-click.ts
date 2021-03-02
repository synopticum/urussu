import { RefObject, useEffect } from 'react';

export function useClickOutside(
  ref: RefObject<HTMLDivElement | HTMLButtonElement>,
  action: () => void,
  hasInitialAction = false,
): void {
  const handleClickOutside = (event: MouseEvent): void => {
    if (!ref.current) {
      action();
    }

    let targetElement = event.target;
    do {
      if (targetElement === ref.current) {
        return;
      }
      targetElement = (targetElement as Element)?.parentNode;
    } while (targetElement);

    action();
  };

  useEffect(() => {
    if (hasInitialAction) {
      action();
    }
    document.addEventListener('click', handleClickOutside);
    return (): void => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
}
