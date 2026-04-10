import { PasswordResetCompletedDataModel } from "@/lib/types";
import { Heading, Text } from "@react-email/components";
import EmailLayout from "./layout";

interface PasswordResetCompletedEmailProps {
  data: PasswordResetCompletedDataModel;
  logoUrl?: string;
  brandName?: string;
}

export default function PasswordResetCompletedEmail({
  data,
  logoUrl,
  brandName = "EVA",
}: PasswordResetCompletedEmailProps) {
  const { User } = data;

  return (
    <EmailLayout
      previewText={`Your ${brandName} password has been reset`}
      logoUrl={logoUrl}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Password updated
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {User.FirstName}, your {brandName} password has been successfully changed.
      </Text>
      <Text className="text-sm leading-relaxed">
        If you didn't make this change, please contact our support team immediately.
      </Text>
    </EmailLayout>
  );
}
