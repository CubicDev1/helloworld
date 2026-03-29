import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../lib/firebase/config";

type AuthContextType = {
  user: User | null;
  isSignedIn: boolean;
  isLoaded: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isSignedIn: false,
  isLoaded: false,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isSignedIn: !!user, isLoaded, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return {
    isSignedIn: context.isSignedIn,
    isLoaded: context.isLoaded,
  };
};

export const useUser = () => {
  const context = useContext(AuthContext);
  return {
    user: context.user
      ? {
          id: context.user.uid,
          fullName: context.user.displayName,
          primaryEmailAddress: { emailAddress: context.user.email },
          imageUrl: context.user.photoURL,
        }
      : null,
  };
};

export const useClerk = () => {
  const context = useContext(AuthContext);
  return {
    signOut: context.signOut,
  };
};
