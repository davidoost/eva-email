import { DigitalGiftCardSenderMessageDataModel } from "@/lib/types";
import { Heading, Hr, Img, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";
import { EvaIf } from "./eva-if";

interface DigitalGiftCardSenderMessageEmailProps {
  data: DigitalGiftCardSenderMessageDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
}

export default function DigitalGiftCardSenderMessageEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
  surfaceBg,
}: DigitalGiftCardSenderMessageEmailProps) {
  const { Amount, CurrencyID, Data, Details } = data;

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CurrencyID,
  }).format(Amount);

  const formattedDelivery = Data.DeliverySchedule
    ? new Date(Data.DeliverySchedule).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : undefined;

  return (
    <EmailLayout
      previewText={`Your ${formattedAmount} gift card to ${Data.To} is on its way`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-2">
        Your gift card is on its way!
      </Heading>
      <Text className="text-center text-3xl font-bold text-gray-900 my-2">
        {formattedAmount}
      </Text>
      <Text className="text-sm text-center text-gray-500 mt-0">
        Sent to <strong>{Data.To}</strong>
      </Text>
      <EvaIf expr="Data.DeliverySchedule != null" show={!!formattedDelivery}>
        <Text className="text-sm text-center text-gray-500 mt-0">
          Delivers {formattedDelivery}
        </Text>
      </EvaIf>

      <EvaIf expr="Data.Text != null" show={!!Data.Text}>
        <Section className="rounded-lg px-5 py-4 my-6" style={{ backgroundColor: surfaceBg ?? "#f9fafb" }}>
          <Text className="text-sm text-gray-700 italic text-center m-0">
            "{Data.Text}"
          </Text>
        </Section>
      </EvaIf>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center m-0 mb-1">
        Gift card number
      </Text>
      <Text className="text-sm font-semibold text-gray-900 text-center mt-0 mb-4">
        {Details.GiftCardNumber}
      </Text>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs text-gray-400 text-center">
        Thank you for your purchase at {brandName}. If you'd like to make any
        changes, please contact our support team.
      </Text>
    </EmailLayout>
  );
}
