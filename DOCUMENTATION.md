# Grocify Application Documentation

## 1. Overview
**Grocify** is a smart, full-stack React Native grocery planning application built with Expo Router. It aims to streamline everyday grocery shopping by offering an intuitive planner, dynamic list management, and user insights. The application is integrated with a lightweight backend powered by Expo API Routes and a Postgres serverless database (Neon).

## 2. Tech Stack
### Frontend
- **Framework:** React Native with Expo SDK (v55)
- **Routing:** Expo Router (File-based routing)
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **State Management:** Zustand
- **Animations/UI:** Reanimated, React Native Gesture Handler

### Backend & Database
- **API Environment:** Expo API Routes (running Edge/Serverless functions)
- **ORM:** Drizzle ORM
- **Database:** Neon Database (Serverless Postgres)

### Infrastructure & Services
- **Authentication:** Firebase Auth (Email/Password, migrated from Clerk)
- **Error Tracking:** Sentry
- **Icons & Assets:** Expo Vector Icons, Expo Image

---

## 3. Project Structure
The codebase follows a modular structure organized heavily within the `src/` directory:

```plaintext
├── src/
│   ├── app/                 # Expo Router file-based navigation
│   │   ├── (auth)/          # Authentication flow (Sign-In)
│   │   ├── (tabs)/          # Main bottom-tab navigation 
│   │   ├── api/             # Expo API Route Handlers (Server-side APIs)
│   │   ├── _layout.tsx      # Root layout & providers
│   │   └── sso-callback.tsx # Callback stub
│   │
│   ├── components/          # Reusable UI components
│   │   ├── insights/        # User Profile and Analytics UI
│   │   ├── list/            # Grocery list item and rendering
│   │   └── planner/         # Forms or buttons related to planning
│   │
│   ├── hooks/               # Custom React hooks (e.g., useSocialAuth stub)
│   │
│   ├── lib/                 # Core logic, DB definitions, Firebase setup
│   │   ├── firebase/        # Firebase initialization config
│   │   └── server/          # Drizzle ORM schema, DB client, and CRUD actions
│   │
│   ├── providers/           # Context providers (e.g., AuthProvider wrapper)
│   └── store/               # Zustand global state (grocery-store.ts)
│
├── .env.example             # Template for required Environment Variables
├── app.json                 # Expo configuration
├── package.json             # NPM dependencies and scripts
└── global.css               # Global Tailwind CSS definitions
```

---

## 4. Key Concepts & Architecture

### 4.1 Authentication (Firebase)
Previously relying on Clerk, the app now uses standard **Firebase Email & Password Authentication**. 
- To prevent sweeping UI rewrites, a custom **`AuthProvider`** (`src/providers/AuthProvider.tsx`) wraps the entire app in `src/app/_layout.tsx`. 
- This provider exports mock-Clerk hooks (`useAuth`, `useUser`, `useClerk`) that intercept Firebase's SDK data, maintaining compatibility with existing files while relying strictly on Firebase natively.
- The `src/app/(auth)/sign-in.tsx` handles both creating accounts and signing in with explicit toggle modes.

### 4.2 State Management
State is centrally managed by **Zustand** in `src/store/grocery-store.ts`.
- It tracks `items`, `isLoading`, and `error`.
- The store acts as a repository, syncing the local React Native state with the remote server. 
- It houses robust actions: `loadItems`, `addItem`, `updateQuantity`, `togglePurchased`, `removeItem`, and `clearPurchased`. 
- Fetch logic relies on calling local relative routes (e.g., `fetch('/api/items')`), which works seamlessly with Expo Router's local/deployed API routing. The client now intelligently extracts exact `payload.error` strings from the server when failing.

### 4.3 Backend & Database (Expo API + Drizzle)
The app runs its own miniature backend using **Expo Route Handlers** inside `src/app/api/`.
- **Database Connection:** `src/lib/server/db/client.ts` uses `@neondatabase/serverless` to connect asynchronously to the Neon Postgres database.
- **Data Schema:** Defined in `src/lib/server/db/schema.ts`, primarily building the `grocery_items` table (columns: id, name, category, quantity, purchased, priority, updated_at).
- **CRUD Scripts:** Database actions are abstracted in `src/lib/server/db-actions.ts`.

---

## 5. Screen Breakdown

### Tab Navigation `(tabs)`
The user land on an authenticated layout managed by `src/app/(tabs)/_layout.tsx`, utilizing `expo-router/unstable-native-tabs`.
1. **List (`index.tsx`)**: Displays all currently active grocery items. Usually includes toggles to strike out purchased items or update quantities.
2. **Planner (`planner.tsx`)**: The form/interface where users input necessary groceries, quantities, and map them to categories (Produce, Dairy, etc.).
3. **Insights (`insights.tsx`)**: Represents user analytics. It houses the `UserProfile.tsx` component that pulls the user email and display name via `useUser()` hooks and offers a logout button.

### Authentication `(auth)`
Protected by an interceptor in `_layout.tsx`. If the user has no valid Firebase session, they are redirected automatically to `sign-in.tsx`.
- **Sign-in Screen:** A beautiful UI with absolute circle views and glassmorphism. It allows toggling between 'Create an Account' (Name, Email, Password) and 'Welcome Back' (Email, Password).

---

## 6. Environment Variables
To securely run both the frontend and the API Route Handlers, the server environment must configure a `.env` file based on `.env.example`:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreqSQL connection string provided by Neon. Necessary for Drizzle ORM and all local APIs in `src/app/api`. |
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Firebase Client API connection string. |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Domain |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project configuration string |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`| Firebase storage path |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`| Firebase notification id |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | Mobile application identifier in Firebase |
| `EXPO_PUBLIC_SENTRY_DSN` | Sentry DSN mapping application logs to your Sentry org |

---

## 7. Local Setup & Administrative Workflows

### Running the App Locally
1. Install dependencies: `npm install`
2. Run database migrations to push schema definitions: `npm run db:push`
   *(This ensures your Neon Database structure is synchronized with `src/lib/server/db/schema.ts`)*.
3. Start the Expo server globally: `npm run start`

### Maintenance Notes
- **Missing Tables (`Failed Query`)**: If the app loads but shows an error like `Request failed (500): Failed query: relation "grocery_items" does not exist`, it's because `npm run db:push` was ignored upon changing Postgres instances. Always run the `db:push` command if you ever drop the database or use a fresh deployment container.
- **API Fetch Constraints**: Since Expo API Routes are designed locally on the bundler's host but run remotely on distinct server environments (e.g. Vercel) in Prod, keeping `fetch('/api/...')` routes relative guarantees they resolve effectively as long as the deployed client runs on the identical domain.
- **Social Auth Extension**: A stub `useSocialAuth.ts` is currently present which alerts the user if they try to trigger social endpoints. To implement Google/Apple sign-ins on Native effectively, libraries like `@react-native-google-signin/google-signin` or `expo-router`'s specialized Native plugins would be required moving forward along with configuring OAuth bundles natively inside iOS/Android dashboards.
