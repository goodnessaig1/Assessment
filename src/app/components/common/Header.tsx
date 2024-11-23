import { AppTheme, useAppContext } from "@/app/context/AppContext";
import React from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { ImBrightnessContrast } from "react-icons/im";
import { useActiveWallet, useDisconnect } from "thirdweb/react";
import { PiSignOut } from "react-icons/pi";

const Header = () => {
  const { theme, toggleTheme, loggedIn, setLoggedIn } = useAppContext();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  const signOut = () => {
    if (wallet) {
      disconnect(wallet);
    }
    setLoggedIn(false);
  };
  return (
    <div
      className={`flex items-center border-b ${
        theme === AppTheme.Dark ? "border-borderCol " : "border-[#dbd8e0]"
      } px-4 lg:px-20 justify-between h-20 w-full`}
    >
      <h1 className="text-xl font-bold uppercase text-purple-500">GruveWeb3</h1>

      <div className="flex flex-row gap-3">
        <div
          className={`h-11 w-12 flex justify-center items-center hover:cursor-pointer  rounded-lg border border-transparent ${
            theme === AppTheme.Dark
              ? "bg-[#161618] hover:border-[#1F7218]"
              : "hover:border-[#dbd8e0]"
          } transition duration-300`}
          onClick={toggleTheme}
        >
          {theme === AppTheme.Dark ? (
            <MdOutlineDarkMode size={26} />
          ) : (
            <ImBrightnessContrast size={26} />
          )}
        </div>
        {loggedIn && (
          <button
            className={`flex flex-row items-center justify-center gap-1 border  ${
              theme === AppTheme.Dark
                ? "bg-[#161618] border-borderCol hover:border-white hover:text-[#f9fafb]"
                : "bg-[#eeeff2] text-gray-400 border-[#dbd8e0] hover:text-gray-500"
            } rounded-lg px-3 py-1 transition duration-300`}
            onClick={signOut}
          >
            <PiSignOut size={20} />
            <span className="">Sign out</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
