import React from 'react'
import styles from './video_item.module.css'

export default function VideoItem({video, onVideoClick}) {

  const handleClick = (e) => {
    e.preventDefault()
    onVideoClick(video.URL);
  }

  return (
    <div className={styles.videoItem}>
        <a href={video.URL} onClick={handleClick} target="_blank" rel="noopener noreferrer">
            <img src={video.thumbnail} alt={video.title} />
        </a>
        <div className={styles.videoTitle}>{video.title}</div>
        <div className={styles.videoDuration}>Duration: {video.duration} minutes</div>
    </div>
  )
}
