import { MagicLinkDataModel } from "@/lib/types";
import { Button, Heading, Hr, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";

interface MagicLinkEmailProps {
  data: MagicLinkDataModel;
  logoUrl?: string;
  brandName?: string;
}

export default function MagicLinkEmail({
  data,
  logoUrl,
  brandName = "EVA",
}: MagicLinkEmailProps) {
  const { FirstName, Url, ManualCode } = data;

  return (
    <EmailLayout
      previewText={`Your sign-in link for ${brandName}`}
      logoUrl={logoUrl}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Sign in to {brandName}
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {FirstName}, click the button below to sign in. This link expires in 15 minutes and can only be used once.
      </Text>
      <Hr className="border-gray-100 my-6" />
      <Section>
        <Button
          href={Url}
          className="bg-gray-900 text-white text-sm font-semibold rounded-lg px-5 py-3 text-center w-full box-border"
        >
          Sign in
        </Button>
      </Section>
      <Text className="text-sm text-center text-gray-500 mt-6">
        Or use this code manually:
      </Text>
      <Text className="text-2xl font-bold tracking-widest text-center mt-0">
        {ManualCode}
      </Text>
      <Hr className="border-gray-100 my-6" />
      <Text className="text-xs text-gray-400 text-center">
        If you didn't request this, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}
