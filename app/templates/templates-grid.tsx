"use client";

import { Badge, Chip, SearchField } from "@heroui/react";
import Link from "next/link";
import { Card } from "@heroui/react";
import { useState } from "react";
import { templates } from "@/emails";

export function TemplatesGrid() {
  const [query, setQuery] = useState("");

  const filtered = templates
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((t) => {
      const q = query.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.sampleData.TemplateName.toLowerCase().includes(q)
      );
    });

  return (
    <div className="flex flex-col gap-6">
      <div
        className="flex items-end justify-between gap-4 animate-fade-in-up opacity-0"
        style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
      >
        <div>
          <h1 className="text-2xl font-semibold">Templates</h1>
          <p className="text-sm text-muted mt-1">
            {templates.length} template{templates.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>

        <SearchField
          name="search"
          value={query}
          onChange={setQuery}
          className={`flex-1 min-w-32 max-w-64`}
        >
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {filtered.map((template, i) => (
            <Link
              key={template.name}
              href={`/templates/${template.slug}`}
              className="animate-fade-in-up opacity-0"
              style={{
                animationDelay: `${(i + 1) * 40}ms`,
                animationFillMode: "forwards",
              }}
            >
              <Card className="ring-0 hover:ring-2 ring-accent">
                <Card.Header>
                  <div className="flex items-center justify-between">
                    <Card.Title className="line-clamp-1">
                      {template.name}
                    </Card.Title>
                    {template.isNew && (
                      <Chip color="accent" variant="soft" size="sm">
                        New
                      </Chip>
                    )}
                  </div>
                  {template.description && (
                    <Card.Description className="line-clamp-2">
                      {template.description}
                    </Card.Description>
                  )}
                </Card.Header>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">No templates match "{query}".</p>
      )}
    </div>
  );
}
