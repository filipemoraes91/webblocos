import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";
import Rotas from "./route";
  
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
