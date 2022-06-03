import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";

const root = document.getElementById("root");
const ReactRoot = ReactDOM.createRoot(root);
ReactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
