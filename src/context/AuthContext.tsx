import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { auth } from "../types/firebase"; // Fixed import path
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
        setError(null);
      }, (error) => {
        setError(error.message);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to initialize auth");
      setLoading(false);
      return () => {};
    }
  }, []);

  const value = useMemo(() => ({
    currentUser,
    loading,
    error,
  }), [currentUser, loading, error]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};