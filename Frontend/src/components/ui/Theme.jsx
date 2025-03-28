import React, { useEffect, useState } from "react";
import Moon from "../images/moon.svg";
import Sun from "../images/sun.svg";

function Theme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
      document.body.classList.add("bg-slate-100", "text-black");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div
      className="cursor-pointer p-2 rounded-full transition duration-300 ease-in-out"
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
    >
      {theme === "light" ? (
        <img src={Moon} alt="Dark Mode" />
      ) : (
        <img src={Sun} alt="Light Mode" />
      )}
    </div>
  );
}

export default Theme;
