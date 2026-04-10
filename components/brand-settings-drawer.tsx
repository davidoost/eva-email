"use client";

import {
  Button,
  ColorField,
  ColorSwatch,
  Drawer,
  Input,
  Label,
  TextField,
  parseColor,
  useOverlayState,
} from "@heroui/react";
import type { Color } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";

const COOKIE_KEY = "eva-brand-settings";

const DEFAULTS = {
  logoUrl:
    "https://github.com/davidoost/constants/blob/main/logos/eva-logo.png?raw=true",
  brandName: "EVA",
  accentColor: "#0485F7",
};

interface BrandSettings {
  logoUrl: string;
  brandName: string;
  accentColor: string;
}

function loadSettings(): BrandSettings {
  if (typeof window === "undefined") return { ...DEFAULTS };
  try {
    const match = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${COOKIE_KEY}=`));
    return match
      ? { ...DEFAULTS, ...JSON.parse(decodeURIComponent(match.split("=")[1])) }
      : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

function saveSettings(settings: BrandSettings) {
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify(settings))}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

export function BrandSettingsDrawer() {
  const state = useOverlayState();
  const router = useRouter();

  const [logoUrl, setLogoUrl] = useState(DEFAULTS.logoUrl);
  const [brandName, setBrandName] = useState(DEFAULTS.brandName);
  const [accentColor, setAccentColor] = useState<Color | null>(
    parseColor(DEFAULTS.accentColor),
  );
  const isMobile = useIsMobile();

  useEffect(() => {
    const saved = loadSettings();
    setLogoUrl(saved.logoUrl ?? "");
    setBrandName(saved.brandName ?? "");
    if (saved.accentColor) {
      try {
        setAccentColor(parseColor(saved.accentColor));
      } catch {
        // ignore invalid saved color
      }
    }
  }, []);

  const save = () => {
    const hex = accentColor ? accentColor.toString("hex") : "";
    saveSettings({
      logoUrl: logoUrl.trim(),
      brandName: brandName.trim(),
      accentColor: hex,
    });
    state.close();
    router.refresh();
  };

  const reset = () => {
    saveSettings({ ...DEFAULTS });
    setLogoUrl(DEFAULTS.logoUrl);
    setBrandName(DEFAULTS.brandName);
    setAccentColor(parseColor(DEFAULTS.accentColor));
    state.close();
    router.refresh();
  };

  return (
    <>
      <Button variant="tertiary" isIconOnly onPress={state.open}>
        <Icon icon="gravity-ui:paintbrush" />
      </Button>

      <Drawer.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen}>
        <Drawer.Content placement={isMobile ? "bottom" : "right"}>
          <Drawer.Dialog className={isMobile ? "max-h-[70dvh]" : ""}>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Brand Settings</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body className="flex flex-col gap-4">
              <TextField
                className="w-full"
                value={logoUrl}
                onChange={setLogoUrl}
              >
                <Label>Logo URL</Label>
                <Input
                  placeholder="https://example.com/logo.png"
                  variant="secondary"
                />
              </TextField>
              <TextField
                className="w-full"
                value={brandName}
                onChange={setBrandName}
              >
                <Label>Brand Name</Label>
                <Input placeholder="Acme Inc." variant="secondary" />
              </TextField>
              <ColorField
                className="w-full"
                value={accentColor}
                onChange={setAccentColor}
              >
                <Label>Accent Color</Label>
                <ColorField.Group variant="secondary">
                  <ColorField.Prefix>
                    <ColorSwatch color={accentColor ?? undefined} size="xs" />
                  </ColorField.Prefix>
                  <ColorField.Input />
                </ColorField.Group>
              </ColorField>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="tertiary" onPress={reset}>
                Reset
              </Button>
              <Button onPress={save}>Apply</Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </>
  );
}
