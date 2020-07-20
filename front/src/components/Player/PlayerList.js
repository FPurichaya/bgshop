import React from 'react';
import PlayerItem from './PlayerItem';

const PlayerList = ({ videos, onVideoSelect }) => {
  const renderedList = videos.map((video) => {
    return (
      <PlayerItem
        key={video.id.videoId}
        onVideoSelect={onVideoSelect}
        video={video}
      />
    );
  });

  return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default PlayerList;
