# Video Editor 🎬

A small Node.js app for uploading videos, resizing them into different dimensions, extracting audio, and generally messing around with video files through a simple web UI.

Built on top of [cpeak](https://www.npmjs.com/package/cpeak) (a lightweight HTTP framework), with a flat-file JSON "database" and a worker cluster for handling video resize jobs without blocking the main server.

## What it can do

- Log in / log out with a simple cookie-based session
- Upload videos
- List uploaded videos
- Extract audio from a video
- Resize a video into different dimensions (queued and processed by background workers)
- Download resized videos

## Getting it running

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server

Regular single-process mode:

```bash
npm start
```

Or, if you want the resize jobs to run across multiple CPU cores (worker cluster), run:

```bash
npm run cluster
```

Either way, the server comes up on **http://localhost:8060**.

### 3. Log in

There's no sign-up flow — you log in with one of the seed users in `data/users`. For example:

```
username: liam23
password: string
```

(Check `data/users` for the other available accounts.)

## Project structure (quick tour)

- `src/index.js` — main server entry point, sets up middleware and routes
- `src/cluster.js` — spins up a cluster of workers (for the `npm run cluster` mode)
- `src/router.js` — all the API routes
- `src/controllers/` — the actual logic behind each route (user + video)
- `src/middleware/` — auth check + serving `index.html` for frontend routes
- `src/DB.js` — tiny JSON-file-backed "database"
- `public/` — frontend (HTML/CSS/JS)
- `data/` — the JSON files acting as our database (users, sessions, videos)
- `storage/` — where uploaded/processed video files actually live
