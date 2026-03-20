"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { deleteModel } from "@/lib/api";

interface Props {
  id: string;
  module?: string;
  onDelete?: (id: string) => void; // ✅ added
}

export default function ActionMenu({ id, module, onDelete }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const MENU_WIDTH = 180;
  const MENU_HEIGHT = 130;

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!btnRef.current) return;

    const rect = btnRef.current.getBoundingClientRect();

    let top = rect.bottom + 6;
    let left = rect.right - MENU_WIDTH;

    if (window.innerHeight - rect.bottom < MENU_HEIGHT) {
      top = rect.top - MENU_HEIGHT - 6;
    }

    setCoords({ top, left });
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

  const handleView = () => {
    if (!module) return;
    router.push(`/dashboard/${module}/view/${id}`);
  };

  const handleEdit = () => {
    if (!module) return;
    router.push(`/dashboard/${module}/update/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      if (module == "models") deleteModel(id); // ✅ special case for models

      onDelete?.(id); // ✅ instant UI update

      router.refresh(); // fallback
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      {" "}
      <button
        ref={btnRef}
        onClick={toggle}
        className="p-2 rounded-xl hover:bg-white/5 transition"
      >
        {" "}
        <MoreVertical size={16} />{" "}
      </button>{" "}
      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              width: MENU_WIDTH,
            }}
            className=" bg-background border border-border rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-2 z-9999 animate-in fade-in zoom-in-95 duration-150 "
          >
            {" "}
            {/* VIEW */}{" "}
            <button
              onClick={handleView}
              className=" flex items-center w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-primary/10 hover:text-primary "
            >
              {" "}
              View{" "}
            </button>{" "}
            {/* EDIT */}{" "}
            <button
              onClick={handleEdit}
              className=" flex items-center w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-primary/10 hover:text-primary "
            >
              {" "}
              Edit{" "}
            </button>{" "}
            {/* DELETE */} <div className="my-2 h-px bg-border" />{" "}
            <button
              onClick={handleDelete}
              className=" flex items-center w-full text-left px-3 py-2 rounded-xl text-sm text-rose-500 hover:bg-rose-500/10 "
            >
              {" "}
              Delete{" "}
            </button>{" "}
          </div>,
          document.body,
        )}{" "}
    </>
  );
}
