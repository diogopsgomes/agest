"use client";

import React, { useEffect, useState } from "react";

import { toast } from "sonner";

import { generateQuotePDF } from "@/lib/api/quotes";

export default function QuoteFrame({ quoteId }: { quoteId: string }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    generateQuotePDF(quoteId)
      .then((res) => {
        const blob = new Blob(
          [Uint8Array.from(atob(res.data.buffer), (c) => c.charCodeAt(0))],
          { type: "application/pdf" }
        );
        const objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
        return () => {
          URL.revokeObjectURL(objectUrl);
        };
      })
      .catch((err) => toast.error(err.message));

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [quoteId]);

  return url ? (
    <iframe
      src={url}
      className="w-full xl:w-1/3 aspect-[210/297]"
    />
  ) : null;
}
