"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Pagination({ currentPage, pages = 3 }) {
  const totalPages = pages;
  const pathname = usePathname();
  const router = useRouter();

  const onPageChange = (numberPage) => {
    router.push(`${pathname}?page=${numberPage}`); // Navigate to /new-page
  };
  const handlePrev = () => {
    if (!(1 == currentPage)) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!(totalPages == currentPage)) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={currentPage == i ? "active" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }

    return pages;
  };

  return (
    <>
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePrev();
          }}
        >
          <i className="icon-CaretLeft" />
        </a>
      </li>

      {renderPageNumbers()}

      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          <i className="icon-CaretRight" />
        </a>
      </li>
    </>
  );
}
