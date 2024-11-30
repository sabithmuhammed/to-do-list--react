import {
    MoonFilled,
    SunFilled,
} from "@ant-design/icons";
import { Button, Switch } from "antd";
import React from "react";
import { useDarkMode } from "../context/DarkModeContext";

const Navbar = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (
        <nav className="mx-auto w-full md:w-[700px] py-2 border-b-[1px] dark:border-white/20 flex justify-end items-center gap-4 relative">
            {" "}
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-300">
                <SunFilled />
                <Switch
                    defaultChecked
                    size="small"
                    style={{ backgroundColor: isDarkMode ? "#164c7e" : "" }}
                    onChange={toggleDarkMode}
                />
                <MoonFilled />
            </div>
            {/* <Button
                type="primary"
                className="dark:bg-[#164c7e] dark:shadow-sm dark:shadow-black/50"
            >
                Login
            </Button> */}
        </nav>
    );
};

export default Navbar;
