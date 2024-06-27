import React from 'react'
import styles from './video_list.module.css'
import VideoItem from '../VideoItem/video_item'

export default function VideoList({videos, onVideoClick}) {
  return (
    <div className={styles.container}>
        <div className={styles.subContainer}>
            {videos.map(video => {
                return (<VideoItem className={styles.videoItem} video={video} onVideoClick={onVideoClick}/>)
            })}    
        </div>
    </div>
  )
}
