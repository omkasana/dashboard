"use client";

import { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  LayoutGrid,
  Rows3,
  Columns2,
  PanelRight,
  User,
  MoreHorizontal,
  Download,
} from "lucide-react";
import ExportDialog from "@/components/List/ExportDialog";

/* ================================
   LAYOUT ICONS
================================ */
const layoutIcons: Record<string, React.ReactNode> = {
  profile: <User size={16} />,
  grid: <LayoutGrid size={16} />,
  cards: <Columns2 size={16} />,
  sidebar: <PanelRight size={16} />,
  compact: <Rows3 size={16} />,
};

/* ================================
   PROPS
================================ */
interface RecordToolbarProps {
  model: string;
  id: string;
  currentLayout: string;
  availableLayouts: string[];
  onLayoutChange: (layout: string) => void;
  onDelete?: () => void;
  data?: Record<string, unknown>;
}

/* ================================
   LAYOUT SWITCHER (mirrors ViewSwitcher)
================================ */
function LayoutSwitcher({
  currentLayout,
  availableLayouts,
  onLayoutChange,
}: {
  currentLayout: string;
  availableLayouts: string[];
  onLayoutChange: (layout: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const [open, setOpen] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<DOMRect | null>(null);

  const MAX_VISIBLE = 4;

  const { primaryLayouts, extraLayouts } = useMemo(() => {
    const initial = availableLayouts.slice(0, MAX_VISIBLE);
    let primary = [...initial];
    let extra = availableLayouts.slice(MAX_VISIBLE);

    if (currentLayout && !primary.includes(currentLayout)) {
      primary = [...initial.slice(0, MAX_VISIBLE - 1), currentLayout];
      extra = availableLayouts.filter((v) => !primary.includes(v));
    }

    return { primaryLayouts: primary, extraLayouts: extra };
  }, [availableLayouts, currentLayout]);

  /* Sliding indicator */
  const updateIndicator = () => {
    if (!containerRef.current || !currentLayout) return;
    const activeBtn = containerRef.current.querySelector(
      `[data-layout="${currentLayout}"]`,
    ) as HTMLElement | null;
    if (!activeBtn) return;
    setIndicatorStyle({
      width: activeBtn.offsetWidth,
      left: activeBtn.offsetLeft,
    });
  };

  useLayoutEffect(() => {
    updateIndicator();
  }, [currentLayout, primaryLayouts]);
  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [currentLayout, primaryLayouts]);

  /* Dropdown position */
  useEffect(() => {
    if (open && dropdownRef.current) {
      setDropdownRect(dropdownRef.current.getBoundingClientRect());
    }
  }, [open]);

  /* Outside click */
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        !dropdownRef.current?.contains(t) &&
        !portalRef.current?.contains(t)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  /* ESC */
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open]);

  return (
    <>
      {/* Desktop */}
      <div
        ref={containerRef}
        className="hidden sm:flex relative items-center rounded-2xl p-1 border border-white/10 transition-all duration-300"
        style={{ background: "var(--muted)" }}
      >
        {/* Sliding indicator */}
        <span
          className="absolute top-1 bottom-1 rounded-xl transition-all duration-300 border"
          style={{
            ...indicatorStyle,
            background: "color-mix(in srgb, var(--primary) 70%, transparent)",
            borderColor: "color-mix(in srgb, var(--primary) 40%, transparent)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        />

        {primaryLayouts.map((layout) => {
          const active = currentLayout === layout;
          return (
            <button
              key={layout}
              data-layout={layout}
              onClick={() => onLayoutChange(layout)}
              title={layout.charAt(0).toUpperCase() + layout.slice(1)}
              className="relative z-10 flex items-center gap-2 px-4 h-9 text-sm font-medium rounded-xl transition-all duration-200"
              style={{ color: active ? "#fff" : "var(--muted-foreground)" }}
            >
              {layoutIcons[layout] ?? <LayoutGrid size={16} />}
              <span className="hidden md:inline capitalize">{layout}</span>
            </button>
          );
        })}

        {/* More button */}
        {extraLayouts.length > 0 && (
          <div className="relative ml-1" ref={dropdownRef}>
            <button
              onClick={() => setOpen((p) => !p)}
              className="flex items-center justify-center w-9 h-9 rounded-xl transition"
              style={{ color: "var(--muted-foreground)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "color-mix(in srgb, var(--muted) 80%, transparent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Portal dropdown */}
      {open &&
        dropdownRect &&
        createPortal(
          <div
            ref={portalRef}
            className="fixed z-[9999] p-2 rounded-2xl border animate-in fade-in zoom-in-95 duration-150"
            style={{
              top: dropdownRect.bottom + 8,
              left: dropdownRect.right - 208,
              width: 208,
              background: "var(--background)",
              border: "1px solid var(--border)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            }}
          >
            {extraLayouts.map((layout) => (
              <button
                key={layout}
                onClick={() => {
                  onLayoutChange(layout);
                  setOpen(false);
                }}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm transition-all duration-150 capitalize"
                style={
                  currentLayout === layout
                    ? {
                        color: "var(--primary)",
                        background:
                          "color-mix(in srgb, var(--primary) 15%, transparent)",
                        border:
                          "1px solid color-mix(in srgb, var(--primary) 30%, transparent)",
                      }
                    : { color: "var(--foreground)" }
                }
                onMouseEnter={(e) => {
                  if (currentLayout !== layout)
                    e.currentTarget.style.background = "var(--muted)";
                }}
                onMouseLeave={(e) => {
                  if (currentLayout !== layout)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                {layoutIcons[layout] ?? <LayoutGrid size={16} />}
                {layout}
              </button>
            ))}
          </div>,
          document.body,
        )}

      {/* Mobile */}
      <div className="sm:hidden">
        <select
          value={currentLayout}
          onChange={(e) => onLayoutChange(e.target.value)}
          className="h-10 rounded-xl border px-3 text-sm font-medium"
          style={{
            background: "var(--background)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        >
          {availableLayouts.map((layout) => (
            <option key={layout} value={layout}>
              {layout.charAt(0).toUpperCase() + layout.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

/* ================================
   MAIN TOOLBAR
================================ */
export function RecordToolbar({
  model,
  id,
  currentLayout,
  availableLayouts,
  onLayoutChange,
  onDelete,
  data = {},
}: RecordToolbarProps) {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExport, setShowExport] = useState(false);

  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-3 sticky top-0 z-20 backdrop-blur-sm"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "color-mix(in srgb, var(--background) 85%, transparent)",
        }}
      >
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          <span
            className="cursor-pointer capitalize transition-colors hover:underline"
            onClick={() => router.push(`/dashboard/${model}/view`)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--foreground)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--muted-foreground)")
            }
          >
            {model}
          </span>
          <span>/</span>
          <span className="font-medium" style={{ color: "var(--foreground)" }}>
            #{id}
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Layout Switcher */}
          <LayoutSwitcher
            currentLayout={currentLayout}
            availableLayouts={availableLayouts}
            onLayoutChange={onLayoutChange}
          />

          <div style={{ width: 1, height: 20, background: "var(--border)" }} />

          {/* Actions — mirrors HeaderActions glass container */}
          <div
            className="flex items-center gap-1 p-1 rounded-2xl border border-white/10 transition-all duration-300"
            style={{ background: "var(--muted)" }}
          >
            {/* Export */}
            <button
              onClick={() => setShowExport(true)}
              className="flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-medium transition-all duration-200"
              style={{ color: "var(--muted-foreground)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--foreground)";
                e.currentTarget.style.background =
                  "color-mix(in srgb, var(--muted) 80%, transparent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted-foreground)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Download size={15} />
              <span className="hidden md:inline">Export</span>
            </button>

            {/* Edit */}
            <button
              onClick={() => router.push(`/dashboard/${model}/update/${id}`)}
              className="flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-medium transition-all duration-200"
              style={{ color: "var(--muted-foreground)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--foreground)";
                e.currentTarget.style.background =
                  "color-mix(in srgb, var(--muted) 80%, transparent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted-foreground)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <PencilSquareIcon className="w-4 h-4" />
              <span className="hidden md:inline">Edit</span>
            </button>

            {/* Delete */}
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  color: "var(--brand-danger)",
                  background:
                    "color-mix(in srgb, var(--brand-danger) 10%, transparent)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "color-mix(in srgb, var(--brand-danger) 18%, transparent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "color-mix(in srgb, var(--brand-danger) 10%, transparent)")
                }
              >
                <TrashIcon className="w-4 h-4" />
                <span className="hidden md:inline">Delete</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-2">
                <span
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Sure?
                </span>
                <button
                  onClick={() => {
                    onDelete?.();
                    setShowDeleteConfirm(false);
                  }}
                  className="px-3 py-1.5 text-xs rounded-lg transition-all"
                  style={{
                    color: "var(--brand-danger)",
                    background:
                      "color-mix(in srgb, var(--brand-danger) 15%, transparent)",
                    border:
                      "1px solid color-mix(in srgb, var(--brand-danger) 30%, transparent)",
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 text-xs rounded-lg transition-all"
                  style={{
                    color: "var(--muted-foreground)",
                    background: "var(--muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Dialog — reuses your existing component */}
      {showExport && (
        <ExportDialog
          data={[data]}
          filename={`${model}-${id}`}
          onClose={() => setShowExport(false)}
        />
      )}
    </>
  );
}
