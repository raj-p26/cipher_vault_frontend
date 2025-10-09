import { create } from "zustand";

type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

function setTheme(theme: Theme) {
  if (theme === "light") {
    html.classList.add("light");
    html.classList.remove("dark");
  } else if (theme === "dark") {
    html.classList.add("dark");
    html.classList.remove("light");
  } else {
    throw new Error("Unreachable");
  }
}

const html = document.querySelector("html")!;
const localTheme = (localStorage.getItem("theme") as Theme) || "light";
setTheme(localTheme);

const themeStore = create<ThemeState>()((set) => ({
  theme: (localStorage.getItem("theme") as Theme) || "light",
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);

      return {
        ...state,
        theme: newTheme,
      };
    }),
}));

export default themeStore;
