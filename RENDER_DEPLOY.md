# Deploy to Render.com

## Automatic Deployment (Recommended)

1. Go to https://render.com and sign up/login
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub account
4. Select repository: **`maxog8/sovereign-agent-ai`**
5. Render will detect `render.yaml` and create:
   - Web Service (Node.js app)
   - PostgreSQL database
6. Add required environment variables in the dashboard
7. Click **"Apply"** to deploy

## Required Environment Variables

After deployment, add these in Render dashboard → Environment tab:

```
BUILT_IN_FORGE_API_KEY=<your-manus-backend-key>
BUILT_IN_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=<your-manus-frontend-key>
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
MANUS_API_KEY=<your-manus-api-key>
OPENAI_API_KEY=<your-openai-key>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://manus.im
VITE_APP_ID=<your-manus-app-id>
OWNER_OPEN_ID=<your-owner-openid>
OWNER_NAME=<your-name>
```

## Manual Deployment

If blueprint doesn't work:

1. Create **Web Service**:
   - Name: `sovereign-agent-ai`
   - Environment: Node
   - Build Command: `pnpm install && pnpm run build`
   - Start Command: `pnpm run db:push && pnpm run start`
   
2. Create **PostgreSQL Database**:
   - Name: `sovereign-agent-db`
   - Link to web service

3. Add environment variables (see above)

4. Deploy!

## Deployment Time

- First deploy: ~5-10 minutes
- Subsequent deploys: ~2-3 minutes

## Live URL

After deployment, Render provides a URL like:
`https://sovereign-agent-ai.onrender.com`
