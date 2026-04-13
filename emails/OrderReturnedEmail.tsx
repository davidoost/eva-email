import { OrderReturnedDataModel } from "@/lib/types";
import {
  Column,
  Heading,
  Hr,
  Row,
  Section,
  Text,
} from "@react-email/components";
import EmailLayout from "./layout";
import { EvaFor } from "./eva-for";

interface OrderReturnedEmailProps {
  data: OrderReturnedDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
}

export default function OrderReturnedEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
  surfaceBg,
}: OrderReturnedEmailProps) {
  const { Order, ShippedLines, User } = data;

  return (
    <EmailLayout
      previewText={`Your return for order #${Order.ID} has been received, ${User.FirstName}.`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Return received
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {User.FirstName}, we've received your return for order{" "}
        <strong>#{Order.ID}</strong>. Your items are being processed and you'll
        hear from us shortly.
      </Text>

      <Section
        style={{ backgroundColor: surfaceBg ?? "#f9fafb" }}
        className="rounded-lg px-4 py-3 my-4"
      >
        <Row>
          <Column className="text-sm text-gray-500">Order number</Column>
          <Column className="text-sm font-semibold text-gray-900 text-right">
            #{Order.ID}
          </Column>
        </Row>
      </Section>

      <Hr className="border-gray-100 my-4" />

      <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-3">
        Returned items
      </Text>

      <EvaFor
        expr="ShippedLines"
        items={ShippedLines}
        renderItem={(line) => (
          <Row key={line.OrderLineID} className="mb-3">
            <Column className="text-sm text-gray-800">
              {line.Description}
              <span className="text-gray-400"> × {line.QuantityShipped}</span>
            </Column>
          </Row>
        )}
      />

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs text-gray-400 text-center">
        Questions about your return? Contact {brandName} support and reference
        order #{Order.ID}.
      </Text>
    </EmailLayout>
  );
}
