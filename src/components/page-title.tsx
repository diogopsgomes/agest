"use client";

export default function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="text-2xl font-semibold leading-tight tracking-tight mb-8">
      {title}
    </h1>
  );
}
