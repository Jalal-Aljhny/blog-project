/* eslint-disable react-hooks/rules-of-hooks */
import { createContext } from "react";
import PropTypes from "prop-types";
import firebaseConfig from "../constants/FireBaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const FireBaseContext = createContext();

export const FireBaseProvider = ({ children }) => {
  const app = initializeApp(firebaseConfig) || {};
  const db = getFirestore() || [];
  return (
    <FireBaseContext.Provider value={{ app, db }}>
      {children}
    </FireBaseContext.Provider>
  );
};
FireBaseProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
