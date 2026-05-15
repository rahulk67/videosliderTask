const express = require('express');
const router = express.Router();
const { store } = require("./videosRouter")


router.post('/', (req, res) => {
  const { videoId } = req.body;
  const ip = req.ip;

  if (!videoId) return res.status(400).json({ error: 'videoId required' });

  // Deduplicate by ip and videoId
  const key = `${ip}_${videoId}`;
  if (!store._likedBy) store._likedBy = new Set();
  if (store._likedBy.has(key)) {
    return res.json({ success: false, message: 'Already liked' });
  }

  store._likedBy.add(key);
  store.likes[videoId] = (store.likes[videoId] || 0) + 1;

  res.json({ success: true, likes: store.likes[videoId] });
});

module.exports = router;