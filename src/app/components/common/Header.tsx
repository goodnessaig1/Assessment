import { useAppContext } from "@/app/context/AppContext";
import React from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { ImBrightnessContrast } from "react-icons/im";
import { useActiveWallet, useDisconnect } from "thirdweb/react";
import { PiSignInFill, PiSignOut } from "react-icons/pi";
import classNames from "classnames";
import Link from "next/link";

const Header = () => {
  const { isDarkTheme, toggleTheme, isLoggedIn, setIsLoggedIn } =
    useAppContext();

  const { disconnect } = useDisconnect();

  const wallet = useActiveWallet();

  const buttonClass = classNames(
    "flex flex-row items-center justify-center gap-1 border",
    {
      "bg-[#161618] border-borderCol hover:border-white hover:text-[#f9fafb]":
        isDarkTheme,
      "bg-[#eeeff2] text-gray-400 border-[#dbd8e0] hover:text-gray-500":
        !isDarkTheme,
    },
    "rounded-lg px-3 py-1 transition duration-300",
  );

  const signOut = () => {
    if (wallet) {
      disconnect(wallet);
    }
    setIsLoggedIn(false);
  };

  return (
    <div
      className={classNames(
        "flex items-center px-4 lg:px-20 justify-between h-20 w-full border-b",
        {
          "border-borderCol": isDarkTheme,
          "border-[#dbd8e0]": !isDarkTheme,
        },
      )}
    >
      <Link href={"/"} className="text-xl font-bold uppercase text-purple-500">
        GruveWeb3
      </Link>

      <div className="flex flex-row gap-3">
        <div
          className={classNames(
            "h-11 w-12 flex justify-center items-center hover:cursor-pointer rounded-lg border border-transparent transition duration-300",
            {
              "bg-[#161618] hover:border-[#1F7218]": isDarkTheme,
              "hover:border-[#dbd8e0]": !isDarkTheme,
            },
          )}
          onClick={toggleTheme}
        >
          {isDarkTheme ? (
            <MdOutlineDarkMode size={26} />
          ) : (
            <ImBrightnessContrast size={26} />
          )}
        </div>
        {isLoggedIn ? (
          <Link href={"/sign-in"} className={buttonClass} onClick={signOut}>
            <PiSignOut size={20} />
            <span className="">Sign out</span>
          </Link>
        ) : (
          <Link href={"/sign-in"} className={buttonClass}>
            <PiSignInFill size={20} />
            <span className="">Sign In</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
