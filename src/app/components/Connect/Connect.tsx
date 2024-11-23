"use client";
import { client } from "@/client";
import React from "react";
import { ConnectEmbed, darkTheme, lightTheme } from "thirdweb/react";
import { AppTheme, useAppContext } from "../../context/AppContext";
import { generatePayload, isLoggedIn, login, logout } from "../../actions/auth";

const Connect = () => {
  const { theme, setLoggedIn } = useAppContext();

  const customDarkTheme = darkTheme({
    colors: {
      modalBg: "#131418",
    },
  });

  const customLightTheme = lightTheme({
    colors: {
      modalBg: "#f9fafb",
    },
  });

  return (
    <div className="h-screen flex w-full items-center justify-center">
      <ConnectEmbed
        client={client}
        theme={theme === AppTheme.Dark ? customDarkTheme : customLightTheme}
        auth={{
          isLoggedIn: async () => {
            console.log("checking if logged in!");
            return await isLoggedIn();
          },
          doLogin: async params => {
            console.log("logging in!");
            await login(params);
            setLoggedIn(true);
          },
          getLoginPayload: async ({ address }) => generatePayload({ address }),
          doLogout: async () => {
            console.log("logging out!");
            await logout();
            setLoggedIn(false);
          },
        }}
      />
    </div>
  );
};

export default Connect;
