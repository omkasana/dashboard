"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface Props {
  id: string | number;
  moduleId: string;
}

export default function ActionMenu({ id, moduleId }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /* ================= TOGGLE ================= */

  useEffect(() => {
    if (!open) return;

    const closeOnScroll = () => {
      setOpen(false);
    };

    window.addEventListener("scroll", closeOnScroll, true);

    return () => {
      window.removeEventListener("scroll", closeOnScroll, true);
    };
  }, [open]);

  const MENU_WIDTH = 180;
  const MENU_HEIGHT = 130;

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!btnRef.current) return;

    const rect = btnRef.current.getBoundingClientRect();

    let top = rect.bottom + 6;
    let left = rect.right - MENU_WIDTH;

    // OPEN ABOVE if not enough space below
    if (window.innerHeight - rect.bottom < MENU_HEIGHT) {
      top = rect.top - MENU_HEIGHT - 6;
    }

    // Prevent overflow right
    if (left + MENU_WIDTH > window.innerWidth) {
      left = window.innerWidth - MENU_WIDTH - 10;
    }

    // Prevent overflow left
    if (left < 10) {
      left = 10;
    }

    setCoords({ top, left });
    setOpen((prev) => !prev);
  };

  /* ================= CLOSE OUTSIDE ================= */

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  /* ================= ACTIONS ================= */

  const handleView = () => {
    router.push(`/dashboard/${moduleId}/view/${id}`);
  };

  const handleEdit = () => {
    router.push(`/dashboard/${moduleId}/update/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/${moduleId}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      // Optional: refresh page or trigger re-fetch
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete");
    }
  };

  /* ================= RENDER ================= */

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggle}
        className="p-2 rounded-xl hover:bg-white/5 transition"
      >
        <MoreVertical size={16} />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              width: 180,
            }}
            className="bg-background/95
                     backdrop-blur-xl
                     border border-border
                     rounded-2xl
                     shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                     p-2
                     z-[9999]
                     animate-in fade-in zoom-in-95 duration-150"
          >
            {/* View */}
            <button
              onClick={handleView}
              className="flex items-center w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-150
                       hover:bg-primary/10 hover:text-primary"
            >
              View
            </button>

            {/* Edit */}
            <button
              onClick={handleEdit}
              className="flex items-center w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-150
                       hover:bg-primary/10 hover:text-primary"
            >
              Edit
            </button>

            {/* Divider */}
            <div className="my-2 h-px bg-border" />

            {/* Delete */}
            <button
              onClick={handleDelete}
              className="flex items-center w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-150
                       text-rose-500 hover:bg-rose-500/10"
            >
              Delete
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
