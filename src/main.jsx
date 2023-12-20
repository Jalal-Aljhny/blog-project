import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { FireBaseProvider } from "./context/FireBaseContext.jsx";
import { PostsProvider } from "./context/PostsContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FireBaseProvider>
      <AuthProvider>
        <PostsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PostsProvider>
      </AuthProvider>
    </FireBaseProvider>
  </React.StrictMode>
);
