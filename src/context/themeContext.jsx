import { createContext, useState, useContext } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { themeStyle } from "../theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showList, setShowList] = useState(true);
  const [expandedSubGrp, setExpandedSubGrp] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const theme = themeStyle(darkMode);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleTheme = () => {
    localStorage.setItem("theme", darkMode ? "light" : "dark");
    setDarkMode(!darkMode);
  };

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleShowList = () => {
    setShowList(!showList);
  };

  const toggleExpandedSubGrp = () => {
    setExpandedSubGrp(!expandedSubGrp);
  };

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
        isMobile,
        darkMode,
        showMenu,
        showList,
        toggleShowMenu,
        toggleShowList,
        theme,
        expandedSubGrp,
        toggleExpandedSubGrp,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
