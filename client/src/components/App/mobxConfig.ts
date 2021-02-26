import { configure } from 'mobx';

// mobx auto-batching (experimental)
setTimeout(() => {
  configure({
    reactionScheduler: (fn): void => {
      setTimeout(fn, 0);
    },
  });
}, 0);
