import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./auth/Auth0Provider";
import ApolloProviderWithAuth from "./api/ApolloProviderWithAuth";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApolloProviderWithAuth>
          <App />
        </ApolloProviderWithAuth>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
