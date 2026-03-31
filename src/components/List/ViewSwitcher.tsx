"use client";

import { useEffect, useRef, useState, useMemo, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import type { ViewType } from "@/types/module";
import {
  Table2,
  List,
  LayoutGrid,
  Columns,
  Calendar,
  BarChart3,
  GitBranch,
  Map,
  Image,
  MoreHorizontal,
} from "lucide-react";

const viewIcons: Record<ViewType, React.ReactNode> = {
  table: <Table2 size={16} />,
  list: <List size={16} />,
  grid: <LayoutGrid size={16} />,
  kanban: <Columns size={16} />,
  calendar: <Calendar size={16} />,
  analytics: <BarChart3 size={16} />,
  timeline: <GitBranch size={16} />,
  map: <Map size={16} />,
  gallery: <Image size={16} />,
};

interface Props {
  moduleId: string;
  currentView?: ViewType;
  availableViews: ViewType[];
  onViewChange: (view: ViewType) => void;
}

export function ViewSwitcher({
  moduleId,
  currentView,
  availableViews,
  onViewChange,
}: Props) {
  const DEFAULT_KEY = `crm-default-view-${moduleId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const [open, setOpen] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<DOMRect | null>(null);

  const MAX_VISIBLE = 4;

  /* ================= LOAD DEFAULT VIEW ================= */

  useEffect(() => {
    const saved = localStorage.getItem(DEFAULT_KEY);
    if (
      saved &&
      availableViews.includes(saved as ViewType) &&
      saved !== currentView
    ) {
      onViewChange(saved as ViewType);
    }
  }, []);

  const changeView = (view: ViewType) => {
    if (view === currentView) return;
    localStorage.setItem(DEFAULT_KEY, view);
    onViewChange(view);
    setOpen(false);
  };

  /* ================= MEMO PRIMARY / EXTRA ================= */

  const { primaryViews, extraViews } = useMemo(() => {
    const initialPrimary = availableViews.slice(0, MAX_VISIBLE);

    let primary = [...initialPrimary];
    let extra = availableViews.slice(MAX_VISIBLE);

    if (currentView && !primary.includes(currentView)) {
      primary = [...initialPrimary.slice(0, MAX_VISIBLE - 1), currentView];
      extra = availableViews.filter((v) => !primary.includes(v));
    }

    return { primaryViews: primary, extraViews: extra };
  }, [availableViews, currentView]);

  /* ================= INDICATOR ================= */

  const updateIndicator = () => {
    if (!containerRef.current || !currentView) return;

    const activeBtn = containerRef.current.querySelector(
      `[data-view="${currentView}"]`,
    ) as HTMLElement | null;

    if (!activeBtn) return;

    setIndicatorStyle({
      width: activeBtn.offsetWidth,
      left: activeBtn.offsetLeft,
    });
  };

  useLayoutEffect(() => {
    updateIndicator();
  }, [currentView, primaryViews]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [currentView, primaryViews]);

  /* ================= DROPDOWN POSITION ================= */

  useEffect(() => {
    if (open && dropdownRef.current) {
      setDropdownRect(dropdownRef.current.getBoundingClientRect());
    }
  }, [open]);

  /* ================= OUTSIDE CLICK ================= */

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;

      const insideTrigger = dropdownRef.current?.contains(target);

      const insidePortal = portalRef.current?.contains(target);

      if (!insideTrigger && !insidePortal) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  /* ================= ESC CLOSE ================= */

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  if (!availableViews.length) return null;

  return (
    <>
      {/* DESKTOP */}
      <div
        ref={containerRef}
        className="
          hidden sm:flex relative items-center
          bg-black/5 dark:bg-white/5
          backdrop-blur-md
          rounded-2xl
          p-1
          border border-white/10
          transition-all duration-300
        "
      >
        {/* Indicator */}
        <span
          style={indicatorStyle}
          className="
            absolute top-1 bottom-1 rounded-xl
            transition-all duration-300
            bg-primary/70
            backdrop-blur-2xl
            border border-primary/40
            shadow-[0_6px_30px_rgba(0,0,0,0.35)]
          "
        />

        {primaryViews.map((view) => {
          const active = currentView === view;

          return (
            <button
              key={view}
              data-view={view}
              onClick={() => changeView(view)}
              className={`relative z-10 flex items-center gap-2 px-4 h-9 text-sm font-medium rounded-xl transition-all duration-200 ${
                active
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {viewIcons[view]}
              <span className="hidden md:inline capitalize">{view}</span>
            </button>
          );
        })}

        {/* MORE BUTTON */}
        {extraViews.length > 0 && (
          <div className="relative ml-1" ref={dropdownRef}>
            <button
              onClick={() => setOpen((p) => !p)}
              className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-white/5 transition"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        )}
      </div>

      {/* PORTAL DROPDOWN */}
      {open &&
        dropdownRect &&
        createPortal(
          <div
            ref={portalRef}
            className="
              fixed
              bg-background/95 backdrop-blur-xl
              border border-border
              rounded-2xl
              shadow-[0_20px_60px_rgba(0,0,0,0.25)]
              z-[9999]
              p-2
              animate-in fade-in zoom-in-95 duration-150
            "
            style={{
              top: dropdownRect.bottom + 8,
              left: dropdownRect.right - 208,
              width: 208,
            }}
          >
            {extraViews.map((view) => (
              <button
                key={view}
                onClick={() => changeView(view)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm transition-all duration-150 ${
                  currentView === view
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {viewIcons[view]}
                <span className="capitalize">{view}</span>
              </button>
            ))}
          </div>,
          document.body,
        )}

      {/* MOBILE */}
      <div className="sm:hidden">
        <select
          value={currentView}
          onChange={(e) => changeView(e.target.value as ViewType)}
          className="w-full h-10 rounded-xl border border-border bg-background px-3 text-sm font-medium"
        >
          {availableViews.map((view) => (
            <option key={view} value={view}>
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
