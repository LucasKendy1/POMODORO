import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import styles from "./pomodorotimer.module.css";

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [pomodoros, setPomodoros] = useState(0);
  const [isBreak, setIsBreak] = useState(false);

  // Crie uma instância de Audio fora do useEffect para evitar criar múltiplas instâncias
  const alarm = new Audio("/time-over.wav");

  useEffect(() => {
    let timer;
    if (isActive && (minutes > 0 || seconds > 0)) {
      timer = setInterval(() => {
        if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else if (isActive && minutes === 0 && seconds === 0) {
      setIsActive(false);
      alarm.play(); // Reproduzir o som quando o timer termina
      if (!isBreak) {
        setPomodoros((prevPomodoros) => prevPomodoros + 1);
        setIsBreak(true);
        setMinutes(pomodoros === 3 ? 15 : 5); // 15 min após 4 pomodoros, 5 min caso contrário
      } else {
        setIsBreak(false);
        setMinutes(25);
      }
    }
    return () => clearInterval(timer);
  }, [isActive, minutes, seconds, pomodoros, isBreak]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
    setPomodoros(0);
  };

  const handleShortBreak = () => {
    setIsActive(false);
    setMinutes(5);
    setSeconds(0);
    setIsBreak(true);
  };

  const handleLongBreak = () => {
    setIsActive(false);
    setMinutes(15);
    setSeconds(0);
    setIsBreak(true);
  };

  const handlePomodoro = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
  };

//   //testar o som
//   const handleSound = () => {
//     alarm.play();
//   }


  return (
    <div className={styles.container}>
        
      <div className={styles.topButtons}>
        <Button
          label="Pomodoro"
          icon="pi pi-clock"
          onClick={handlePomodoro}
          className="p-button p-button-primary"
        />
        <Button
          label="Short Break"
          icon="pi pi-stopwatch"
          onClick={handleShortBreak}
          className="p-button p-button-secondary"
        />
        <Button
          label="Long Break"
          icon="pi pi-calendar"
          onClick={handleLongBreak}
          className="p-button p-button-info"
        />
      </div>

      <div className={styles.timer}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      <div className={styles.controls}>
        <Button
          label="Start"
          icon="pi pi-play"
          onClick={handleStart}
          className="p-button p-button-success"
        />
        <Button
          label="Pause"
          icon="pi pi-pause"
          onClick={handlePause}
          className="p-button p-button-warning"
        />
        <Button
          label="Reset"
          icon="pi pi-refresh"
          onClick={handleReset}
          className="p-button p-button-danger"
        />
      </div>
      <br />
      <p className={styles.pomodoros_count}>Pomodoros #{pomodoros}</p>
    </div>
  );
};

export default PomodoroTimer;
