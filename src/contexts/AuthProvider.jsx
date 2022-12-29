import { createContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from "../firebase/firbase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const signup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const loginWithProvider = provider => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  }

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  }
  
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  }
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log("Current", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const authInfo = {
    user,
    loading,
    signup,
    login,
    loginWithProvider,
    updateUser,
    logout,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
