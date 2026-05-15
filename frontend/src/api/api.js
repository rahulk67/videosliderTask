import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchVideos = (page = 1, limit = 30) =>
  api.get(`/videos?page=${page}&limit=${limit}`).then(r => r.data);

export const likeVideo = (videoId) =>
  api.post('/like', { videoId }).then(r => r.data);

export const shareVideo = (videoId, platform) =>
  api.post('/share', { videoId, platform }).then(r => r.data);