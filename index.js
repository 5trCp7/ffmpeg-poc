const express = require('express');
const multer = require('multer');
const ffmpeg = require('ffmpeg')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
      cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })
const server = app.listen(3000, () => console.log(`Listening on port 3000`));

process.on('unhandledRejection', err => {
  console.log(`Unhandled Error: ${err}`);
  process.exit(1);
});

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
});

app.post('/upload', upload.single('filename'), (req, res) => {
  try {
    const filepath = req.file.destination+req.file.filename;
    var process = new ffmpeg(filepath);
    process.then(video => {
      video.fnExtractSoundToMP3("uploads/file.mp3").then(music => {
        res.sendFile("uploads/file.mp3", { root: __dirname })
      })
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

server.stop = () => {
  server.close();
}

module.exports = server;
