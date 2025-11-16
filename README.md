# Would You Rather? - Enhanced UX Version

A modern, production-ready "Would You Rather" polling application built with React 18, TypeScript, and best-in-class UX patterns.

## 🎯 Product Overview

**Problem**: Users want an engaging way to participate in "Would You Rather" polls and see how their choices compare to others.

**Target User**: Anyone interested in decision-making games, polls, and social engagement.

**Core Value**: Fun, quick poll experience with instant visual feedback and community engagement.

## ✨ Features

- 🔐 **User Authentication** - Simple user selection for demo purposes
- 📊 **Dashboard** - Browse answered and unanswered questions with tabs
- 🗳️ **Voting** - Interactive poll interface with real-time results
- 📈 **Results Visualization** - Beautiful progress bars showing vote percentages
- ➕ **Create Questions** - Form validation with React Hook Form + Zod
- 🏆 **Leaderboard** - See top contributors with gamification
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Loading States** - Skeleton screens and spinners for better UX
- ❌ **Error Handling** - Graceful error states with retry options
- 📭 **Empty States** - Helpful messages and CTAs

## 🏗️ Architecture

This application follows **UX Architect** principles with a modern, scalable architecture:

### Tech Stack

- **React 18** - Latest React with hooks and concurrent features
- **TypeScript** - Full type safety throughout the application
- **Vite** - Lightning-fast build tool and dev server
- **TanStack Query (React Query)** - Server state management and caching
- **React Router v6** - Modern client-side routing
- **React Hook Form + Zod** - Type-safe form validation
- **Tailwind CSS** - Utility-first styling with custom design system

### Folder Structure (Feature-Based)

```
src/
├── features/
│   ├── auth/                    # Authentication feature
│   │   ├── context/             # Auth context provider
│   │   ├── components/          # Protected route
│   │   ├── hooks/               # useUsers hook
│   │   └── screens/             # Login screen
│   ├── questions/               # Questions feature
│   │   ├── components/          # QuestionCard
│   │   ├── hooks/               # useQuestions, useCreateQuestion
│   │   └── screens/             # Dashboard, NewQuestion
│   ├── poll/                    # Voting feature
│   │   ├── hooks/               # useSaveAnswer
│   │   └── screens/             # Poll, PollResults
│   └── leaderboard/             # Leaderboard feature
│       └── screens/             # Leaderboard
├── shared/
│   ├── components/              # Reusable UI components
│   └── theme/                   # Design system
├── lib/
│   ├── api.ts                   # API client
│   ├── types.ts                 # TypeScript types
│   └── utils.ts                 # Helper functions
├── App.tsx                      # App root with routing
└── main.tsx                     # Entry point
```

### Design System

The app uses a comprehensive design system with:

- **Color Palette**: Primary, secondary, success, warning, danger, and gray scales
- **Typography Scale**: Heading XL/L/M/S, body, caption
- **Spacing System**: xs (4px) to xxxl (48px)
- **Border Radius**: sm (4px) to pill (9999px)
- **Components**: Fully reusable, typed, accessible

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kumarsparkz/would_you_rather.git
cd would_you_rather
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run preview` - Preview production build locally
- `npm run type-check` - Check TypeScript types without building

## 📖 User Flows

### Primary User Flows

1. **Login Flow**
   - User visits app → Sees login screen → Selects a user → Dashboard loads

2. **Voting Flow**
   - User sees unanswered questions → Clicks "Vote Now" → Selects an option → Submits → Views results

3. **Create Question Flow**
   - User clicks "Create New Question" → Fills in two options → Submits → Returns to dashboard with new question

4. **View Results Flow**
   - User clicks "View Results" on answered question → Sees percentage breakdown → Returns to dashboard

5. **Leaderboard Flow**
   - User clicks "Leaderboard" → Sees ranked users with stats → Returns to dashboard

## 🎨 UX Patterns Implemented

### Three Critical States (per UX Architect guidelines)

1. **Loading State** - Skeleton screens and spinners with helpful messages
2. **Empty State** - Encouraging messages with clear CTAs
3. **Error State** - Friendly error messages with retry options

### Navigation

- **Navbar**: Persistent navigation with user info and logout
- **Tabs**: Dashboard tabs for answered/unanswered questions
- **Breadcrumbs**: Back buttons on detail screens
- **Active States**: Clear visual feedback for current location

### Visual Hierarchy

- **Primary Actions**: One prominent CTA per screen
- **Typography**: Proper heading levels (h1-h3)
- **Color Coding**: Success (green) for user's choice, primary (blue) for other results
- **Spacing**: Consistent padding using design tokens

## 🔧 API & Data Layer

The app uses a mock API layer (`src/lib/api.ts`) that simulates network delays:

- `getUsers()` - Fetch all users (800ms delay)
- `getQuestions()` - Fetch all questions (800ms delay)
- `saveQuestion()` - Create new question (1000ms delay)
- `saveQuestionAnswer()` - Save user's answer (500ms delay)

**TanStack Query** handles:
- Automatic caching (5min for users, 2min for questions)
- Background refetching
- Optimistic updates
- Error handling and retries

## 📊 Data Model

```typescript
interface User {
  id: string;
  name: string;
  avatarURL: string;
  answers: Record<string, 'optionOne' | 'optionTwo'>;
  questions: string[];
}

interface Question {
  id: string;
  author: string;
  timestamp: number;
  optionOne: { votes: string[]; text: string };
  optionTwo: { votes: string[]; text: string };
}
```

## 🎯 Future Enhancements

**Non-Goals for v1** (potential v2 features):
- Comments on questions
- Real-time updates with WebSockets
- Social media sharing
- User profiles with bio
- Question categories/tags
- Search and filtering

## 🏆 Credits

Originally built for Udacity React Nanodegree program.
Enhanced with modern UX architecture by [@kumarsparkz](https://github.com/kumarsparkz).

## 📝 License

This project is open source and available for educational purposes.

---

**Built with ❤️ using the UX Architect skill**
