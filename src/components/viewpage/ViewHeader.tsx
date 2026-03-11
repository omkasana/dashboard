"use client";

import Link from "next/link";
import { Button } from "@/components/UI/button";

interface Props {
  model: string;
  id: string;
}

export default function ViewHeader({ model, id }: Props) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-semibold capitalize">{model} Details</h1>

      <div className="flex gap-2">
        <Link href={`/dashboard/${model}/update/${id}`}>
          <Button>Edit</Button>
        </Link>

        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  );
}
