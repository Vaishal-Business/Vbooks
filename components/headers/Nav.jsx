"use client";
import Link from "next/link";

import React, { useEffect } from "react";

import {
  categoryLinks,
  categoryLinks2,
  homePages,
  singlePostLinks,
} from "@/data/menu";
import { usePathname } from "next/navigation";
export default function Nav() {
  useEffect(() => {
    import("@/utils/splitting.min").then((Splitting) => {
      Splitting.default(); // call Splitting's default export
    });
  }, []);
  useEffect(() => {
    const MowBody = document.body;
    const elements = document.querySelectorAll(".main-menu .has-child");

    const handleMouseEnter = () =>
      MowBody.classList.add("menu-overlay-enabled");
    const handleMouseLeave = () =>
      MowBody.classList.remove("menu-overlay-enabled");

    // Attach event listeners
    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup listeners on unmount
    return () => {
      document.body.classList.remove("menu-overlay-enabled");
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);
  const pathname = usePathname();
  const isMenuActive = (link) => {
    return link.href?.split("/")[1] == pathname.split("/")[1];
  };
  const isMenuParentActive = (menu) => {
    return menu.some((elm) => isMenuActive(elm));
  };

  return (
    <>
      {" "}
      <li
        className={`has-child text-menu ${
          isMenuParentActive(homePages) ? "current-menu" : ""
        } `}
      >
        <a href="#" className="toggle splitting link-no-action">
          <span className="text" data-splitting="">
            Home
          </span>
          <span className="text" data-splitting="">
            Home
          </span>
        </a>
        <ul className="submenu">
          {homePages.map(({ href, label, isCurrent }) => (
            <li
              key={href}
              className={`menu-item ${
                isMenuActive({ href }) ? " current-menu-item" : ""
              }`}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </li>
      <li
        className={`has-child text-menu ${
          isMenuParentActive(categoryLinks) ? "current-menu" : ""
        } `}
      >
        <a href="#" className="toggle splitting link-no-action">
          <span className="text" data-splitting="">
            Features
          </span>
          <span className="text" data-splitting="">
            Features
          </span>
        </a>
        <ul className="submenu">
          {categoryLinks.map(({ href, label }) => (
            <li
              key={href}
              className={`menu-item ${
                isMenuActive({ href }) ? " current-menu-item" : ""
              }`}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </li>
      <li
        className={`has-child text-menu ${
          isMenuParentActive(singlePostLinks) ? "current-menu" : ""
        } `}
      >
        <a href="#" className="toggle splitting link-no-action">
          <span className="text" data-splitting="">
            Post Styles
          </span>
          <span className="text" data-splitting="">
            Post Styles
          </span>
        </a>
        <ul className="submenu">
          {singlePostLinks.map(({ href, label }) => (
            <li
              key={href}
              className={`menu-item ${
                isMenuActive({ href }) ? " current-menu-item" : ""
              }`}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="has-child text-menu">
        <a href="#" className="toggle splitting link-no-action">
          <span className="text" data-splitting="">
            Categories
          </span>
          <span className="text" data-splitting="">
            Categories
          </span>
        </a>
        <ul className="submenu">
          {categoryLinks2.map(({ href, label, slug }) => (
            <li key={label} className="menu-item">
              <Link href={`${href}/${slug}`}>{label}</Link>
            </li>
          ))}
        </ul>
      </li>
      <li
        className={`text-menu    ${
          isMenuActive({ href: "/about" }) ? " current-menu" : ""
        }`}
      >
        <Link href={`/about`} className="toggle splitting">
          <span className="text" data-splitting="">
            About
          </span>
          <span className="text" data-splitting="">
            About
          </span>
        </Link>
      </li>
      <li
        className={`text-menu    ${
          isMenuActive({ href: "/contact" }) ? " current-menu" : ""
        }`}
      >
        <Link href={`/contact`} className="toggle splitting">
          <span className="text" data-splitting="">
            Contact
          </span>
          <span className="text" data-splitting="">
            Contact
          </span>
        </Link>
      </li>
    </>
  );
}
