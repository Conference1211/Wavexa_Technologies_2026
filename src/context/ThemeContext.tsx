import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

/* =========================================================
   THEME CONTEXT
   LIGHT MODE ONLY
========================================================= */

type ThemeContextType = {
  theme: "light";
};

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

/* =========================================================
   PROVIDER
========================================================= */

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;

    /* Always force Light Mode */
    root.classList.remove("dark");
    root.classList.add("light");

    /* Remove old dark-mode preference */
    localStorage.removeItem("wavexa-theme");

    /* Force browser color scheme */
    root.style.colorScheme = "light";
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: "light",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/* =========================================================
   USE THEME
========================================================= */

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}