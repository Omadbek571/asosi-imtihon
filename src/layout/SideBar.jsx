import React from "react";
import logo from "../images/layoutImg1.svg";
import people from "../images/people.svg";
import themeStore from "../store/themeStore";
import { FiMoon, FiSun } from "react-icons/fi";

function SideBar() {
    const { isDarkMode, toggleDarkMode } = themeStore();

    return (
        <div className='bg-[#373B53] flex items-center justify-between lg:fixed lg:top-[-0px] lg:bg-[#373B53] lg:w-[73px] lg:rounded-r-[19px] lg:flex-col lg:items-start lg:h-screen lg:flex'>
            <img src={logo} alt="logo" />
            <div className='flex gap-5 lg:flex-col items-center'>
                <button onClick={toggleDarkMode} className='text-white text-2xl'>
                    {isDarkMode ? <FiSun /> : <FiMoon />}
                </button>
                <img className='border lg:rounded-r-2xl border-gray-600 p-5' src={people} alt="people" />
            </div>
        </div>
    );
}

export default SideBar;
