"use client";

import React, { useEffect, useState } from "react";

import { toast } from "sonner";

import { generateQuoteDocument } from "@/lib/api/quotes";
import { object } from "zod";

export default function QuoteFrame({ quoteId }: { quoteId: string }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    generateQuoteDocument(quoteId)
      .then((res) => {
        const blob = new Blob(
          [Uint8Array.from(atob(res.data.base64), (c) => c.charCodeAt(0))],
          { type: "application/pdf" }
        );
        objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
      })
      .catch((err) => toast.error(err.message));

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
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
