import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../config";
import type { Session } from "@supabase/supabase-js";

type SessionType = any | null;

interface AuthContextType {
  session: SessionType;
  /* setSession: React.Dispatch<React.SetStateAction<SessionType>>; */
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthContextProvider = ({ children }: AuthProviderProps) => {
  //Session state (user info, sign-in status)
  const [session, setSession] = useState<SessionType | null>(null);

  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        console.log(data.session);
        setSession(data.session);
      } catch (error) {
        console.error("Error getting session:", error);
      }
    }
    getInitialSession();

    //2) Listen for changes in auth state (.onAuthStateChange())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Session changed:", session);
    });
  }, []);

  //Auth functions (signin, signup, logout)

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
