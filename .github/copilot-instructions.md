# Phenomenality - Copilot Instructions

## Project Overview

**Phenomenality** is a web application designed to help gender minorities mitigate imposter phenomenon (IP) in the workplace. Users can:
- Record daily professional accomplishments in a journal-like manner
- Tag accomplishments with industry-related terms for easy filtering
- Take a quiz to identify their imposter phenomenon archetype (Perfectionist, Soloist, Superhuman, Expert, Genius)
- Access personalized IP mitigation strategies based on their archetype

## Tech Stack

- **Framework**: Next.js with App Router
- **React**: 19
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4 utilities; design tokens in `globals.css` (`@theme`)
- **Backend**: Firebase (Authentication, Realtime Database, Hosting)
- **Motion**: React `<ViewTransition>` for route transitions, `motion` for in-page animation
- **Charts**: CanvasJS React Charts
- **Surveys**: SurveyJS for the quiz functionality
- **State Management**: React hooks (`useState`, `useEffect`) and Firebase hooks (`react-firebase-hooks`)
- **Build**: Static export (`output: 'export'`) for Firebase Hosting

## Project Structure

```
src/
├── config.ts                     # Firebase configuration and initialization
├── app/
│   ├── layout.tsx                # Root layout with fonts, navigation, MotionProvider
│   ├── template.tsx              # Wraps every page in PageTransition
│   ├── globals.css               # Tailwind setup, tokens, base styles, view-transition CSS
│   ├── _assets/                  # Shared assets (icons, images)
│   ├── _components/              # Shared components (Navigation, LinkButton, StepPanel)
│   ├── _lib/                     # Shared hooks and motion presets
│   ├── (root)/                   # Landing page route group
│   ├── (types)/                  # IP type pages route group (type-1 through type-5)
│   ├── accomplishments/          # Add accomplishment page
│   ├── accomplishments-complete/ # Success confirmation page
│   ├── authentication/           # Login/register page
│   ├── bank/                     # View all accomplishments page
│   ├── more-info/                # Additional information page
│   └── quiz/                     # IP quiz page
```

## Code Conventions

### File Naming
- **Pages**: `page.tsx` (Next.js App Router convention)
- **Components**: PascalCase (e.g., `Navigation.tsx`, `TagButton.tsx`)
- **Styles**: Tailwind classes inline; a `[name].module.css` only when utilities can't express it
- **Assets**: Store in `_assets/` folders within the relevant route directory
- **Private folders**: Prefix with underscore (`_components/`, `_lib/`, `_assets/`)

### Component Patterns
- Use functional components with hooks
- Mark client components with `'use client'` directive when using:
  - React hooks (`useState`, `useEffect`)
  - Browser APIs
  - Firebase auth/database listeners
  - Third-party libraries requiring client-side rendering (CanvasJS, SurveyJS)
- Server components are the default - use them when possible
- Use `clsx` for conditional className composition

### Styling Guidelines
- Use Tailwind utility classes; compose conditionals with `clsx`
- Use theme tokens (`bg-brand`, `bg-cream`, `rounded-panel`, `shadow-popup`, …) rather than raw values; add new tokens to `@theme` in `globals.css`
- Primary brand color: `#437557` (`brand`)
- Secondary color: `#FDEDDE` (`cream`)
- Font families: 
  - Headings: `Playfair Display`
  - Body: `Source Sans 3`

### Import Organization
Follow the eslint import/order rule:
1. React imports first
2. External dependencies (alphabetized)
3. Internal modules
4. Parent/sibling imports
5. Type imports last

Example:
```tsx
import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';

import app from '../../config';

import styles from './Navigation.module.css';

import type { User } from 'firebase/auth';
```

### TypeScript
- Strict mode enabled
- Use path alias `@/*` for imports from `src/`
- Define prop types inline or with interfaces
- Avoid `any`; `npm run typecheck` must pass

### Firebase Patterns
- Initialize Firebase in `src/config.ts`
- Use `react-firebase-hooks` for auth state: `useAuthState(auth)`; its `loading` flag is the auth-ready signal
- Subscribe to user lists with `useUserCollection(user, path)` (`_lib/useUserCollection.ts`), which unsubscribes on cleanup
- Database paths follow pattern: `users/{uid}/data` for accomplishments
- Always check for client-side rendering before using Firebase Analytics

### Dynamic Imports
Use `next/dynamic` for client-only libraries to avoid SSR issues:
```tsx
const CanvasJSChart = dynamic(
  () => import('@canvasjs/react-charts').then((mod) => mod.default.CanvasJSChart),
  { ssr: false }
);
```

### Motion
- Route transitions: `template.tsx` wraps each page in `PageTransition`. Untyped navigations crossfade; pass `transitionTypes={['nav-forward']}` or `['nav-back']` on `<Link>` for directional slides. CSS lives in `globals.css`.
- Multi-step flows: render `<StepPanel key=…>` inside `<AnimatePresence mode="wait">`
- Interactive `motion` controls: spread `{...pressable}` from `_lib/motion.ts`
- `MotionProvider` (root layout) applies the shared timing and honours `prefers-reduced-motion`

## Development Commands

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build static export to /build directory
npm run start        # Start production server
npm run typecheck    # Type-check with tsc
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format code (runs lint:fix)
```

## Route Groups

- `(root)` - Landing page at `/`
- `(types)` - IP type information pages (`/type-1` through `/type-5`)

## Key Features to Understand

### Authentication Flow
- Users register/login via Firebase Auth (email/password)
- First-time users complete a profile setup
- Auth state managed via `onAuthStateChanged` listener

### Accomplishment System
- Accomplishments have: title, description, tags, date, id
- Tags are predefined: Technical, Soft Skills, Kudos, Award, Training, Special Projects, Volunteer, Promotion, Idea, Innovation, Other
- Data stored in Firebase Realtime Database under user's UID

### Quiz System
- Uses SurveyJS library for quiz rendering
- Results calculated by tallying scores for each IP type
- Results visualized with CanvasJS charts
- Directs users to their primary IP type page for tips

## Notes for AI Assistance

1. **Prefer Server Components** - Only add `'use client'` when necessary
2. **Static Export** - The app uses `output: 'export'`, so avoid server-side features like API routes or middleware
3. **Tailwind first** - Prefer utilities and theme tokens over new CSS
4. **Absolute hrefs** - Use `/route` in links; relative hrefs break from nested routes like `/bank/view`
5. **Image Handling** - Images are unoptimized due to static export; use `next/image` with `unoptimized: true`
6. **Code Quality** - ESLint and Prettier are configured; run `npm run format` before committing
