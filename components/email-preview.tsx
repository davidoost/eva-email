"use client";

import { Badge, Button, Card, CardHeader, Tabs } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { BrandSettingsDrawer } from "./brand-settings-drawer";
import { HelpersDrawer } from "./helpers-drawer";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";
import type { HighlightedHelper } from "@/lib/helpers";

type Tab = "preview" | "html";

export default function EmailPreview({
  html,
  templateHtml,
  highlightedHtmlLight,
  highlightedHtmlDark,
  helpers = [],
  bodyBg = "#f4f5f6",
}: {
  html: string;
  templateHtml: string;
  highlightedHtmlLight: string;
  highlightedHtmlDark: string;
  helpers?: HighlightedHelper[];
  bodyBg?: string;
}) {
  const [tab, setTab] = useState<Tab>("preview");
  const [copying, setCopying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => setMounted(true), []);
  const openHelpers = useRef<(() => void) | null>(null);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(templateHtml);
    setCopying(true);
    setTimeout(() => setCopying(false), 1500);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-2">
      <div className="flex justify-between items-center shrink-0">
        <Tabs key={mounted ? "mounted" : "unmounted"} selectedKey={tab} onSelectionChange={(v) => setTab(v as Tab)}>
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options">
              <Tabs.Tab id="preview" className="gap-2">
                <Icon icon={`gravity-ui:magnifier`} />
                <span className="hidden sm:inline">Preview</span>
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="html" className="gap-2">
                <Icon icon={`gravity-ui:code`} />
                <span className="hidden sm:inline">HTML</span>
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
        <div className="flex gap-2">
          <Button
            variant="tertiary"
            onPress={copyHtml}
            isIconOnly={isMobile}
            aria-label="Copy HTML"
          >
            <Icon icon={copying ? `gravity-ui:check` : `gravity-ui:copy`} />
            {!isMobile && (copying ? "Copied!" : "Copy HTML")}
          </Button>

          {helpers.length > 0 && (
            <Badge.Anchor>
              <Button
                variant="tertiary"
                isIconOnly
                onPress={() => openHelpers.current?.()}
                aria-label="Required helpers"
              >
                <Icon icon="gravity-ui:function" />
              </Button>
              <Badge size="sm" color="warning">
                {helpers.length}
              </Badge>
            </Badge.Anchor>
          )}

          <BrandSettingsDrawer />
          <HelpersDrawer helpers={helpers} triggerRef={openHelpers} />
        </div>
      </div>
      <Card className="flex-1 min-h-0 p-0 gap-0 border overflow-hidden" style={{ backgroundColor: bodyBg }}>
        <Card.Content className="overflow-auto h-full p-0">
          {tab === "preview" ? (
            <iframe
              srcDoc={html}
              title="Email preview"
              className="w-full h-full border-0"
              sandbox="allow-same-origin"
            />
          ) : (
            <>
              <div
                className="p-4 text-xs dark:hidden [&_.shiki]:bg-transparent! [&_code]:text-xs [&_code]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightedHtmlLight }}
              />
              <div
                className="p-4 text-xs hidden dark:block [&_.shiki]:bg-transparent! [&_code]:text-xs [&_code]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightedHtmlDark }}
              />
            </>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}
