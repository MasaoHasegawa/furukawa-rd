const express = require('express');
const path = require('path');
const fs = require('fs');
const {spawn} = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// List files and folders for a given path
app.get('/api/list', (req, res) => {
  const dirPath = req.query.path || process.cwd();
  fs.readdir(dirPath, {withFileTypes: true}, (err, entries) => {
    if (err) {
      res.status(500).json({error: err.toString()});
      return;
    }
    const list = entries.map(e => ({
      name: e.name,
      isDirectory: e.isDirectory()
    }));
    res.json({path: dirPath, entries: list});
  });
});

// Add bookmark
app.post('/api/bookmark', (req, res) => {
  const dir = req.body.path;
  if (!dir) {
    res.status(400).json({error: 'path required'});
    return;
  }
  const file = 'c:/work/web_bookmark.txt';
  fs.appendFile(file, dir + '\n', err => {
    if (err) {
      res.status(500).json({error: err.toString()});
      return;
    }
    res.json({ok: true});
  });
});

// open in explorer
app.post('/api/open', (req, res) => {
  const dir = req.body.path;
  if (!dir) {
    res.status(400).json({error: 'path required'});
    return;
  }
  const child = spawn('explorer.exe', [dir], {shell: true, detached: true});
  child.on('error', err => {
    console.error('spawn error', err);
  });
  res.json({ok: true});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
