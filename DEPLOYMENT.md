# Deploying Your Help Centre to Netlify

## Quick Setup

1. **Create a Netlify account** (free): https://www.netlify.com

2. **Connect your GitHub/GitLab/Bitbucket repo** (or drag & drop):
   - Push this folder to a Git repository
   - In Netlify, click "New site from Git"
   - Select your repo and authorize
   - Click "Deploy site"

3. **Or use Netlify CLI** (if you have Node.js):
   ```bash
   npm install -g netlify-cli
   cd /Users/emulroy/Documents/Usabilla\ test
   netlify deploy
   ```

## Password Protection

The site is protected by a **password gate** (in `index.html`).

- **Default password**: `usabilla2026`
- **To change it**: Edit `index.html` and update this line:
  ```javascript
  const CORRECT_PASSWORD = 'usabilla2026';
  ```

## Important Security Notes

⚠️ **This password protection is client-side only**:
- Not suitable for highly sensitive data
- The password is visible in the page source (viewable with browser DevTools)
- For strong security, consider adding server-side authentication

**For stronger protection on Netlify**, use:
- Netlify Basic Auth (via `_headers` file) — requires paid plan
- OAuth/SSO via Netlify Functions (more advanced)

## File Structure

```
/
├── index.html (password gate entry point)
├── help-centre.html (main help centre content)
├── help/ (article pages)
├── assets/ (styles & scripts)
├── netlify.toml (Netlify configuration)
└── DEPLOYMENT.md (this file)
```

## Testing Locally

Before deploying:
1. Open `index.html` in your browser
2. Enter the password: `usabilla2026`
3. Verify the help centre loads correctly

## Support

For Netlify deployment help: https://docs.netlify.com

For site feedback integration: Your Usabilla embed code is already installed on all pages.
