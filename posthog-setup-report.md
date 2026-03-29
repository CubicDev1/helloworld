# PostHog Setup Report — Recurrly

## Overview

PostHog analytics is fully integrated into the Recurrly app (Expo / React Native). The SDK is initialised via a singleton in `src/config/posthog.ts`, wrapped in `PostHogProvider` in `app/_layout.tsx`, and consumed via `usePostHog()` hooks or direct singleton calls throughout the app.

---

## Configuration

| Setting | Value |
|---|---|
| SDK | `posthog-react-native` v4.37.6 |
| Host | `https://us.i.posthog.com` |
| Token source | `Constants.expoConfig.extra.posthogProjectToken` (via `app.config.js`) |
| Env variable | `POSTHOG_PROJECT_TOKEN` in `.env` |
| Screen tracking | Manual via `posthog.screen()` in `app/_layout.tsx` |
| Touch autocapture | Enabled (`captureTouches: true`) |
| App lifecycle events | Enabled (`captureAppLifecycleEvents: true`) |
| Feature flags | Preloaded on startup (`preloadFeatureFlags: true`) |

---

## Tracked Events

| Event | Description | File |
|---|---|---|
| `user_signed_in` | User successfully signs in with email/password via Firebase | `app/(auth)/sign-in.tsx` |
| `user_sign_in_failed` | Sign-in attempt failed | `app/(auth)/sign-in.tsx` |
| `$exception` | Exception captured during sign-in failure | `app/(auth)/sign-in.tsx` |
| `user_signed_up` | User completes account creation via Firebase | `app/(auth)/sign-up.tsx` |
| `user_sign_up_failed` | Sign-up attempt failed | `app/(auth)/sign-up.tsx` |
| `$exception` | Exception captured during sign-up failure | `app/(auth)/sign-up.tsx` |
| `user_signed_out` | User signs out from the Settings screen | `app/(tabs)/settings.tsx` |
| `subscription_expanded` | User expands a subscription card on the home screen | `app/(tabs)/index.tsx` |
| `subscription_collapsed` | User collapses an expanded subscription card | `app/(tabs)/index.tsx` |
| `subscription_created` | User creates a new subscription | `components/CreateSubscriptionModal.tsx` |
| `subscription_details_viewed` | User opens the subscription detail screen | `app/subscriptions/[id].tsx` |
| `subscription_searched` | User searches for subscriptions (debounced 600 ms) | `app/(tabs)/subscriptions.tsx` |

### Key event properties

- `user_signed_in` / `user_signed_up`: no extra properties (identity set via `posthog.identify()`)
- `user_sign_in_failed` / `user_sign_up_failed`: `{ error_message }`
- `$exception`: `{ $exception_list: [{ type, value, stacktrace }], $exception_source }`
- `subscription_created`: `{ name, price, billing_frequency, category }`
- `subscription_searched`: `{ query }`

### Identity

`posthog.identify(email, { $set: { email }, $set_once: { first_sign_in_date } })` is called on every successful sign-in and sign-up.
`posthog.reset()` is called on sign-out to clear the identity.

---

## Dashboard

**Analytics basics** — https://us.posthog.com/project/360155/dashboard/1409207

| Insight | Type | Link |
|---|---|---|
| Sign-ups vs Sign-ins (30 days) | Trends (line) | https://us.posthog.com/project/360155/insights/3MxRNuf7 |
| Sign-up to First Subscription Funnel | Funnel (steps) | https://us.posthog.com/project/360155/insights/CphyUaid |
| Subscriptions Created by Category | Trends (bar, breakdown) | https://us.posthog.com/project/360155/insights/vAxdFKYy |
| Auth Errors Over Time | Trends (line) | https://us.posthog.com/project/360155/insights/n3yAOHvz |
| Subscription Searches Over Time | Trends (line) | https://us.posthog.com/project/360155/insights/SW5mxVpG |

---

## Files Changed

| File | Change |
|---|---|
| `src/config/posthog.ts` | PostHog singleton — pre-existing, no changes needed |
| `app/_layout.tsx` | `PostHogProvider` + manual screen tracking — pre-existing, no changes needed |
| `app/(auth)/sign-in.tsx` | Added `$exception` capture in catch block |
| `app/(auth)/sign-up.tsx` | Added `$exception` capture in catch block |
| `app/(tabs)/subscriptions.tsx` | Added `subscription_searched` with 600 ms debounce |
| `app/(tabs)/index.tsx` | `subscription_expanded`, `subscription_collapsed` — pre-existing |
| `app/(tabs)/settings.tsx` | `user_signed_out` + `posthog.reset()` — pre-existing |
| `app/subscriptions/[id].tsx` | `subscription_details_viewed` — pre-existing |
| `components/CreateSubscriptionModal.tsx` | `subscription_created` — pre-existing |
| `.env` | Added `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` |
| `app.config.js` | Injects env vars into `expo.extra` — pre-existing |
