"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { createPortal } from "react-dom";

export default function ActionMenu() {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top + window.scrollY,
      left: rect.right - 160,
    });
    setOpen((prev) => !prev);
  };

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

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggle}
        className="p-2 rounded-md hover:bg-muted"
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
              width: 160,
            }}
            className="bg-background border border-border rounded-lg shadow-xl p-2 z-[9999]"
          >
            <button className="block w-full text-left px-3 py-2 hover:bg-muted rounded-md">
              View
            </button>
            <button className="block w-full text-left px-3 py-2 hover:bg-muted rounded-md">
              Edit
            </button>
            <button className="block w-full text-left px-3 py-2 text-rose-600 hover:bg-muted rounded-md">
              Delete
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
