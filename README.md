# CloudTask — Task Manager

CloudTask is a web app for keeping tasks in one place: add a task with a
title, description, deadline and priority, search for it later, and mark
it done in one tap. Tasks update live on the board, with no refresh
needed.

## What it does

- Add a task with title, description, deadline and priority
  (low, medium or high)
- Priority tags on every card: green for low, amber for medium,
  red for high
- Search tasks by title or description
- Mark a task complete, or back to todo, in one tap; delete it
  from the card
- Tasks update live on the board as they change (Firestore
  real-time listener)
- Each user only sees their own tasks
- Sign in with email and password, Google or GitHub
- Landing page, auth page and a dashboard with a sidebar

## How it works

- React 19 + Vite on the front, with Framer Motion animations
  and lucide-react icons
- Firebase Auth for sign-in, Firestore for tasks
- `useTasks` (`src/hooks/useTasks.js`) keeps a live Firestore
  listener: tasks for the signed-in user, newest first. New tasks
  start with status `todo` and a server timestamp.
- `TaskBoard` (`src/components/TaskBoard.jsx`) renders the board,
  the search box and loading shimmer cards
- `TaskCard` (`src/components/TaskCard.jsx`) shows the priority
  tag, deadline and complete/delete actions
- `TaskModal` (`src/components/TaskModal.jsx`) is the add-task
  form: title, description, deadline, priority
- Routes: `/` landing, `/auth` sign-in, `/dashboard/*` guarded
  dashboard

## Run it locally

```bash
npm install
npm run dev
```

Build with `npm run build`. The Firebase project is configured in
`src/firebase/config.js`.

## Deploy

Configured for Vercel (`vercel.json` rewrites all routes to
`index.html` for the single-page app).

## Known limits

- The Filters button on the board does nothing yet
- Dashboard sub-pages (My Tasks, Completed, Profile, Settings,
  Notifications) are placeholders
- No drag-and-drop or team sharing, despite the landing page copy
