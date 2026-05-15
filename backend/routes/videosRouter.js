const express = require('express');
const router = express.Router();
const videos = require('../dummyVideos/videos.json');

// in memory store for likes/shares
const store = { likes: {}, shares: {} };

router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const start = (page - 1) * limit;

  const paginated = videos.slice(start, start + limit).map(v => ({
    ...v,
    oldLikes:v.likes,
    oldShares:v.shares,
    likes: v.likes + (store.likes[v.id] || 0),
    shares: v.shares + (store.shares[v.id] || 0),
  }));

  res.json({ videos: paginated, total: videos.length, page, limit });
});

module.exports = router;
module.exports.store = store;