import { pretty, render } from "@react-email/render";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createHighlighter } from "shiki";
import EmailPreview from "@/components/email-preview";
import { templates } from "@/emails";
import { getHelpers, type HighlightedHelper } from "@/lib/helpers";
import { injectTemplateVars, makeBoundedPattern } from "@/lib/template-vars";
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

  // varReplacements must run before injectTemplateVars — they match raw rendered
  // values (e.g. "€264.00") before those values get split by other substitutions
  let templateHtml = html;
  if (template.varReplacements) {
    for (const [from, to] of Object.entries(template.varReplacements(template.sampleData))) {
      templateHtml = templateHtml.replace(makeBoundedPattern(from), to);
    }
  }
  templateHtml = injectTemplateVars(
    templateHtml,
    template.sampleData as unknown as Record<string, unknown>,
  );

  // Replace EVA conditional markers with {{if}}...{{/if}} syntax
  templateHtml = templateHtml
    .replace(/<div>\s*<!--EVA_IF:(.*?)-->\s*<\/div>/g, "{{if $1}}")
    .replace(/<div>\s*<!--\/EVA_IF-->\s*<\/div>/g, "{{/if}}");

  // Strip preview-only extra items (items 1+) that are outside the loop body
  templateHtml = templateHtml.replace(
    /<div>\s*<!--EVA_FOR_PREVIEW-->\s*<\/div>[\s\S]*?<div>\s*<!--\/EVA_FOR_PREVIEW-->\s*<\/div>/g,
    ""
  );

  // Replace EVA for-loop markers with {{for}}...{{/for}} syntax.
  // Inside the loop body, strip the array path prefix from variable references
  // so e.g. {{>Order.Lines.0.Description}} becomes {{>Description}}.
  const loopReplacements = template.loopVarReplacements?.(template.sampleData) ?? {};
  templateHtml = templateHtml.replace(
    /<div>\s*<!--EVA_FOR:(.*?)-->\s*<\/div>([\s\S]*?)<div>\s*<!--\/EVA_FOR-->\s*<\/div>/g,
    (_, expr, body) => {
      // Strip array path prefix + index from var refs (e.g. Order.Lines.0.Description → Description)
      const arrayPath = expr.replace(/\./g, "\\.");
      let stripped = body.replace(
        new RegExp(`\\{\\{>(${arrayPath}\\.\\d+\\.)`, "g"),
        "{{>"
      );
      // Apply loop-specific value replacements (numbers, formatted values)
      const perLoop = loopReplacements[expr] ?? {};
      for (const [from, to] of Object.entries(perLoop)) {
        stripped = stripped.replace(makeBoundedPattern(from), to);
      }
      return `{{for ${expr}}}\n${stripped}\n{{/for}}`;
    }
  );

  const highlighter = await createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["html", "javascript"],
  });
  const highlightedHtmlLight = highlighter.codeToHtml(templateHtml, {
    lang: "html",
    theme: "github-light",
  });
  const highlightedHtmlDark = highlighter.codeToHtml(templateHtml, {
    lang: "html",
    theme: "github-dark",
  });

  const highlightedHelpers: HighlightedHelper[] = (template.helpers ? getHelpers(template.helpers) : []).map((h) => ({
    ...h,
    highlightedLight: highlighter.codeToHtml(h.code, { lang: "javascript", theme: "github-light" }),
    highlightedDark: highlighter.codeToHtml(h.code, { lang: "javascript", theme: "github-dark" }),
  }));

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
        helpers={highlightedHelpers}
      />
    </div>
  );
}
