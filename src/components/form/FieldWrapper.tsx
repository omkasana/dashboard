export default function FieldWrapper({ label, children }: any) {
  return (
    <div className="flex flex-col gap-2 group">
      <label
        className="
        text-sm
        font-medium
        text-foreground/80
        group-focus-within:text-primary
        transition-colors
        "
      >
        {label}
      </label>

      {children}
    </div>
  );
}
