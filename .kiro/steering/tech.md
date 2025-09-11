# Technology Stack

## Framework & Runtime
- **Next.js 15.5.3** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Node.js** - Runtime environment

## Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library for UI components
- **React Icons** - Additional icon sets
- **Geist Font** - Primary typography (Sans & Mono variants)

## Development Tools
- **ESLint 9** - Code linting with Next.js config
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## Common Commands

### Development
```bash
npm run dev          # Start development server on localhost:3000
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Key Configuration
- **Path Aliases**: `@/*` maps to project root
- **Target**: ES2017 with modern browser support
- **Strict Mode**: Enabled for TypeScript
- **CSS**: Tailwind with custom CSS variables for theming

## Architecture Patterns
- App Router structure with route groups `(site)`
- Component-based architecture with TypeScript interfaces
- CSS-in-JS avoided in favor of Tailwind utility classes
- Custom CSS variables for theme consistency