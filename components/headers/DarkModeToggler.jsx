"use client";
import React, { useState, useEffect } from "react";

export default function DarkModeToggler() {
  const [show, setShow] = useState(false);

  // Default to dark mode if no preference is saved
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      const mode = saved !== null ? saved === "true" : true; // default dark
      if (mode) document.body.classList.add("dark-mode"); // Apply immediately
      return mode;
    }
    return true;
  });

  const toggleMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      if (newMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      return newMode;
    });
  };

  useEffect(() => {
    setShow(true); // show toggle after mount
  }, []);

  return (
    <>
      {show && (
        <div
          className="mode-check"
          onClick={toggleMode}
          style={{ cursor: "pointer" }}
        >
          <span className="label light sm-hide">Light</span>
          <div
            className={`toggle toggle-switch-mode ${darkMode ? "active" : ""}`}
          >
            <div className="toggle-button" />
          </div>
          <span className="label dark">Dark</span>
        </div>
      )}
    </>
  );
}
