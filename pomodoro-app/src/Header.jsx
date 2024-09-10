// Header.js
import React from 'react';
import styles from './Header.module.css'; // Crie esse arquivo CSS para estilizar o header

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Pomodoro Timer </h1>
    </header>
  );
};

export default Header;
