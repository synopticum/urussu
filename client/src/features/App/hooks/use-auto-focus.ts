import { RefObject, useEffect } from 'react';

export function useAutoFocus(ref: RefObject<HTMLDivElement | HTMLButtonElement>): void {
  useEffect(() => {
    if (ref) {
      ref.current.focus();
    }
  }, [ref.current]);
}
