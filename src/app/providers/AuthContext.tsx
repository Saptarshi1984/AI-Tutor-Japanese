'use client'
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../config";
import type { Session } from "@supabase/supabase-js";

type SessionType = Session | null;

interface AuthResult {
  success: boolean;
  data?: any; // You can replace `any` with `AuthResponse` from Supabase types
  error?: string;
}

interface AuthContextType {
  session: SessionType;
  loading:boolean;  
  signInUser: (email:string, password:string) => Promise<AuthResult>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  //Session state (user info, sign-in status)
  const [session, setSession] = useState<SessionType>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        console.log(data.session);
        setSession(data.session);
        setLoading(false);        
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
  const signInUser = async (email:string, password:string): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Supabase sign-in error:", error.message);
        return { success: false, error: error.message };
      }
      //success
      console.log('Supabase sign-in success:', data);
      return {success:true, data};
    } catch (error) {
      //Unexpected error
      console.error('Unexpected error during sign-in:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  };

  

  return (
    <AuthContext.Provider value={{ session, signInUser, loading }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return ctx;
};

