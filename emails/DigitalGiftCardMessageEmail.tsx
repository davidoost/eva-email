import { DigitalGiftCardMessageDataModel } from "@/lib/types";
import { Heading, Hr, Img, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";
import { EvaIf } from "./eva-if";

interface DigitalGiftCardMessageEmailProps {
  data: DigitalGiftCardMessageDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
}

export default function DigitalGiftCardMessageEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
  surfaceBg,
}: DigitalGiftCardMessageEmailProps) {
  const { Amount, CurrencyID, Data, Details } = data;

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CurrencyID,
  }).format(Amount);

  const formattedExpiry = Details.DateOfExpiration
    ? new Date(Details.DateOfExpiration).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : undefined;

  return (
    <EmailLayout
      previewText={`You've received a ${formattedAmount} gift card from ${Data.From}`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-2">
        You've received a gift card!
      </Heading>
      <Text className="text-center text-3xl font-bold text-gray-900 my-2">
        {formattedAmount}
      </Text>
      <Text className="text-sm text-center text-gray-500 mt-0">
        From <strong>{Data.From}</strong> to <strong>{Data.To}</strong>
      </Text>

      <EvaIf expr="Data.Text != null" show={!!Data.Text}>
        <Section className="rounded-lg px-5 py-4 my-6" style={{ backgroundColor: surfaceBg ?? "#f9fafb" }}>
          <Text className="text-sm text-gray-700 italic text-center m-0">
            "{Data.Text}"
          </Text>
        </Section>
      </EvaIf>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center m-0 mb-4">
        Your gift card
      </Text>
      <Text className="text-2xl font-bold tracking-widest text-center my-2">
        {Details.GiftCardNumber}
      </Text>
      <EvaIf expr="Details.PIN != null" show={!!Details.PIN}>
        <Text className="text-sm text-center text-gray-500 mt-0">
          PIN: <strong>{Details.PIN}</strong>
        </Text>
      </EvaIf>
      <EvaIf expr="Details.DateOfExpiration != null" show={!!formattedExpiry}>
        <Text className="text-xs text-center text-gray-400 mt-2">
          Valid until {formattedExpiry}
        </Text>
      </EvaIf>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs text-gray-400 text-center">
        This gift card was sent to you by {brandName}. Keep this email safe — it
        contains your gift card details.
      </Text>
    </EmailLayout>
  );
}
