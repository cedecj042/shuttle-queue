# Shuttle Queue

A badminton session manager: organize a night of play into **sessions**, assign **courts**, run **matches**, and track which **players** are on/off court. Built with Laravel, Inertia.js, and React.

## Why this exists

Running open-play badminton by hand means juggling a whiteboard: who's playing, who's next, which court is free, who's been idle too long. Shuttle Queue models that whiteboard as data so the rotation logic (eventually: auto-queueing idle players, balancing skill levels, tracking scores) can be built on top of a clean schema instead of re-derived from memory every session.

## Tech stack

- **Laravel 12** (PHP 8.2) — backend, routing, persistence
- **Inertia.js + React 18 + TypeScript** — server-driven SPA pages without a separate API layer
- **Tailwind CSS** — styling
- **MySQL** — database (via `DB_CONNECTION` in `.env`)
- **Pest** — testing

## Data model

```
GameSession (a night of play: name, date, status)
 ├─ Court        (numbered courts available for that session)
 ├─ Player       (roster for that session: name, gender, skill, status)
 └─ GameMatch    (a match on a court within the session)
      └─ game_match_players (pivot: which players, which team/slot)
```

Design choices worth calling out:

- **Everything scopes to a `GameSession`.** Courts, players, and matches all belong to a session rather than existing globally. A player list and court count are specific to one night's play, so scoping them avoids leaking state between sessions.
- **Statuses are PHP enums (`app/Enum/*`), backed by DB `enum` columns.** `GameSessionStatus`, `MatchStatus`, and `Gender` give a single source of truth for valid values on both the PHP and schema side, instead of scattering string literals across controllers and migrations.
- **`GameMatch` ↔ `Player` is many-to-many** through `game_match_players`, carrying `team_number` and `player_number` on the pivot. A match needs to know not just *who* played but *which team and slot* — pivot columns let the schema express that without a separate join model.
- **API Resources (`app/Http/Resources/*`) shape every response.** Timestamps are formatted consistently (`Y-m-d H:i:s`), relations are only included via `whenLoaded()`/`whenCounted()` so list views (e.g. the session index, which only needs a player *count*) don't pay for eager-loading data they don't render.
- **Inertia instead of a JSON API + SPA split.** Pages are React components that receive props directly from Laravel controllers (`Inertia::render(...)`), so there's one round trip and one source of truth for auth/session state, with no separate API client or token handling to maintain for what is currently a single-app frontend.

## Prerequisites

- PHP 8.2+, Composer
- Node.js + npm
- MySQL (or adjust `DB_*` in `.env` for another driver)

## Setup

```bash
composer install
npm install

cp .env.example .env
php artisan key:generate
```

Set `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` in `.env` to a MySQL database you've created, then:

```bash
php artisan migrate:fresh --seed
```

The seeder (`GameSessionSeeder`) creates 2 sessions, each with 2 courts, 8 players, and one in-progress match per court — enough to see the UI populated without manually creating data.

## Running it

```bash
composer dev
```

This runs the PHP dev server, queue listener, log viewer (Pail), and Vite dev server together (via `concurrently`). Visit `http://localhost:8000`.

To run pieces individually instead:

```bash
php artisan serve       # backend
npm run dev             # Vite/React with HMR
```


## Current state

Session CRUD (list, create, edit, delete) is wired up end-to-end on `GameSessions/Index`. The session detail page (`GameSessions/Show`) receives full session data — matches (with court), players, and courts — but court/match/player management UI is still to be built on top of it and its just read only as of now.
