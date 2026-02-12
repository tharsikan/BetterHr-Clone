/**
 * Neon Auth utility functions
 * Handles JWT token validation and authentication flow
 */

const NEON_JWKS_URL = process.env.NEON_JWKS_URL || '';
const NEON_AUTH_URL = process.env.NEON_AUTH_URL || '';

interface AuthToken {
  sub: string;
  email: string;
  aud?: string;
  iat?: number;
  exp?: number;
}

let cachedJWKS: any = null;
let jwksCacheTime = 0;
const JWKS_CACHE_DURATION = 3600000; // 1 hour

/**
 * Fetch and cache JWKS from Neon Auth
 */
async function getJWKS() {
  const now = Date.now();
  
  // Return cached JWKS if still valid
  if (cachedJWKS && (now - jwksCacheTime) < JWKS_CACHE_DURATION) {
    return cachedJWKS;
  }

  try {
    const response = await fetch(NEON_JWKS_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch JWKS: ${response.statusText}`);
    }

    cachedJWKS = await response.json();
    jwksCacheTime = now;
    return cachedJWKS;
  } catch (error) {
    console.error('Error fetching JWKS:', error);
    throw error;
  }
}

/**
 * Validate JWT token with Neon JWKS
 * For now, we perform basic validation; use jose library for production-grade verification
 */
export async function validateToken(token: string): Promise<AuthToken | null> {
  try {
    // Parse JWT (basic parsing without verification for now)
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
    );

    // Check token expiration
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }

    // In production, verify with jose:
    // const jwks = await getJWKS();
    // const verified = await jwtVerify(token, jwks);

    return payload as AuthToken;
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
}

/**
 * Get stored auth token from localStorage
 */
export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('betterhr_token');
}

/**
 * Store auth token in localStorage
 */
export function storeToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('betterhr_token', token);
}

/**
 * Clear auth token
 */
export function clearToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('betterhr_token');
}

/**
 * Build Neon Auth login URL
 */
export function getNeonAuthLoginUrl(provider: string, redirectUrl: string): string {
  const authUrl = new URL(NEON_AUTH_URL);
  authUrl.searchParams.append('method', provider);
  authUrl.searchParams.append('redirect_url', redirectUrl);
  return authUrl.toString();
}

/**
 * Handle OAuth callback and extract token
 */
export function handleAuthCallback(): string | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const code = params.get('code');

  if (token) {
    storeToken(token);
    return token;
  }

  return null;
}
