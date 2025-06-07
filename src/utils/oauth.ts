// OAuth configuration
export const OAUTH_CONFIG = {
  github: {
    clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || '',
    redirectUri: import.meta.env.VITE_GITHUB_REDIRECT_URI || `${window.location.origin}/auth/github/callback`,
    scope: 'user:email',
  },
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/google/callback`,
    scope: 'profile email',
  },
};

// GitHub OAuth functions
export const initiateGitHubLogin = () => {
  const { clientId, redirectUri, scope } = OAUTH_CONFIG.github;
  
  if (!clientId) {
    console.error('GitHub Client ID not configured');
    return;
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope,
    state: generateRandomState(),
  });

  // Store state in sessionStorage for validation
  sessionStorage.setItem('oauth_state', params.get('state') || '');
  
  window.location.href = `https://github.com/login/oauth/authorize?${params.toString()}`;
};

export const handleGitHubCallback = async (code: string, state: string) => {
  // Validate state
  const storedState = sessionStorage.getItem('oauth_state');
  if (state !== storedState) {
    throw new Error('Invalid state parameter');
  }
  
  sessionStorage.removeItem('oauth_state');

  // Exchange code for access token
  const tokenResponse = await fetch('/api/auth/github/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!tokenResponse.ok) {
    throw new Error('Failed to exchange code for token');
  }

  const { access_token } = await tokenResponse.json();

  // Get user info
  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });

  if (!userResponse.ok) {
    throw new Error('Failed to fetch user info');
  }

  const userInfo = await userResponse.json();

  // Get user email (GitHub may not include email in user info)
  const emailResponse = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });

  let email = userInfo.email;
  if (!email && emailResponse.ok) {
    const emails = await emailResponse.json();
    const primaryEmail = emails.find((e: { primary: boolean; email: string }) => e.primary);
    email = primaryEmail?.email || emails[0]?.email;
  }

  return {
    id: userInfo.id.toString(),
    name: userInfo.name || userInfo.login,
    email: email || '',
    avatar_url: userInfo.avatar_url,
    provider: 'github' as const,
  };
};

// Google OAuth functions
export const initiateGoogleLogin = () => {
  const { clientId, redirectUri, scope } = OAUTH_CONFIG.google;
  
  if (!clientId) {
    console.error('Google Client ID not configured');
    return;
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scope,
    state: generateRandomState(),
  });

  // Store state in sessionStorage for validation
  sessionStorage.setItem('oauth_state', params.get('state') || '');
  
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

export const handleGoogleCallback = async (code: string, state: string) => {
  // Validate state
  const storedState = sessionStorage.getItem('oauth_state');
  if (state !== storedState) {
    throw new Error('Invalid state parameter');
  }
  
  sessionStorage.removeItem('oauth_state');

  // Exchange code for access token
  const tokenResponse = await fetch('/api/auth/google/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!tokenResponse.ok) {
    throw new Error('Failed to exchange code for token');
  }

  const { access_token } = await tokenResponse.json();

  // Get user info
  const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!userResponse.ok) {
    throw new Error('Failed to fetch user info');
  }

  const userInfo = await userResponse.json();

  return {
    id: userInfo.id,
    name: userInfo.name,
    email: userInfo.email,
    avatar_url: userInfo.picture,
    provider: 'google' as const,
  };
};

// Utility functions
const generateRandomState = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Simple mock API for development - in production, these should be real backend endpoints
export const mockTokenExchange = async (provider: 'github' | 'google') => {
  // This is a mock implementation for development
  // In production, you would need a backend service to securely exchange the code for tokens
  
  if (provider === 'github') {
    // Mock GitHub user data
    return {
      access_token: 'mock_github_token',
    };
  } else {
    // Mock Google user data
    return {
      access_token: 'mock_google_token',
    };
  }
};