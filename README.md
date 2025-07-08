# Oompa Loompa Crew Demo App

## Features

- Browse Oompa Loompa workers with infinite scroll
- Search for a worker by name or profession
- View detailed information for each worker
- Data is cached in Redux and only refetched if older than 1 day
- Fully responsive design
- Unit tests for main pages

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Run the app in development mode

```sh
npm run dev
```

IMPORTANT: Vite needs Node.js 20 or higher to run.

### 3. Run tests

```sh
npm test
```

This uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## Project Structure

- `src/pages/` — Main pages (Homepage, DetailView)
- `src/components/` — Reusable UI components
- `src/slices/` — Redux slices
- `src/api/` — API functions
- `src/tests/` — Unit tests
