"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: Props) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const pages = [];

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* LEFT: Info + Page Size */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">

        <span>
          Showing <strong>{startItem}</strong>–
          <strong>{endItem}</strong> of{" "}
          <strong>{totalItems}</strong>
        </span>

        <div className="flex items-center gap-2">
          <span>Rows:</span>
          <select
            value={pageSize}
            onChange={(e) =>
              onPageSizeChange(Number(e.target.value))
            }
            className="
              h-9 px-3 rounded-xl
              bg-background/90 backdrop-blur-xl
              border border-border
              text-sm
              focus:outline-none focus:ring-2 focus:ring-primary/40
            "
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RIGHT: Navigation */}
      <div className="flex items-center gap-2">

        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            w-9 h-9 flex items-center justify-center
            rounded-xl
            bg-background/90 backdrop-blur-xl
            border border-border
            hover:bg-primary/10
            disabled:opacity-40
            transition
          "
        >
          <ChevronLeft size={16} />
        </button>

        {/* First */}
        {visiblePages[0] > 1 && (
          <>
            <PageButton
              page={1}
              active={currentPage === 1}
              onClick={onPageChange}
            />
            {visiblePages[0] > 2 && (
              <span className="px-2 text-muted-foreground">…</span>
            )}
          </>
        )}

        {/* Visible Pages */}
        {visiblePages.map((page) => (
          <PageButton
            key={page}
            page={page}
            active={page === currentPage}
            onClick={onPageChange}
          />
        ))}

        {/* Last */}
        {visiblePages[visiblePages.length - 1] <
          totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] <
                totalPages - 1 && (
                  <span className="px-2 text-muted-foreground">
                    …
                  </span>
                )}
              <PageButton
                page={totalPages}
                active={currentPage === totalPages}
                onClick={onPageChange}
              />
            </>
          )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            w-9 h-9 flex items-center justify-center
            rounded-xl
            bg-background/90 backdrop-blur-xl
            border border-border
            hover:bg-primary/10
            disabled:opacity-40
            transition
          "
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function PageButton({
  page,
  active,
  onClick,
}: {
  page: number;
  active: boolean;
  onClick: (page: number) => void;
}) {
  return (
    <button
      onClick={() => onClick(page)}
      className={`
        w-9 h-9 text-sm font-medium rounded-xl transition-all duration-200
        ${active
          ? "bg-primary/70 text-white border border-primary/40 shadow-md"
          : "bg-background/90 backdrop-blur-xl border border-border hover:bg-primary/10"
        }
      `}
    >
      {page}
    </button>
  );
}