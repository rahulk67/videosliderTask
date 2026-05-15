const express = require('express');
const cors = require('cors');
const videosRouter = require("./routes/videosRouter")
const likesRouter = require("./routes/likesRouter")
const shareRouter = require("./routes/shareRouter")

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/videos', videosRouter);
app.use('/api/like', likesRouter);
app.use('/api/share', shareRouter);


app.listen(5000, () => console.log('Server running on port 5000'));