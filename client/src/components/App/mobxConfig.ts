import { configure } from 'mobx';

// mobx auto-batching (experimental)
setTimeout(() => {
  configure({
    // enforceActions: 'never',
    reactionScheduler: (fn): void => {
      setTimeout(fn, 0);
    },
  });
}, 0);
