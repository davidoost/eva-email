import { CustomerCreatedDataModel } from "@/lib/types";
import { Button, Heading, Hr, Text } from "@react-email/components";
import EmailLayout from "./layout";

interface CustomerCreatedEmailProps {
  data: CustomerCreatedDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
}

export default function CustomerCreatedEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
  surfaceBg,
}: CustomerCreatedEmailProps) {
  return (
    <EmailLayout
      previewText={`Welcome, ${data.User.FirstName}!`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Welcome to <strong>{brandName}</strong>, {data.User.FirstName as string}
        !
      </Heading>
      <Text className="text-sm">Hello {data.User.FirstName as string},</Text>
      <Text className="text-sm leading-relaxed">
        We're excited to have you onboard at <strong>{brandName}</strong>. We
        hope you enjoy your journey with us. If you have any questions or need
        assistance, feel free to reach out.
      </Text>
    </EmailLayout>
  );
}
