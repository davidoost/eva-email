import { DiscountCouponDataModel } from "@/lib/types";
import { Heading, Hr, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";
import { EvaIf } from "./eva-if";

interface DiscountCouponEmailProps {
  data: DiscountCouponDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
  buttonBg?: string;
  buttonFg?: string;
}

export default function DiscountCouponEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
}: DiscountCouponEmailProps) {
  const { CouponCode, Customer, OriginatingDiscount, OriginatingOrder, OriginatingAppointment } = data;

  return (
    <EmailLayout
      previewText={`Your exclusive coupon code from ${brandName}`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Here's your coupon!
      </Heading>

      <Text className="text-sm leading-relaxed">
        Hi {Customer.FirstName}, here's an exclusive coupon code just for you.
      </Text>

      <EvaIf
        expr="OriginatingDiscount.MarketingDescription != null"
        show={!!OriginatingDiscount?.MarketingDescription}
      >
        <Text className="text-sm text-gray-600 leading-relaxed">
          {OriginatingDiscount?.MarketingDescription}
        </Text>
      </EvaIf>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center m-0 mb-3">
        Your coupon code
      </Text>
      <Section className="border border-dashed border-gray-200 rounded-lg py-4 px-6 my-0">
        <Text className="text-2xl font-bold tracking-widest text-center my-0">
          {CouponCode}
        </Text>
      </Section>

      <EvaIf
        expr="OriginatingOrder != null"
        show={!!OriginatingOrder?.ID}
      >
        <Hr className="border-gray-100 my-6" />
        <Text className="text-xs text-gray-400 text-center m-0">
          Earned on your order <strong>#{OriginatingOrder?.ID}</strong>
        </Text>
      </EvaIf>

      <EvaIf
        expr="OriginatingAppointment != null"
        show={!!OriginatingAppointment?.EventName}
      >
        <Hr className="border-gray-100 my-6" />
        <Text className="text-xs text-gray-400 text-center m-0">
          Earned from your appointment:{" "}
          <strong>{OriginatingAppointment?.EventName}</strong>
        </Text>
      </EvaIf>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs text-gray-400 text-center">
        This coupon was issued to you by {brandName}. Apply it at checkout.
      </Text>
    </EmailLayout>
  );
}
