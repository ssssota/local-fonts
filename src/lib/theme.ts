import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';
const createThemeStore = (initial: Theme = 'light') => {
  const { subscribe, update, set } = writable<Theme>(initial);

  const dark = () => set('dark');
  const light = () => set('light');
  const toggle = () => update((t) => (t === 'dark' ? 'light' : 'dark'));

  return {
    subscribe,
    dark,
    light,
    toggle,
  };
};

export const theme = createThemeStore();
