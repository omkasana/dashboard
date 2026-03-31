interface Props {
  field: string;
  data: any;
}

export default function ViewField({ field, data }: Props) {
  const value = data[field];

  return (
    <div className="space-y-1">
      <p className="text-xs opacity-60 capitalize">{field}</p>

      <p className="font-medium">{value ?? "-"}</p>
    </div>
  );
}
