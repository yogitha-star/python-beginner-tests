# Python Beginner Tests

An interactive Python learning application built with Bun's native dev server and bundler.

## Features

- **Three comprehensive tests** covering Python basics, control flow, and functions/data structures
- **25 questions total** with both multiple-choice and code challenge formats
- **Real-time feedback** with detailed explanations
- **Progress tracking** with visual progress bar and live score
- **Beautiful UI** with gradient backgrounds and glassmorphism effects
- **Console logging to backend** - All frontend `console.log()` calls appear in the terminal!

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

Open http://localhost:8080 in your browser and watch your terminal - frontend console logs will appear there!

## Commands

- `bun run dev` - Start development server with hot reload
- `bun run build` - Production build (minified)
- `bun run start` - Production server
- `bun run deploy` - Deploy to Subscribe.dev

## Architecture

- **Bun 1.3.1** - Native dev server and bundler
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Inline styles** - No CSS files needed

## Project Structure

```
src/
  components/       # React components
  data/            # Question bank
  types/           # TypeScript interfaces
  App.tsx          # Main application
  index.tsx        # Entry point
public/
  index.html       # HTML template
server.ts          # Bun dev server with console: true
build.ts           # Bun bundler
```

## The `console: true` Feature

This project showcases Bun's unique `development: { console: true }` feature. Watch the terminal when:
- Tests are selected
- Questions are rendered
- Answers are submitted
- Scores update

All frontend logs appear in the backend terminal - a feature impossible with Vite/Webpack!

## Tests Included

1. **Python Basics** - Variables, data types, operators
2. **Control Flow** - Conditionals, loops, break/continue
3. **Functions & Data Structures** - Functions, lists, dictionaries

Each test has 8-9 questions worth 10-15 points each.
