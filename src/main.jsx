import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TimelineProvider } from "./context/TimelineContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TimelineProvider>
      <App />
      <ToastContainer position="bottom-right" />
    </TimelineProvider>
  </StrictMode>
);