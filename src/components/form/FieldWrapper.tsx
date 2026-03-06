"use client";

import { Info } from "lucide-react";
import { useState, useRef } from "react";

interface Props {
  label?: string;
  required?: boolean;
  error?: string;
  info?: string;
  children: React.ReactNode;
}

export default function FieldWrapper({
  label,
  required,
  error,
  info,
  children,
}: Props) {
  const [show, setShow] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const open = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setShow(true);
  };

  const close = () => {
    timeout.current = setTimeout(() => {
      setShow(false);
    }, 180); // smooth delay
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground/80">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {info && (
            <div
              className="relative flex items-center"
              onMouseEnter={open}
              onMouseLeave={close}
            >
              <Info
                size={16}
                className="
                  text-muted-foreground
                  cursor-help
                  hover:text-primary
                  transition-colors
                "
              />

              {/* Tooltip */}
              <div
                className={`
                  absolute
                  left-1/2
                  bottom-full
                  -translate-x-1/2
                  mb-3
                  w-max
                  max-w-[260px]
                  transition-all
                  duration-200
                  ${
                    show
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-1 scale-95 pointer-events-none"
                  }
                `}
              >
                <div
                  className="
                  relative
                  rounded-2xl
                  border border-border/40
                  bg-background
                  backdrop-blur-xl
                  shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                  px-4 py-3
                  text-xs
                  text-muted-foreground
                "
                >
                  {info}

                  {/* Arrow */}
                  <div
                    className="
                    absolute
                    left-1/2
                    bottom-[-5px]
                    -translate-x-1/2
                    w-3 h-3
                    bg-background
                    rotate-45
                    shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                      
                    "
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {children}

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
