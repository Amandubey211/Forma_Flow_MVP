// import React, { createContext, useContext, useEffect } from "react";
// import { useLocalStorage } from "../../hooks/useLocalStorage";

// const ThemeContext = createContext();

// // Custom hook to use the ThemeContext
// export const useTheme = () => useContext(ThemeContext);

// export const ThemeProvider = ({ children }) => {
//   // Use the existing localStorage hook to persist the theme
//   const [theme, setTheme] = useLocalStorage("theme", "light");

//   // Effect to apply the 'dark' class to the <html> element
//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (theme === "dark") {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   const value = {
//     theme,
//     toggleTheme,
//   };

//   return (
//     <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
//   );
// };
