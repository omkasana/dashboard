"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const { model } = useParams<{ model: string }>();

  return <div>{model}</div>;
}
