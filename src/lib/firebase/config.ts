import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import * as SecureStore from "expo-secure-store";

// Create a persistence adapter utilizing Expo's native encrypted secure store
// Android SecureStore restricts keys to alphanumeric characters, ".", "-", and "_"
const sanitizeKey = (key: string) => key.replace(/[^a-zA-Z0-9.\-_]/g, '_');

const securePersistence = {
  getItem: async (key: string) => await SecureStore.getItemAsync(sanitizeKey(key)),
  setItem: async (key: string, value: string) => await SecureStore.setItemAsync(sanitizeKey(key), value),
  removeItem: async (key: string) => await SecureStore.deleteItemAsync(sanitizeKey(key)),
};

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Bind secure persistence so users stay logged in eternally (like cached cookies)
let auth: any;
try {
  // If app is newly initialized, we use initializeAuth explicitly.
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(securePersistence)
  });
} catch (error) {
  // If initialized previously via hot reload
  auth = getAuth(app);
}

export { app, auth };
