import { EmployeeCreatedDataModel } from "@/lib/types";
import { Button, Heading, Hr, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";

interface EmployeeCreatedEmailProps {
  data: EmployeeCreatedDataModel;
  logoUrl?: string;
  brandName?: string;
}

export default function EmployeeCreatedEmail({
  data,
  logoUrl,
  brandName = "EVA",
}: EmployeeCreatedEmailProps) {
  const { User, Password, SuiteUrl, PasswordResetToken } = data;

  return (
    <EmailLayout
      previewText={`Welcome to ${brandName}, ${User.FirstName}!`}
      logoUrl={logoUrl}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Welcome to {brandName}, {User.FirstName}!
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {User.FirstName}, your employee account has been created. You can sign in using the credentials below.
      </Text>
      <Hr className="border-gray-100 my-6" />
      <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-1">
        Email address
      </Text>
      <Text className="text-sm font-semibold text-gray-900 mt-0 mb-4">
        {User.EmailAddress}
      </Text>
      <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-1">
        Temporary password
      </Text>
      <Text className="text-sm font-semibold text-gray-900 mt-0">
        {Password}
      </Text>
      <Hr className="border-gray-100 my-6" />
      <Section>
        <Button
          href={`${SuiteUrl}/reset-password/${PasswordResetToken}`}
          className="bg-gray-900 text-white text-sm font-semibold rounded-lg px-5 py-3 text-center w-full box-border"
        >
          Set your password
        </Button>
      </Section>
      <Text className="text-xs text-gray-400 text-center mt-6">
        This link expires on {new Date(data.ResetExpiresAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}. If you didn't expect this email, please contact your administrator.
      </Text>
    </EmailLayout>
  );
}
