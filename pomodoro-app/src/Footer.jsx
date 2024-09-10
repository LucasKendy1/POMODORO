// Footer.js
import React from "react";
import styles from "./Footer.module.css"; // Crie esse arquivo CSS para estilizar o footer

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2024 Lucas Kendy.</p>
      <p>
        Visite meu site:{" "}
        <a
          href="https://portfolio-d6kui9kok-lucaskendy1.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          lucaskendy.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
