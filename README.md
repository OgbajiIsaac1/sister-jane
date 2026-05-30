# Sr. Jane Celebration Site

React/Vite frontend with Vercel API routes for bouquet and guestbook entries.

## Deploy on Vercel

1. Push this project to GitHub.
2. In Vercel, choose **Add New > Project** and import the GitHub repository.
3. Use these build settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add these environment variables in **Project Settings > Environment Variables**:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Deploy.

The frontend calls `/api/bouquet` and `/api/guestbook`. Vercel serves those from:

- `api/bouquet.js`
- `api/guestbook.js`

## Local Development

Copy `.env.example` to `.env` and fill in the Supabase values.

```bash
npm run dev
npm run build
```
