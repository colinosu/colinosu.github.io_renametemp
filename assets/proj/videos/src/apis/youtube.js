import axios from 'axios';

const KEY = 'AIzaSyBeSDBDOSDcU8IFGwqGv0-ki_826-2yQbE';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet', 
    type: 'video',
    maxResults: 5,
    key: `${KEY}`
}
})