"use client";

import { Drawer, useOverlayState } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";
import type { HighlightedHelper } from "@/lib/helpers";

export function HelpersDrawer({ helpers, triggerRef }: { helpers: HighlightedHelper[]; triggerRef?: React.RefObject<(() => void) | null> }) {
  const state = useOverlayState();
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState<string | null>(null);

  if (triggerRef) triggerRef.current = state.open;

  const copy = async (name: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <Drawer.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Drawer.Content placement={isMobile ? "bottom" : "right"}>
        <Drawer.Dialog>
          <Drawer.CloseTrigger />
          <Drawer.Header>
            <Drawer.Heading>Required Helpers</Drawer.Heading>
          </Drawer.Header>
          <Drawer.Body className="flex flex-col gap-6">
            <p className="text-sm text-muted leading-relaxed">
              Add {helpers.length === 1 ? "this helper" : "these helpers"} in the <strong className="text-foreground font-medium">Helpers</strong> tab of the Stencil configuration in EVA Admin Suite before using this template.
            </p>
            {helpers.map((h) => (
              <div key={h.name} className="flex flex-col gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold font-mono">{h.name}</span>
                  <span className="text-xs text-muted leading-relaxed">{h.description}</span>
                </div>
                <div className="rounded-lg border border-default overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-default bg-default/30">
                    <span className="text-xs text-muted font-mono">javascript</span>
                    <button
                      onClick={() => copy(h.name, h.code)}
                      className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
                    >
                      <Icon icon={copied === h.name ? "gravity-ui:check" : "gravity-ui:copy"} />
                      {copied === h.name ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div
                    className="text-xs p-3 overflow-x-auto dark:hidden [&_.shiki]:bg-transparent! [&_code]:text-xs [&_code]:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: h.highlightedLight }}
                  />
                  <div
                    className="text-xs p-3 overflow-x-auto hidden dark:block [&_.shiki]:bg-transparent! [&_code]:text-xs [&_code]:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: h.highlightedDark }}
                  />
                </div>
              </div>
            ))}
          </Drawer.Body>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  );
}
