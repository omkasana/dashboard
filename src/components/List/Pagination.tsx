"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-xl
                   bg-background/90 backdrop-blur-xl border border-border
                   hover:bg-primary/10 disabled:opacity-40 transition"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Pages */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        const active = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 text-sm font-medium rounded-xl transition-all duration-200
              ${
                active
                  ? "bg-primary/70 text-white border border-primary/40 shadow-md"
                  : "bg-background/90 backdrop-blur-xl border border-border hover:bg-primary/10"
              }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-xl
                   bg-background/90 backdrop-blur-xl border border-border
                   hover:bg-primary/10 disabled:opacity-40 transition"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
