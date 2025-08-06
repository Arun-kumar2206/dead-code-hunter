# Contributing to Dead Code Hunter

Thanks for your interest in contributing to Dead Code Hunter! This extension helps developers identify dead code, errors, and warnings in their VS Code projects, and we're excited to have you help make it even better.

## Getting Started

### Setting up the development environment

1. Fork the repository and clone your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/dead-code-hunter.git
   cd dead-code-hunter
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the extension:

   ```bash
   npm run compile
   ```

4. Open the project in VS Code and press `F5` to launch a new Extension Development Host window where you can test your changes.

### Project structure

- `src/extension.ts` - Main extension entry point
- `src/test/` - Test files
- `package.json` - Extension manifest and dependencies
- `webpack.config.js` - Build configuration
- `images/` - Extension assets and screenshots

## How to contribute

### Reporting bugs

Before creating a new issue, please search existing issues to avoid duplicates. When reporting a bug, include:

- VS Code version you're using
- Extension version
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if helpful
- Error messages from the Developer Console (Help > Toggle Developer Tools)

### Suggesting features

We welcome feature suggestions! Please:

- Check if the feature has already been requested
- Explain the use case and why it would be valuable
- Consider how it fits with the extension's core purpose
- Be specific about the expected behavior

### Code contributions

#### Before you start coding

- Check existing issues and pull requests to avoid duplicate work
- For larger changes, consider opening an issue first to discuss the approach
- Make sure you understand the extension's architecture by reviewing the existing code

#### Code style and standards

- We use TypeScript with strict mode enabled
- Follow the existing code formatting patterns
- Use ESLint for code quality - run `npm run lint` before submitting
- Write meaningful commit messages that explain what and why, not just what changed
- Keep functions focused and reasonably sized
- Add comments for complex logic, but prefer self-documenting code

#### Pull request process

1. Create a new branch from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test thoroughly:

   - Test in multiple VS Code workspaces
   - Verify the extension loads correctly
   - Check that existing functionality still works

3. Update the CHANGELOG.md if your changes are user-facing

4. Run the linter and fix any issues:

   ```bash
   npm run lint
   ```

5. Commit your changes with a clear message:

   ```bash
   git commit -m "Add support for detecting unused imports in TypeScript files"
   ```

6. Push to your fork and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

#### Pull request guidelines

- Provide a clear description of what your pull request does and why
- Reference any related issues using "Fixes #123" or "Closes #123"
- Include screenshots for UI changes
- Make sure all checks pass
- Be responsive to feedback and willing to make changes
- Keep pull requests focused - one feature or fix per pull request when possible

### Testing

- Test your changes manually in the Extension Development Host
- Add unit tests for new functionality where appropriate
- Run existing tests with `npm run test`
- Test with different project types and configurations

### Documentation updates

If your changes affect how users interact with the extension:

- Update the README.md if needed
- Add or update relevant screenshots
- Consider if the change should be mentioned in the next release notes

## Development tips

### Debugging

- Use `console.log()` statements and check the Developer Console
- Set breakpoints in VS Code's debugger when running the Extension Development Host
- The Output panel may show useful error messages

### VS Code extension APIs

- Familiarize yourself with the [VS Code Extension API documentation](https://code.visualstudio.com/api)
- The extension primarily uses the Diagnostics API and TreeView API
- Check existing VS Code extensions for inspiration and patterns

### Performance considerations

- The extension should not slow down VS Code's startup
- Avoid blocking operations on the main thread
- Consider debouncing frequent operations like file watching

## Release process

Maintainers handle releases, but contributors should:

- Update version numbers in package.json only if specifically requested
- Add entries to CHANGELOG.md for user-facing changes
- Ensure all changes are properly tested before marking as ready for review

## Questions?

If you have questions about contributing:

- Check existing issues and discussions
- Open a new issue with the "question" label
- Look at recent pull requests to see how others have implemented similar changes

We appreciate all contributions, whether they're bug reports, feature suggestions, documentation improvements, or code changes. Every bit helps make Dead Code Hunter better for the entire VS Code community!
