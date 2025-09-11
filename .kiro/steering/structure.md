# Project Structure

## Directory Organization

```
├── app/                    # Next.js App Router
│   ├── (site)/            # Route group for main site
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── globals.css        # Global styles and Tailwind imports
│   └── favicon.ico        # Site favicon
├── components/            # Reusable React components
│   ├── section/          # Page section components
│   │   ├── navbar/       # Navigation components
│   │   └── footer/       # Footer components
│   └── ui/               # Generic UI components
├── public/               # Static assets
│   ├── *.svg            # Icon assets
│   └── *.png            # Image assets
└── .kiro/               # Kiro AI assistant configuration
    └── steering/        # AI guidance documents
```

## Naming Conventions

### Files & Directories
- **Components**: PascalCase (e.g., `NavBar.tsx`, `Footer.tsx`)
- **Pages**: lowercase with hyphens for routes
- **Assets**: lowercase with underscores (e.g., `stacks_hero.png`)
- **Directories**: lowercase, descriptive names

### Code Conventions
- **Interfaces**: PascalCase with descriptive names (`ButtonProps`, `NavItemProps`)
- **Components**: Functional components with TypeScript
- **Exports**: Default exports for main components, named exports for utilities

## Component Architecture

### Structure Pattern
```typescript
// File header comment with component name
'use client' // When client-side features needed

import statements
interface definitions
component implementation
export default
```

### Styling Approach
- Tailwind utility classes for all styling
- CSS variables in globals.css for theme values
- Responsive design with Tailwind breakpoints
- Consistent spacing and color schemes

## Asset Management
- Images stored in `/public` directory
- SVG icons preferred for scalability
- Next.js Image component used for optimization
- Descriptive filenames with project prefix (`stacks_*`)