import React, { useEffect } from "react";
import { useLanguage } from "../contexts/language"; // Import the context
import { Link } from "react-router-dom";

function Menu() {
  const { translations } = useLanguage();
  const data = translations; // Keep reference for clarity

  useEffect(() => {
    const menu = document.getElementById("menu");
    const btn = document.getElementById("hamburger");

    if (!menu || !btn) return;

    const closeMenuOnClickOutside = (e) => {
      // Close menu if clicking on a link
      menu.querySelectorAll(".link").forEach((link) => {
        if (link.contains(e.target)) {
          menu.style.left = "-100%";
          document.removeEventListener("click", closeMenuOnClickOutside);
        }
      });

      // Close menu if clicking outside
      if (!menu.contains(e.target) && e.target !== btn) {
        menu.style.left = "-100%";
        document.removeEventListener("click", closeMenuOnClickOutside);
      }
    };

    const toggleMenu = (ev) => {
      if (menu.style.left !== "0px") {
        menu.style.left = "0px";
        ev.stopPropagation();
        document.addEventListener("click", closeMenuOnClickOutside);
      } else {
        menu.style.left = "-100%";
        document.removeEventListener("click", closeMenuOnClickOutside);
      }
    };

    if (window.innerWidth < 767) {
      btn.addEventListener("click", toggleMenu);
    }

    const handleResize = () => {
      if (window.innerWidth < 767) {
        btn.addEventListener("click", toggleMenu);
      } else {
        btn.removeEventListener("click", toggleMenu);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      btn.removeEventListener("click", toggleMenu);
      window.removeEventListener("resize", handleResize);
    };
  }, []); // ✅ useEffect is always called in the same order

  return (
    <nav id="menu">
      <Link to="/">
        <span className="text link">
          {data?.home}
        </span>
      </Link>
      <Link to="/quiz">
        <span className="text link">
          {data?.quiz}
        </span>
      </Link>
      <Link to="/results">
        <span className="text link">
          {data?.results}
        </span>
      </Link>
      <Link to="/resources">
        <span className="text link">
          {data?.resources}
        </span>
      </Link>
      <Link to="/about">
        <span className="text link">
          {data?.about}
        </span>
      </Link>
    </nav>
  );
}

export default Menu;
