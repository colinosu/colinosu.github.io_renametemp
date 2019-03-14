import React from 'react';
import VideoItem from './VideoItem';

// destructured
const VideoList = ({ videos, onVideoSelect }) => {

  const renderedList = videos.map((video) => {

    //video property contains all info about a video that we want to show as a list
    return <VideoItem
    key={video.id.videoId}
    onVideoSelect={onVideoSelect}
    video={video} />;
  });

  return <div className="ui relaxed divided list">{renderedList}</div>
};

export default VideoList;
