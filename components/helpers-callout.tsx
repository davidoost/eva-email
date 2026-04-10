"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import type { Helper } from "@/lib/helpers";

export function HelpersCallout({ helpers }: { helpers: Helper[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (name: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="shrink-0 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
        <Icon icon="gravity-ui:triangle-exclamation" className="shrink-0" />
        <span className="text-sm font-semibold">
          {helpers.length === 1 ? "1 helper required" : `${helpers.length} helpers required`}
        </span>
      </div>
      <p className="text-xs text-amber-700/80 dark:text-amber-400/80 -mt-1">
        This template uses custom helper functions. Add {helpers.length === 1 ? "it" : "them"} in the <strong>Helpers</strong> tab of the Stencil configuration in EVA Admin Suite before using this template.
      </p>
      <div className="flex flex-col gap-2">
        {helpers.map((h) => (
          <div key={h.name} className="rounded-md border border-amber-200 dark:border-amber-800 overflow-hidden">
            <div className="flex items-center justify-between gap-2 px-3 py-2 bg-amber-100/60 dark:bg-amber-900/40">
              <div>
                <span className="text-xs font-mono font-semibold text-amber-900 dark:text-amber-300">{h.name}</span>
                <span className="text-xs text-amber-700/70 dark:text-amber-400/70 ml-2">{h.description}</span>
              </div>
              <button
                onClick={() => copy(h.name, h.code)}
                className="shrink-0 flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 transition-colors"
              >
                <Icon icon={copied === h.name ? "gravity-ui:check" : "gravity-ui:copy"} />
                {copied === h.name ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="text-xs p-3 overflow-x-auto bg-white/60 dark:bg-black/20 text-amber-900 dark:text-amber-200 leading-relaxed m-0">{h.code}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
