import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const newTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark');
      return newTheme;
    });
  };

  return { theme, toggleTheme };
}