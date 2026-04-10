import { pretty, render } from "@react-email/render";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createHighlighter } from "shiki";
import EmailPreview from "@/components/email-preview";
import { templates } from "@/emails";
import { injectTemplateVars } from "@/lib/template-vars";
import Link from "next/link";
import { Icon } from "@iconify/react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TemplatePage(props: Props) {
  const { slug } = await props.params;
  const { logoUrl: qLogoUrl, brandName: qBrandName } = await props.searchParams;

  const template = templates.find((t) => t.slug === slug);
  if (!template) notFound();

  const jar = await cookies();
  const cookieSettings = JSON.parse(jar.get("eva-brand-settings")?.value ?? "{}");

  const resolvedLogoUrl =
    (typeof qLogoUrl === "string" ? qLogoUrl : cookieSettings.logoUrl) || undefined;
  const resolvedBrandName =
    (typeof qBrandName === "string" ? qBrandName : cookieSettings.brandName) || undefined;

  const rendered = await render(
    template.component({
      data: template.sampleData,
      logoUrl: resolvedLogoUrl,
      brandName: resolvedBrandName,
    }),
  );

  const html = await pretty(rendered);
  const templateHtml = injectTemplateVars(
    html,
    template.sampleData as unknown as Record<string, unknown>,
  );

  const highlighter = await createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["html"],
  });
  const highlightedHtmlLight = highlighter.codeToHtml(templateHtml, {
    lang: "html",
    theme: "github-light",
  });
  const highlightedHtmlDark = highlighter.codeToHtml(templateHtml, {
    lang: "html",
    theme: "github-dark",
  });

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-4 p-4">
      <div className="flex flex-col shrink-0">
        <Link
          href={`/templates`}
          className="flex gap-1 text-muted text-sm items-center"
        >
          <Icon icon={`gravity-ui:arrow-left`} />
          Back to overview
        </Link>
        <h1 className="text-4xl font-semibold">{template.name}</h1>
        <p className="text-muted">{template.description}</p>
      </div>

      <EmailPreview
        html={html}
        templateHtml={templateHtml}
        highlightedHtmlLight={highlightedHtmlLight}
        highlightedHtmlDark={highlightedHtmlDark}
      />
    </div>
  );
}
