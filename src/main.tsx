import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { preloadRoute } from "./routes";
import "./index.css";

// Load the current page's code first, so the pre-rendered page is replaced without a visible jump
preloadRoute(window.location.pathname)
  .catch(() => undefined)
  .finally(() => createRoot(document.getElementById("root")!).render(<App />));
