import React from 'react';
import PlayerSearchBar from './PlayerSearchBar';
import axios from 'axios';
import PlayerList from './PlayerList';
import PlayerDetail from './PlayerDetail';

class Player extends React.Component {
  state = { videos: [], selectedVideo: null };

  componentDidMount() {
    this.onTermSubmit('lati doll');
  }

  onTermSubmit = async (searchTerm) => {
    const KEY = 'AIzaSyDdgBIAngyt0wEGsqcMkTaUyT37CV9OgNo';
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        headers: { Authorization: '' },
        params: {
          q: searchTerm,
          part: 'snippet',
          maxResults: 5,
          key: KEY,
        },
      }
    );

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div className="ui container">
        <PlayerSearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <PlayerDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <PlayerList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
