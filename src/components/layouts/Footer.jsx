import styles from "./Footer.module.css";

const year = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className={`bg-dark ${styles.footer}`}>
      <p>copyrights &copy; {year}</p>
    </footer>
  );
};

export default Footer;
