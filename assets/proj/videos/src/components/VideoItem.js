import React from 'react';
import './VideoItem.css';

const VideoItem = ({video, onVideoSelect}) => {
  return (
    // event handler. calls onVideoSelect with video property onclick.
    // we use an arrow function bc we want to call it with some argument
    // otherwise the function will be called, but not with the video.
    <div onClick={() => onVideoSelect(video)} className="video-item item">
      <img alt={video.snippet.title} className="ui image" src={video.snippet.thumbnails.medium.url} />
      <div className="content">
      <div className="header">{video.snippet.title}</div>
      </div>
    </div>
  );
}

export default VideoItem;
