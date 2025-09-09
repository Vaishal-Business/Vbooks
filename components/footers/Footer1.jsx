"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import { categories, pages, policies, quickLinks } from "@/data/footerLinks";
import { categoryLinks2 } from "@/data/menu";
import NewsLetterForm from "../common/NewsLetterForm";

export default function Footer1({
  parentClass = "tf-container tf-spacing-8 pt-0",
  type = 1,
}) {
  useEffect(() => {
    const headings = document.querySelectorAll(".footer-heading-mobile");

    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent.querySelector(".tf-collapse-content");

      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + 10 + "px";
      }
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []); // Empty dependency array means this will run only once on mount

  return (
    <div className={parentClass}>
      <footer
        className={`footer ${type == 2 ? "style-1" : ""} ${
          type == 3 ? "style-1" : ""
        }`}
      >
        <div className="footer-body">
          <div className="footer-about footer-item">
            <Link href={`/`} className="site-logo mb_20">
              <Image
                alt="logo"
                className="main-logo light-mode-logo"
                src="/images/logo/logo.svg"
                width={194}
                height={44}
              />
              <Image
                alt="logo"
                className="main-logo dark-mode-logo"
                src="/images/logo/logo-dark.svg"
                width={194}
                height={44}
              />
            </Link>
            <p className="text-caption-1 mb_28">
              Welcome to your go-to destination for insightful news! Discover
              carefully selected articles that inform, inspire.
            </p>
            <ul className="tf-social d-flex">
              <li>
                <a href="#" className="icon-FacebookLogo" />
              </li>
              <li>
                <a href="#" className="icon-XLogo" />
              </li>
              <li>
                <a href="#" className="icon-PinterestLogo" />
              </li>
              <li>
                <a href="#" className="icon-InstagramLogo" />
              </li>
            </ul>
          </div>
          <div className="footer-content footer-item">
            <div className="footer-col-block page-link">
              <h6 className="footer-heading footer-heading-mobile text_color-1 mb_16">
                Quick Link
              </h6>
              <div className="tf-collapse-content">
                <ul className="footer-menu-list d-grid gap_12">
                  {quickLinks.map((item, index) => (
                    <li className="text-caption-1" key={index}>
                      <Link
                        href={item.href} // dynamically generate `/aboutus`, `/contactus`, etc.
                        className="link"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="footer-col-block page-link">
              <h6 className="footer-heading footer-heading-mobile text_color-1 mb_16">
                Categories
              </h6>
              <div className="tf-collapse-content">
                <ul className="footer-menu-list d-grid gap_12">
                  {categoryLinks2.slice(0, 5).map(({ href, label, slug }) => (
                    <li className="text-caption-1" key={slug}>
                      <Link href={`${href}/${slug}`} className="link">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {!(type == 2) ? (
              <div className="footer-col-block page-link">
                <h6 className="footer-heading footer-heading-mobile text_color-1 mb_16">
                  Useful Links
                </h6>
                <div className="tf-collapse-content">
                  <ul className="footer-menu-list d-grid gap_12">
                    {pages.map((page, index) => (
                      <li className="text-caption-1" key={index}>
                        <a href="#" className="link">
                          {page.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {!(type == 3) ? (
            <div className="footer-newsletter footer-item">
              <h6 className="footer-title mb_20">
                Subscribe for all the top stories!
              </h6>
              <NewsLetterForm />
              <div className="box-fieldset-item d-flex">
                <fieldset className="d-flex gap_12">
                  <input type="checkbox" className="tf-check" id="note" />
                </fieldset>
                <p className="text-body-1">
                  By clicking the Subscribe button, you acknowledge that you
                  have read and agree to our{" "}
                  <a href="#" className="fw-7 text_on-surface-color">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="fw-7 text_on-surface-color">
                    Terms Of Use
                  </a>
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="footer-bottom d-flex align-items-center justify-content-between">
          <p className="text-caption-1">
            {new Date().getFullYear()} VBooks. All Rights Reserved.
          </p>
          <ul className="list d-flex">
            {policies.map((item, index) => (
              <li className="text-caption-1" key={index}>
                <a href="#" className="link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
