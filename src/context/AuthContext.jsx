import { createContext, useContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { FireBaseContext } from "./FireBaseContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { app } = useContext(FireBaseContext);
  const auth = getAuth(app);

  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscibe();
    };
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ signUp, logIn, user, isAuth: !!user, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
