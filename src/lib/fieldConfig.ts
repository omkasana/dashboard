// ─── Change these to restyle ALL form fields at once ─────────────────────────

export const fieldConfig = {
  // Validation states
  valid: {
    border: "border-green-500/60", // ring around input
    icon: "text-green-600 dark:text-green-400",
    badge: "text-green-600 dark:text-green-400",
  },
  invalid: {
    border: "border-destructive/60",
    icon: "text-destructive",
    badge: "text-destructive",
  },
  error: {
    border: "border-destructive/70",
  },

  // Input container states
  idle: "border-border hover:border-border/80",
  focus:
    "border-input shadow-[0_0_0_3px_color-mix(in_oklch,var(--ring)_30%,transparent)]",

  // Container base
  base: "bg-background/60 backdrop-blur-xl shadow-sm border",

  // Prefix icon
  prefixIdle: "text-muted-foreground/40",
  prefixFocused: "text-muted-foreground",

  // Divider
  divider: "bg-border",

  // Input text
  inputText: "text-foreground",
  inputPlaceholder: "placeholder:text-muted-foreground/60",

  // Strength bar track (PasswordField)
  strengthTrack: "bg-muted",

  // Password strength levels
  strength: {
    weak: { bar: "bg-destructive", text: "text-destructive" },
    fair: { bar: "bg-amber-400", text: "text-amber-600 dark:text-amber-400" },
    good: {
      bar: "bg-yellow-400",
      text: "text-yellow-600 dark:text-yellow-400",
    },
    strong: { bar: "bg-green-500", text: "text-green-600 dark:text-green-400" },
  },

  // Rule chips (PasswordField)
  ruleActive: "text-green-600 dark:text-green-400",
  ruleDot: "bg-green-500 dark:bg-green-400",
  ruleInactive: "text-muted-foreground/50",
  ruleDotOff: "bg-muted-foreground/30",

  // CapsLock badge
  capsLock: {
    bg: "bg-amber-50 dark:bg-amber-400/10",
    border: "border border-amber-400/40",
    text: "text-amber-600 dark:text-amber-300",
  },

  // Select dropdown
  dropdown: {
    bg: "bg-popover",
    border: "border-border",
    optionHover: "hover:bg-muted",
    optionHL: "bg-muted",
    optionActive: "text-foreground font-medium",
    optionIdle: "text-muted-foreground",
    check: "text-primary",
    tagBg: "bg-secondary border border-border text-secondary-foreground",
    tagRemove: "text-muted-foreground hover:text-foreground",
    footer: "border-t border-border",
    footerText: "text-muted-foreground",
    searchBg: "bg-muted border border-border",
    emptyText: "text-muted-foreground",
    clearBtn: "text-muted-foreground hover:text-foreground",
  },

  // Stepper buttons (NumberField)
  stepper: {
    icon: "text-muted-foreground/40 hover:text-foreground",
    divider: "divide-border",
  },

  // Character counter (TextField)
  counter: {
    normal: "text-muted-foreground",
    warning: "text-amber-600 dark:text-amber-400",
    limit: "text-destructive",
  },
} as const;
