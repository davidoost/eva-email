import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { ReactNode } from "react";

interface EmailLayoutProps {
  previewText: string;
  children: ReactNode;
  logoUrl?: string;
  bodyBg?: string;
  debug?: Record<string, unknown>;
}

const EmailLayout = ({
  previewText,
  children,
  logoUrl,
  bodyBg,
  debug,
}: EmailLayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body
          className="m-auto font-sans"
          style={{ backgroundColor: bodyBg ?? "#f4f5f6" }}
        >
          <Container className="w-full mb-10 mx-auto p-5 max-w-lg">
            <Section className="mt-10">
              <Img
                src={
                  logoUrl ??
                  "https://github.com/davidoost/constants/blob/main/logos/eva-logo.png?raw=true"
                }
                height="32"
                alt="Logo"
                className="my-0 mx-auto"
              />
            </Section>

            <Section className="mt-10 rounded-2xl p-4 px-6 bg-white">
              {children}
            </Section>
            {debug && (
              <details className="bg-white p-4 rounded-2xl mt-4 max-w-lg">
                <summary className="text-sm cursor-pointer">Debug data</summary>
                <pre className="text-mono text-xs text-black/50 overflow-x-scroll max-w-md">
                  {JSON.stringify(debug, null, 2)}
                </pre>
              </details>
            )}
            <Text className="text-xs text-black/60 text-center">
              Powered by EVA
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailLayout;
