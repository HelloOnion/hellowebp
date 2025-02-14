import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Created by: </p>
      <a
        href="https://codykung.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Cody Kung
      </a>
    </footer>
  );
}
