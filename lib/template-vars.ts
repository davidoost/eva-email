function flattenObject(
  obj: Record<string, unknown>,
  prefix = "",
): Record<string, string> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (Array.isArray(value)) {
        value.forEach((item, i) => {
          if (item && typeof item === "object") {
            Object.assign(acc, flattenObject(item as Record<string, unknown>, `${path}.${i}`));
          } else if (typeof item === "string" && item.length >= 3) {
            acc[`${path}.${i}`] = item;
          }
        });
      } else if (value && typeof value === "object") {
        Object.assign(acc, flattenObject(value as Record<string, unknown>, path));
      } else if (typeof value === "string" && value.length >= 3) {
        acc[path] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
}

function makeBoundedPattern(value: string): RegExp {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pre = /\w/.test(value[0]) ? "\\b" : "(?<![\\w])";
  const post = /\w/.test(value[value.length - 1]) ? "\\b" : "(?![\\w])";
  return new RegExp(`${pre}${escaped}${post}`, "g");
}

export function injectTemplateVars(
  html: string,
  data: Record<string, unknown>,
): string {
  const flat = flattenObject(data);

  // Sort longest values first to avoid partial replacements
  const entries = Object.entries(flat).sort(([, a], [, b]) => b.length - a.length);

  let result = html;
  for (const [path, value] of entries) {
    result = result.replace(makeBoundedPattern(value), `{{>${path}}}`);
  }

  return result;
}

export { makeBoundedPattern };
