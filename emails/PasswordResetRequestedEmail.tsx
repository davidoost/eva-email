import { PasswordResetRequestedDataModel } from "@/lib/types";
import { Button, Heading, Hr, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";

interface PasswordResetRequestedEmailProps {
  data: PasswordResetRequestedDataModel;
  logoUrl?: string;
  brandName?: string;
}

export default function PasswordResetRequestedEmail({
  data,
  logoUrl,
  brandName = "EVA",
}: PasswordResetRequestedEmailProps) {
  const { User, Token, SuiteUrl, ExpiresAt } = data;

  const formattedExpiry = new Date(ExpiresAt).toLocaleString("en-US", {
    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <EmailLayout
      previewText={`Reset your ${brandName} password`}
      logoUrl={logoUrl}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Password reset request
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {User.FirstName}, we received a request to reset the password for
        your {brandName} account. Click the button below to complete your
        password reset. This link expires on {formattedExpiry}.
      </Text>
      <Hr className="border-gray-100 my-6" />
      <Section>
        <Button
          href={`${SuiteUrl}/forgot-password/${Token}`}
          className="bg-gray-900 text-white text-sm font-semibold rounded-lg px-5 py-3 text-center w-full box-border"
        >
          Reset your password
        </Button>
      </Section>
      <Text className="text-xs text-gray-400 text-center mt-6">
        If you didn't request this, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}
