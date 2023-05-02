import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
  domain="dev-i0eh0870mpui6z1s.us.auth0.com"
  clientId="xj7zTt5W2nusxUVfpC2OtmNeuU0vmT6e"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
    <GoogleOAuthProvider clientId="147844901938-50grm0all2piil00174ga0pq3lo7gi51.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
