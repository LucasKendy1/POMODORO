import React, { useState } from "react";
import styles from "./App.module.css";
import PomodoroTimer from "./PomodoroTimer";
import TodoList from "./TodoList";
import VideoYt from "./VideoYt"; // Importando o novo componente
import Header from "./Header"; // Importando o componente Header
import Footer from "./Footer"; // Importando o componente Footer
import "primeicons/primeicons.css"; // Importando PrimeIcons
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Dialog } from "primereact/dialog";

function App() {
  const [configDialogVisible, setConfigDialogVisible] = useState(false);

  const openConfigDialog = () => {
    setConfigDialogVisible(true);
  };

  return (
    <div className={styles.app}>
      <Header /> {/* Adicionando o Header */}
      <div className={styles.mainContent}>
        {/* <button onClick={openConfigDialog} className={styles.configButton}>
          Configurações 
        </button> */}
        {/* <Dialog
          header="Configurações"
          visible={configDialogVisible}
          style={{ width: "50vw" }}
          onHide={() => setConfigDialogVisible(false)}
        /> */}
        <div className={styles.pomodoro_container}>
          <PomodoroTimer />
        </div>
        <div className={styles.todolist_container}>
          <TodoList />
        </div>
        <div className={styles.video_container}>
          <VideoYt />
        </div>
      </div>
      <Footer /> {/* Adicionando o Footer */}
    </div>
  );
}

export default App;
