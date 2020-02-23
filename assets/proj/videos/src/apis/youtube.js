import axios from 'axios';

const KEY = 'AIzaSyCeacZoIbVVHz4at-V1OLQnOzEg1AoIucU';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: KEY
  }
});
