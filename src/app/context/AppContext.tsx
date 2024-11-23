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
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<AppTheme>(AppTheme.Dark);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as AppTheme | null;
    const initialTheme = savedTheme ?? AppTheme.Dark;

    setTheme(initialTheme);
    document.documentElement.classList.add(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === AppTheme.Light ? AppTheme.Dark : AppTheme.Light;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove(
      theme === AppTheme.Dark ? AppTheme.Dark : AppTheme.Light,
    );
    document.documentElement.classList.add(newTheme);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        loggedIn,
        setLoggedIn,
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
