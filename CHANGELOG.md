# Change Log

All notable changes to the "dead-code-hunter" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

# [1.0.5] - 2025-02-25

### Fixed

- Fixed the warning icon color in the tree view panel by updating ThemeColor to "editorWarning.foreground".

# [1.0.4] - 2025-02-25 (Dead Code Hunter v1.0.4 - Webpack Optimization & Fixes)

### Improvements and Fixes

- Bundled the extension with Webpack for better performance and smaller package size.
- Set Webpack to "production" mode to ensure optimized builds.
- Added .vscodeignore file to exclude unnecessary files from the extension package.
- Fixed missing ts-loader issue, ensuring smooth TypeScript compilation.
- Reduced extension package size by removing unnecessary files.

# [1.0.3] - 2025-02-25

### Updated

- Updated the screenshot in README.

# [1.0.2] - 2025-02-25

### Added

- Added CHANGELOG and updated description and instructions in README.

# [1.0.1] - 2025-02-24

### Added

- Added a logo for the extension.

- Added relevant keywords to package.json for better discoverability.

# [1.0.0] - 2025-02-24

### Added

- Initial release of Dead Code Hunter.

- Displays files with errors, warnings, and dead code (unused variables and functions) in a tree view panel.

- Errors and warnings are grouped separately and expanded by default.

- Dead Code Detection: Finds files containing unused variables or functions (greyed-out code).

- Clear List button to reset the list of detected files.

- Clicking an item in the panel opens the corresponding file.

[Unreleased]

### Planned Features

- Improved dead code detection using external linters (e.g., ESLint).

- Customization options for filtering results.

- Additional language support improvements.

