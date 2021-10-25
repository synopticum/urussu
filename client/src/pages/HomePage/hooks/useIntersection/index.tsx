import { RefObject, useEffect } from 'react';
import { globalStore, Screen } from 'src/stores/GlobalStore';

export function useIntersection(ref: RefObject<HTMLDivElement>, screen: Screen): void {
  const observer = new IntersectionObserver(
    entries => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        globalStore.setCurrentScreen(screen);
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.001,
    },
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }

    return (): void => {
      observer.unobserve(ref.current);
    };
  }, [ref.current]);
}
