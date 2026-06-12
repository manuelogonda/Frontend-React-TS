import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'DEVELOPER' | 'USER';
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>; // Simulated async endpoint execution
  logout: () => void;
}

// Initialize Context as undefined to force safe provider design patterns
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode; // Explicit typing for components accepting nested layouts
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Derive explicit boolean values natively to avoid syncing double states
  const isLoggedIn = user !== null;

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate network latency hitting a backend API instance
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setUser({
        id: crypto.randomUUID(),
        username: email.split('@')[0],
        email: email,
        role: 'DEVELOPER',
      });
    } catch (error) {
      console.error('Authentication request failure', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  // 4. Optimize the value object via useMemo to prevent unnecessary consumer updates
  const contextPayload = useMemo(() => ({
    user,
    isLoggedIn,
    isLoading,
    login,
    logout
  }), [user, isLoading, isLoggedIn]);

  return (
    <AuthContext.Provider value={contextPayload}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. Build a Guarded Custom Consumer Hook to enforce operational runtime boundaries
export function useAuth() {
  const context = useContext(AuthContext);
  
  // If a developer tries to use useAuth outside of <AuthProvider>, throw an engineered break message
  if (context === undefined) {
    throw new Error('Critical Error: useAuth must be executed exclusively within an AuthProvider scope');
  }
  
  return context;
}