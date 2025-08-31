"use client";
import Link from "next/link";

import { postItems, posts } from "@/data/blogs";
import React from "react";
import { tags } from "@/data/blogCategories";
import BlogCard1 from "../blog-cards/BlogCard1";
import { categoryLinks2 } from "@/data/menu";

export default function BlogSidebar() {
  return (
    <div className="sidebar">
      <form
        action="#"
        className="form-search style-1"
        onSubmit={(e) => e.preventDefault()}
      >
        <fieldset className="input-search">
          <input
            type="text"
            name="search"
            id="search-2"
            placeholder="Searching...."
          />
        </fieldset>
        <div className="btn-submit">
          <button
            type="submit"
            className="btn-icon black-on-dark animate-hover-btn"
          >
            <i className="icon-search" />
          </button>
        </div>
      </form>
      <div className="sidebar__item">
        <h5 className="sidebar__title">Categories</h5>
        <ul className="sidebar-categories">
          {categoryLinks2.map(({ href, label, slug }) => (
            <li
              key={label}
              className="item d-flex align-items-center justify-content-between"
            >
              <Link
                className="fw-7 text-body-1 text_on-surface-color"
                href={`${href}/${slug}`}
              >
                {label}
              </Link>
              <span className="number">
                {posts.filter((el) => el.category == label).length}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar__item">
        <h5 className="sidebar__title">Relatest Post</h5>
        <div className="wrap-post">
          {postItems.map((post, index) => (
            <BlogCard1 post={post} key={index} />
          ))}
        </div>
      </div>
      <div className="sidebar__item">
        <div className="text-body-3 sidebar__title fw-7 text_on-surface-color">
          Popular Tag
        </div>
        <ul className="list d-flex flex-wrap gap_11">
          {tags.map((tag, index) => (
            <li key={index} className="tag text-caption-1">
              <Link href={`/categories-1`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
