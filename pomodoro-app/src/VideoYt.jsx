import React, { useState } from 'react';
import styles from './VideoYt.module.css';

const VideoYt = () => {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/jfKfPfyJRdk'); // URL padrão do vídeo lofi

  const handleChange = (event) => {
    setVideoUrl(event.target.value);
  };

  return (
    <div className={styles.videoContainer}>
      <input
        type="text"
        placeholder="Enter YouTube video URL"
        value={videoUrl}
        onChange={handleChange}
        className={styles.input}
      />
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoYt;
