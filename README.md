# Wanderlust - Travel Web Application

A React + TypeScript + Vite web application for travel enthusiasts to explore destinations and plan trips.

## 🚀 Live Demo

The application is deployed on GitHub Pages: **https://pbrejcha.github.io/wanderlust/**

## 🛠️ Development

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
npm install
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment process:

1. **Automatic Deployment**: Every push to the `main` branch triggers the deployment workflow
2. **Manual Deployment**: Can also be triggered manually from the GitHub Actions tab
3. **Build Process**: 
   - Installs dependencies
   - Runs linting checks
   - Builds the application using Vite
   - Deploys to GitHub Pages

### Deployment Configuration

- **Base URL**: `/wanderlust/` (configured in `vite.config.ts`)
- **Homepage**: `https://pbrejcha.github.io/wanderlust/` (configured in `package.json`)
- **Build Output**: `dist/` directory
- **Workflow**: `.github/workflows/deploy.yml`

### Manual Deployment

To deploy manually:

1. Go to the repository's GitHub Actions tab
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow" and select the main branch

## 🏗️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Linaria (CSS-in-JS)
- **Linting**: ESLint with TypeScript support
- **Deployment**: GitHub Pages with GitHub Actions

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
