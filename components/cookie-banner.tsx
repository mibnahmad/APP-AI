"use client";

import { useState } from "react";
import { useEffect } from "react";

export function CookieBanner() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setAccepted(window.localStorage.getItem("lumea-cookie-consent") === "accepted");
  }, []);

  if (accepted) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-40 w-[min(840px,92%)] -translate-x-1/2 rounded-2xl border border-black/10 bg-white p-4 shadow-xl">
      <p className="text-sm text-[#777777]">
        We use cookies to elevate your browsing experience and deliver tailored recommendations.
      </p>
      <button
        onClick={() => {
          window.localStorage.setItem("lumea-cookie-consent", "accepted");
          setAccepted(true);
        }}
        className="mt-3 rounded-full bg-[#111111] px-4 py-2 text-xs text-white"
      >
        Accept
      </button>
    </div>
  );
}
