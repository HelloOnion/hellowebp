import styles from './Header.module.css';
import ThemeToggler from '../ThemeToggler';

export default function Header() {
  return (
    <div className={styles.head}>
      <h1>🖼️ HelloWEBP</h1>
      <ThemeToggler />
    </div>
  );
}
