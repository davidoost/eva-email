"use client";

import { Button, Card, CardHeader, Tabs } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { BrandSettingsDrawer } from "./brand-settings-drawer";

type Tab = "preview" | "html";

export default function EmailPreview({
  html,
  templateHtml,
  highlightedHtmlLight,
  highlightedHtmlDark,
}: {
  html: string;
  templateHtml: string;
  highlightedHtmlLight: string;
  highlightedHtmlDark: string;
}) {
  const [tab, setTab] = useState<Tab>("preview");
  const [copying, setCopying] = useState(false);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(templateHtml);
    setCopying(true);
    setTimeout(() => setCopying(false), 1500);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-2">
      <div className="flex justify-between items-center shrink-0">
        <Tabs selectedKey={tab} onSelectionChange={(v) => setTab(v as Tab)}>
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options">
              <Tabs.Tab id="preview" className="gap-2">
                <Icon icon={`gravity-ui:magnifier`} />
                Preview
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="html" className="gap-2">
                <Icon icon={`gravity-ui:code`} />
                HTML
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
        <div className="flex gap-2">
          <Button variant="tertiary" onPress={copyHtml}>
            <Icon icon={copying ? `gravity-ui:check` : `gravity-ui:copy`} />
            {copying ? "Copied!" : "Copy HTML"}
          </Button>
          <BrandSettingsDrawer />
        </div>
      </div>
      <Card className="flex-1 min-h-0 p-0 gap-0 border overflow-hidden">
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
