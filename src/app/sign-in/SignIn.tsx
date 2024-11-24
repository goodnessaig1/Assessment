"use client";
import React from "react";
import { useAppContext } from "../context/AppContext";
import { ConnectEmbed, darkTheme, lightTheme } from "thirdweb/react";
import { client } from "../utils/client";
import { generatePayload, isLoggedIn, login, logout } from "../actions/auth";
import PageLayout from "../components/common/PageLayout";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { isDarkTheme, setIsLoggedIn } = useAppContext();
  const router = useRouter();

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
    <PageLayout>
      <div className="h-screen w-full items-center flex justify-center">
        <ConnectEmbed
          client={client}
          theme={isDarkTheme ? customDarkTheme : customLightTheme}
          auth={{
            isLoggedIn: async () => {
              console.log("checking if logged in!");
              return await isLoggedIn();
            },
            doLogin: async params => {
              console.log("logging in!");
              await login(params);
              router.push("/upload-file");
              setIsLoggedIn(true);
            },
            getLoginPayload: async ({ address }) =>
              generatePayload({ address }),
            doLogout: async () => {
              console.log("logging out!");
              await logout();
              setIsLoggedIn(false);
            },
          }}
        />
      </div>
    </PageLayout>
  );
};

export default SignIn;
