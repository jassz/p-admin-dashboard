import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CustomTheme from "./theme/customTheme";
import { ThemeProvider } from "@emotion/react";
import { ApiClientProvider } from "./context/ApiClientContext";
import { CssBaseline } from "@mui/material";
import { GlobalStyles } from "@mui/material";

import { ToastBar, Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyles
      styles={{
        html: { overflow: "hidden", height: "100vh", margin: 0, padding: 0 },
        body: { overflow: "hidden", height: "100vh", margin: 0, padding: 0 },
        "#root": { height: "100vh" }, // if you're using React root div
      }}
    />
    <ThemeProvider theme={CustomTheme}>
      <ApiClientProvider>
        <App />
        <Toaster
          position="top-right"
          gutter={8}
          containerStyle={{
            top: 20,
          }}
          toastOptions={{
            // Global styles (applies to all toasts)
            style: {
              background: "#363636", // default dark background
              color: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "12px 16px",
              fontSize: "14px",
            },
            // Success toast
            success: {
              style: {
                background: "#4BB543", // green
                color: "white",
              },
              iconTheme: {
                primary: "white",
                secondary: "#4BB543",
              },
            },
            // Error toast
            error: {
              style: {
                background: "#FF3333", // red
                color: "white",
              },
              iconTheme: {
                primary: "white",
                secondary: "#FF3333",
              },
            },
            // Loading toast (optional)
            loading: {
              style: {
                background: "#3A3A3A",
                color: "white",
              },
            },
          }}
        >
          {(t) => (
            <ToastBar
              toast={t}
              style={{
                ...t.style,
                animation: t.visible
                  ? "custom-enter 0.4s ease-out"
                  : "custom-exit 0.4s ease-in",
              }}
            />
          )}
        </Toaster>
      </ApiClientProvider>
    </ThemeProvider>
  </>
);
