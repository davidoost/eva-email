const steps = [
  {
    number: "1",
    title: "Set your brand",
    description:
      "Open any template and click the paintbrush icon. Enter your logo URL and brand name — the preview updates instantly.",
  },
  {
    number: "2",
    title: "Copy the HTML",
    description:
      'Switch to the HTML tab and hit "Copy HTML". The output uses template variables like {{>User.FirstName}} that EVA replaces at send time.',
  },
  {
    number: "3",
    title: "Paste into EVA",
    description:
      "In the EVA Admin Suite, go to the Stencil chapter and paste the HTML into the matching template slot. Done.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 px-4 py-12 max-w-2xl mx-auto w-full">
      {/* Hero */}
      <div
        className="flex flex-col gap-4 animate-fade-in-up opacity-0"
        style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
      >
        <h1 className="text-4xl font-semibold tracking-tight">
          EVA Email Templates
        </h1>
        <p className="text-muted text-lg leading-relaxed">
          Production-ready transactional email templates for EVA. Personalise
          with your logo and brand name, then copy the HTML straight into the
          Stencil chapter in Admin Suite.
        </p>
      </div>

      {/* How it works */}
      <div
        className="flex flex-col gap-6 animate-fade-in-up opacity-0"
        style={{ animationDelay: "60ms", animationFillMode: "forwards" }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
          How it works
        </h2>
        <div className="flex flex-col gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex gap-4 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${(i + 2) * 60}ms`, animationFillMode: "forwards" }}
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-default text-xs font-semibold text-muted">
                {step.number}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">{step.title}</span>
                <span className="text-sm text-muted leading-relaxed">
                  {step.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
