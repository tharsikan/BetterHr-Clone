
# Guide: Setting up Google Login for BetterHR Pro

## Step 1: Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new Project named `BetterHR`.
3. Search for "OAuth consent screen":
   - User Type: **External**.
   - App name: `BetterHR Pro`.
   - User support email: `your-email@example.com`.
   - Add the scope `.../auth/userinfo.email` and `.../auth/userinfo.profile`.
4. Go to "Credentials":
   - Click **Create Credentials** -> **OAuth client ID**.
   - Application type: **Web application**.
   - Name: `BetterHR Pro Web`.
   - **Authorized JavaScript origins**: `http://localhost:3000` (or your production URL).
   - **Authorized redirect URIs**: (Get this from Neon Console Step 2).

## Step 2: Neon Auth Configuration
1. Open your [Neon Console](https://console.neon.tech/).
2. Select your project -> **Auth**.
3. Under **Social Connections**, click **Add Connection** -> **Google**.
4. Copy the **Redirect URI** from Neon and add it to the Google Cloud Console (Step 1.4).
5. Paste the **Client ID** and **Client Secret** from Google into the Neon fields.
6. Click **Save Changes**.

## Step 3: Local Environment Variables
Add these to your `.env`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... (Get from Neon Auth Dashboard)
CLERK_SECRET_KEY=sk_test_... (Get from Neon Auth Dashboard)
```

## Step 4: Use Clerk Components
In Next.js 15, you should wrap your app in `<ClerkProvider>` and use `<SignInButton />` or the `useAuth()` hook.
