# Contributing to KisanQueue

Thank you for your interest in contributing to KisanQueue! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/yes.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Start development server: `npm run dev`

## Development Workflow

### Making Changes

1. Make your changes in the feature branch
2. Test thoroughly in the dev server
3. Commit with clear messages: `git commit -m "feat: description of change"`

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests

### Building for Production

```bash
npm run build
npm run preview
```

## Pull Request Process

1. Update the README.md with any new features
2. Ensure the build passes: `npm run build`
3. Create a clear PR description
4. Link any related issues
5. Request review from maintainers

## Code Style

- Use ES6+ features
- Follow the existing code patterns
- Keep components focused and reusable
- Write meaningful variable/function names
- Add comments for complex logic

## Reporting Bugs

Create an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

## Feature Requests

Open an issue describing:
- The feature and its use case
- Proposed implementation approach
- Any mockups or examples

## Questions?

Feel free to open a discussion or issue if you have questions!
