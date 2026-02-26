# Contributing to TransportVic2

First off, thank you for considering contributing to TransportVic2! It's people like you that make TransportVic2 a great tool for navigating Melbourne and Victoria's public transport network.

## Getting Started

1. **Prerequisites**
   - Node.js (v18 or higher recommended)
   - MongoDB (v4 or higher)
   - Familiarity with JavaScript/Node.js, Express, and Pug templating.

2. **Installation**
   - Clone the repository and install dependencies:
     ```bash
     npm install
     ```
   - Create a `config.json` file in the root directory. Refer to the `README.md` for a complete example.
   - Set up your MongoDB instance and ensure it is running on the port specified in your `config.json`.
   - Download the required spatial data from Spatial Datamart Victoria into `/spatial-datamart` as mentioned in the `README.md`.
   - Run the GTFS import scripts (`update-gtfs.sh` and `load-all.sh`) to populate your local database.

3. **Running Locally**
   - To run the application in development mode with auto-reload:
     ```bash
     npm run dev
     ```
   - The app will be available at the port defined in your `config.json` (usually `8000`).

## Development Workflow

We follow the **GitHub Flow** methodology for all contributions.

1. **Create a Feature Branch**
   Always create a new branch from `main` for your work. Use a descriptive name:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Commit Your Changes**
   Make your changes in your feature branch. Write clear, concise commit messages.

3. **Versioning (EPOCH SemVer)**
   We use a custom versioning scheme called **EPOCH SemVer**. The format is `{EPOCH * 1000 + MAJOR}.MINOR.PATCH`.
   - **EPOCH**: Increment for significant, groundbreaking changes or new eras of the application.
   - **MAJOR**: Increment for minor incompatible API changes or structural shifts.
   - **MINOR**: Increment for adding backwards-compatible functionality.
   - **PATCH**: Increment for backwards-compatible bug fixes.
   
   If your changes warrant a version bump, update the `version` field in `package.json` accordingly before creating your Pull Request.

4. **Testing**
   Ensure all existing tests pass and write new tests for your features if applicable.
   To run the test suite:
   ```bash
   npm run test
   ```

5. **Open a Pull Request**
   Once your feature is complete and tested, push your branch to GitHub and open a Pull Request against the `main` branch. Provide a detailed description of your changes.

## Code Style
- Use descriptive variable and function names.
- Keep functions small and focused on a single task.
- Avoid deep nesting (use guard clauses instead).
- Add comments (JSDoc preferred) to complex logic or public APIs.

Thank you for contributing!
