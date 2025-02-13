import { create } from "zustand";

const themeStore = create((set) => ({
    isDarkMode: localStorage.getItem("theme") === "dark",
    toggleDarkMode: () =>
        set((state) => {
            const newMode = !state.isDarkMode;
            if (newMode) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
            return { isDarkMode: newMode };
        }),
}));

export default themeStore;
