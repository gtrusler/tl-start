# Google Auth Production Deployment Notes

## Required Changes for Production

### 1. Google Cloud Console Configuration

**Add Production Redirect URIs:**
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Navigate to: APIs & Services → Credentials
- Edit your OAuth 2.0 Client ID
- Add to "Authorized redirect URIs":
  ```
  https://portal.truslerlegal.com/api/auth/callback/google
  ```

**Add Production JavaScript Origins (if needed):**
- Add to "Authorized JavaScript origins":
  ```
  https://portal.truslerlegal.com
  ```

### 2. Environment Variables

**Update `.env` (or deployment environment):**
```bash
# NextAuth.js - CRITICAL: Change these for production
NEXTAUTH_SECRET="generate-a-strong-random-secret-32-chars-min"
NEXTAUTH_URL="https://portal.truslerlegal.com"

# Google OAuth - Use your actual Google OAuth credentials
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**Generate secure NEXTAUTH_SECRET:**
```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Cloudflare Workers Configuration

**Update `wrangler.toml` environment variables:**
```toml
[env.production]
name = "trusler-legal-portal"

[env.production.vars]
NEXTAUTH_SECRET = "your-production-secret"
NEXTAUTH_URL = "https://portal.truslerlegal.com"
GOOGLE_CLIENT_ID = "your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "your-google-client-secret"
```

### 4. Deployment Checklist

- [ ] Update Google Cloud Console redirect URIs
- [ ] Generate and set secure NEXTAUTH_SECRET
- [ ] Update NEXTAUTH_URL to production domain
- [ ] Test Google Auth flow on production
- [ ] Verify HTTPS is properly configured
- [ ] Test sign-in/sign-out functionality
- [ ] Verify user session persistence

### 5. Security Considerations

**Important Notes:**
- Never commit production secrets to repository
- Use environment variables or secure secret management
- Ensure HTTPS is enabled (required for OAuth)
- Consider setting up proper error handling for OAuth failures
- Monitor authentication logs for security issues

### 6. Testing Production Auth

**Test Cases:**
1. Sign in with Google account
2. Sign out functionality
3. Session persistence across page reloads
4. Redirect behavior after authentication
5. Error handling for invalid/cancelled OAuth

---

**Created:** $(date)
**Branch:** feature/google-auth
**Status:** Ready for production deployment after completing checklist above