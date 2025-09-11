# Contributing to StacksLab

Thank you for your interest in contributing to StacksLab! We're excited to have you as part of our community.

## 🚀 Getting Started

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/stackslab.git
cd stackslab
```

3. Install dependencies:
```bash
npm install
```

4. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

5. Start the development server:
```bash
npm run dev
```

## 📋 Development Guidelines

### Code Style

- We use **TypeScript** for type safety
- Follow **ESLint** rules (run `npm run lint`)
- Use **Tailwind CSS** for styling
- Write **meaningful commit messages**

### Component Structure

- Use functional components with TypeScript
- Follow the established folder structure in `/components`
- Add proper TypeScript interfaces for props
- Include JSDoc comments for complex functions

### Naming Conventions

- **Components**: PascalCase (e.g., `NavBar.tsx`)
- **Files**: PascalCase for components, lowercase for utilities
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE

## 🐛 Reporting Issues

Before creating an issue, please:

1. Check if the issue already exists
2. Use our issue templates
3. Provide clear reproduction steps
4. Include relevant system information

## 🔄 Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**: `npm run test`
4. **Follow commit message format**:
   ```
   type(scope): description
   
   Examples:
   feat(ui): add new button component
   fix(api): resolve authentication issue
   docs(readme): update installation guide
   ```

5. **Request review** from maintainers

## 🎯 Areas for Contribution

### High Priority
- Smart contract IDE features
- Testing framework integration
- UI/UX improvements
- Documentation

### Medium Priority
- Performance optimizations
- Accessibility improvements
- Mobile responsiveness
- Error handling

### Future Features
- Deployment automation
- Team collaboration tools
- Analytics dashboard
- Plugin system

## 🏗️ Project Architecture

### Frontend Structure
```
components/
├── section/     # Page sections (Hero, Features, etc.)
├── ui/          # Reusable UI components
└── layout/      # Layout components

app/
├── (site)/      # Main site pages
└── globals.css  # Global styles
```

### Key Technologies
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)

## 📞 Getting Help

- **Discord**: Join our [community server](https://discord.gg/stackslab)
- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and request features

## 🎉 Recognition

Contributors will be:
- Listed in our README
- Mentioned in release notes
- Invited to our contributor Discord channel
- Eligible for special contributor badges

---

**Ready to contribute?** Check out our [good first issues](https://github.com/stackslab/stackslab/labels/good%20first%20issue) to get started!

Thank you for helping make StacksLab better! 🚀