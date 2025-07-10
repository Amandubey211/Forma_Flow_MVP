import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.jsx";
import "./index.css";
import { TemplateProvider } from "./context/TemplateContext.jsx";
import { SubmissionProvider } from "./context/SubmissionContext.jsx"; // 1. Import SubmissionProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <TemplateProvider>
          <SubmissionProvider>
            <App />
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                style: {
                  borderRadius: "8px",
                  background: "#333",
                  color: "#fff",
                },
              }}
            />
            <Analytics />
          </SubmissionProvider>
        </TemplateProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
