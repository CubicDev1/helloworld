import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  isLoaded: boolean;
  signOut: () => Promise<void>;
}

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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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

export const useAuth = () => useContext(AuthContext);

export const useUser = () => {
  const { user } = useContext(AuthContext);
  if (!user) return { user: null };
  const mappedUser = {
    id: user.uid,
    fullName: user.displayName || 'User',
    firstName: user.displayName?.split(' ')[0] || 'User',
    emailAddresses: [{ emailAddress: user.email }],
    imageUrl: user.photoURL,
    createdAt: user.metadata.creationTime,
  };
  return { user: mappedUser };
};

export const useClerk = () => {
  const { signOut } = useContext(AuthContext);
  return { signOut };
};
