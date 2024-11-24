"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";

export enum AppTheme {
  Light = "light",
  Dark = "dark",
}

interface AppContextType {
  theme: AppTheme;
  toggleTheme: () => void;
  isLoggedIn: boolean;
  isDarkTheme: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<AppTheme>(AppTheme.Dark);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const isDarkTheme = theme === AppTheme.Dark;
  const isLightTheme = theme === AppTheme.Light;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as AppTheme | null;
    const initialTheme = savedTheme ?? AppTheme.Dark;

    setTheme(initialTheme);
    document.documentElement.classList.add(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isLightTheme ? AppTheme.Dark : AppTheme.Light;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove(
      isDarkTheme ? AppTheme.Dark : AppTheme.Light,
    );
    document.documentElement.classList.add(newTheme);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isLoggedIn,
        setIsLoggedIn,
        isDarkTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
