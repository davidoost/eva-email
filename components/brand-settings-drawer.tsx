"use client";

import { Button, Drawer, Input, Label, TextField, useOverlayState } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const COOKIE_KEY = "eva-brand-settings";

interface BrandSettings {
  logoUrl: string;
  brandName: string;
}

function loadSettings(): BrandSettings {
  if (typeof window === "undefined") return { logoUrl: "", brandName: "" };
  try {
    const match = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE_KEY}=`));
    return match ? JSON.parse(decodeURIComponent(match.split("=")[1])) : { logoUrl: "", brandName: "" };
  } catch {
    return { logoUrl: "", brandName: "" };
  }
}

function saveSettings(settings: BrandSettings) {
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify(settings))}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

function clearSettings() {
  document.cookie = `${COOKIE_KEY}=; path=/; max-age=0`;
}

export function BrandSettingsDrawer() {
  const state = useOverlayState();
  const router = useRouter();

  const [logoUrl, setLogoUrl] = useState("");
  const [brandName, setBrandName] = useState("");
  const [placement, setPlacement] = useState<"right" | "bottom">("right");

  useEffect(() => {
    const saved = loadSettings();
    setLogoUrl(saved.logoUrl ?? "");
    setBrandName(saved.brandName ?? "");

    const check = () => setPlacement(window.innerWidth < 640 ? "bottom" : "right");
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const save = () => {
    saveSettings({ logoUrl: logoUrl.trim(), brandName: brandName.trim() });
    state.close();
    router.refresh();
  };

  const reset = () => {
    clearSettings();
    setLogoUrl("");
    setBrandName("");
    state.close();
    router.refresh();
  };

  return (
    <>
      <Button variant="tertiary" isIconOnly onPress={state.open}>
        <Icon icon="gravity-ui:paintbrush" />
      </Button>

      <Drawer.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen}>
        <Drawer.Content placement={placement}>
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Brand Settings</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body className="flex flex-col gap-4">
              <TextField className="w-full" value={logoUrl} onChange={setLogoUrl}>
                <Label>Logo URL</Label>
                <Input placeholder="https://example.com/logo.png" variant="secondary" />
              </TextField>
              <TextField className="w-full" value={brandName} onChange={setBrandName}>
                <Label>Brand Name</Label>
                <Input placeholder="Acme Inc." variant="secondary" />
              </TextField>
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
