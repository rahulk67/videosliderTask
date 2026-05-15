const express = require('express');
const router = express.Router();
const { store } = require("./videosRouter");


router.post('/', (req, res) => {
  const { videoId, platform } = req.body;
  console.log(req.body);
  if (!videoId) return res.status(400).json({ error: 'videoId required' });

  store.shares[videoId] = (store.shares[videoId] || 0) + 1;
  console.log(`Video ${videoId} shared on ${platform || 'unknown'}`);
  console.log(store.shares,"check share");

  res.json({ success: true, shares: store.shares[videoId] });
});

module.exports = router;