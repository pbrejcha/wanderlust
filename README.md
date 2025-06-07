# Vamos - OAuth Authentication Demo

This is a React + TypeScript + Vite application with OAuth authentication supporting both GitHub and Google providers.

## Features

- OAuth authentication with GitHub and Google
- Protected routes requiring authentication
- Persistent login sessions using localStorage
- Clean, responsive UI with dark mode support
- Unauthorized access handling

## Setup

### Prerequisites

- Node.js (version 16 or higher)
- A GitHub OAuth App
- A Google OAuth App

### OAuth Provider Configuration

#### GitHub OAuth App Setup

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: Vamos (or any name you prefer)
   - **Homepage URL**: `http://localhost:5173` (for development)
   - **Authorization callback URL**: `http://localhost:5173/auth/github/callback`
4. Click "Register application"
5. Copy the **Client ID** and **Client Secret**

#### Google OAuth App Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials > Create Credentials > OAuth client ID
5. Configure the OAuth consent screen if prompted
6. Choose "Web application" as the application type
7. Add authorized redirect URIs:
   - `http://localhost:5173/auth/google/callback`
8. Copy the **Client ID** and **Client Secret**

### Environment Variables

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your OAuth credentials:
   ```bash
   # GitHub OAuth App Configuration
   VITE_GITHUB_CLIENT_ID=your_github_client_id_here
   VITE_GITHUB_REDIRECT_URI=http://localhost:5173/auth/github/callback

   # Google OAuth App Configuration  
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/google/callback
   ```

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

### Authentication Flow

1. When you visit the application, you'll be redirected to the login page if not authenticated
2. Choose either GitHub or Google to sign in
3. Complete the OAuth flow with your chosen provider
4. You'll be redirected back to the application and logged in
5. All routes are now accessible while you remain logged in
6. Use the "Sign Out" button in the header to log out

### Protected Routes

All routes in the application require authentication. If you try to access any route while not logged in, you'll be redirected to the unauthorized page with options to sign in.

### Development vs Production

This implementation includes mock token exchange for development purposes. In a production environment, you would need to:

1. Implement proper backend endpoints for OAuth token exchange
2. Store OAuth client secrets securely on the server (never in the frontend)
3. Update the OAuth utility functions to call your backend APIs
4. Implement proper session management and token refresh

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Security Considerations

- OAuth client secrets should never be exposed in the frontend code
- The current implementation uses localStorage for session persistence, which is suitable for development but consider more secure options for production
- Always validate OAuth state parameters to prevent CSRF attacks
- Implement proper token refresh mechanisms for production use

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router DOM
- OAuth 2.0 (GitHub & Google)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure tests pass and code is linted
5. Submit a pull request
