import { useState, useEffect } from 'react';
import styles from './ThemeToggler.module.css';

export default function ThemeToggler() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button 
      className={styles.themeToggler} 
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
} 