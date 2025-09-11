# Soccer Nerds App Knowledge

## Project Overview
Soccer Nerds is a React-based mobile-first web app for football/soccer fans to track matches, get live scores, and manage their favorite teams.

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS (CDN)
- **Build Tool**: Vite
- **Icons**: Material Icons and emojis
- **Fonts**: Inter font family

## App Flow & Navigation

### App States
1. **Loading Page**: Animated splash screen with Soccer Nerds branding
2. **Onboarding Flow**: First-time user setup (4 steps)
3. **Main App**: Core functionality with home/profile views

### Onboarding Flow Steps
1. **Welcome & Name**: User enters their name
2. **Team Selection**: Choose up to 6 favorite clubs from popular teams
3. **Discovery Source**: How they heard about the app (analytics)
4. **Final Setup**: Review preferences and notification settings

### Data Persistence
- User onboarding data stored in `localStorage` as `soccerNerdsUserData`
- App checks for existing data on load to skip onboarding

## Component Architecture

### New Components
- `LoadingPage.tsx`: Animated loading screen with progress bar
- `OnboardingFlow.tsx`: Multi-step user setup with smooth transitions
- Updated `ProfilePage.tsx`: Now uses onboarding data dynamically
- Updated `App.tsx`: Manages app state flow between loading/onboarding/main

### Styling Patterns
- Use Tailwind utility classes extensively
- Gradient backgrounds for visual appeal
- Smooth transitions and animations (duration-200, duration-300)
- Material Icons for consistent iconography
- Hover states and interactive feedback

## Animation & UX Guidelines
- Loading animations use `animate-bounce`, `animate-pulse`, `animate-spin`
- Progress bars show completion percentage
- Smooth state transitions with opacity and transform
- Interactive elements have hover and active states
- Form validation provides immediate feedback

## Design System
- **Primary Color**: Amber (amber-500, amber-400)
- **Secondary Colors**: Orange, Red gradients for energy
- **Typography**: Inter font, various weights (400-800)
- **Spacing**: Consistent padding (p-4, p-6) and margins
- **Shadows**: Subtle shadows for depth (shadow-sm, shadow-lg)

## Data Flow
1. App starts with loading state
2. Checks localStorage for user data
3. Shows onboarding if new user, otherwise goes to main app
4. Onboarding data passed to ProfilePage for personalization
5. Main app functions with saved user preferences