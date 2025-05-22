# furukawa-rd

This repository now contains a small file browsing web interface implemented with Node.js and Express. It can list local files and folders, open files in the browser and manage folder bookmarks.

## Usage

1. Install dependencies (requires Node.js):
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000` in Chrome.

Right-clicking a folder opens it in Windows Explorer via `explorer.exe`. Bookmarked folders are appended to `c:\work\web_bookmark.txt`.
