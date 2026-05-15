import { useEffect, useState } from 'react';
import { fetchVideos } from './api/api';
import OuterCarousel from './components/OuterCarousel';
import './styles.css';

export default function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos(1, 30).then(data => {
      console.log("data from api",data);
      setVideos(data.videos);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="app-loading">Loading...</div>;

  return (
    <main>
      <OuterCarousel videos={videos} loading={loading} />
    </main>
  );
}