import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component {

  state = { videos: [], selectedVideo: null };

  //this is the default search for the application
  componentDidMount(){
    this.onTermSubmit('buildings');
  }

  //callback method called anytime someone submits the SearchBar form
  //async operation, so we use that syntax
  onTermSubmit = async term => {
    //pre-configured instance of axios
    //this is the entire response object, with lots of info
    // about the request. but we only care about the data prop (items, the array
    // of videos to be shown on the screen)
    // we  take that list and set them as state on our component
    const response = await youtube.get('/search', {
      params: {
        q: term //argument that had been passed into onTermSubmit function
      }
    });

    this.setState({
      videos: response.data.items,
      // updates selected video immediately on search (first video in result set)
      selectedVideo: response.data.items[0]
     });
  };

  //all callback functions defined as arrow functions
  // this video object is the object that we fetch from the youtube API
  onVideoSelect = video => {
    //updates state on the App class
    this.setState({ selectedVideo: video});
  };

  render() {
    //Videolist needs access to that array
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit}/>
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
            <VideoDetail video={this.state.selectedVideo}/>
            </div>
            <div className="five wide column">
            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
            </div>
          </div>
        </div>

      </div>);
  }
}

export default App;
