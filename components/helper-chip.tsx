"use client";

import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import type { Helper } from "@/lib/helpers";

export function HelperChip({ helper }: { helper: Helper }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const copy = async () => {
    await navigator.clipboard.writeText(helper.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-xs text-muted border border-default rounded-full px-2.5 py-0.5 hover:text-foreground hover:border-foreground/30 transition-colors"
      >
        <Icon icon="gravity-ui:function" className="text-[11px]" />
        {helper.name}
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 w-80 rounded-lg border border-default bg-background shadow-lg overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-default">
            <div className="flex flex-col">
              <span className="text-xs font-semibold font-mono">{helper.name}</span>
              <span className="text-xs text-muted">{helper.description}</span>
            </div>
            <button
              onClick={copy}
              className="shrink-0 flex items-center gap-1 text-xs text-muted hover:text-foreground transition-colors"
            >
              <Icon icon={copied ? "gravity-ui:check" : "gravity-ui:copy"} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="text-xs p-3 overflow-x-auto leading-relaxed m-0 text-foreground/80">{helper.code}</pre>
        </div>
      )}
    </div>
  );
}
