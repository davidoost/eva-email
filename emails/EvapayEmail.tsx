import { EvapayDataModel } from "@/lib/types";
import { Button, Heading, Hr, Row, Column, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";
import { EvaFor } from "./eva-for";

interface EvapayEmailProps {
  data: EvapayDataModel;
  logoUrl?: string;
  brandName?: string;
}

export default function EvapayEmail({
  data,
  logoUrl,
  brandName = "EVA",
}: EvapayEmailProps) {
  const { FirstName, OrderID, Amount, CurrencyID, Url, IsReminder, Order } = data;

  const fmt = (amount: number, currency = CurrencyID) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

  return (
    <EmailLayout
      previewText={`${IsReminder ? "Reminder: " : ""}Your payment request for order #${OrderID}`}
      logoUrl={logoUrl}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        {IsReminder ? "Payment reminder" : "Payment request"}
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {FirstName}, {IsReminder ? "we haven't received your payment yet for" : "here is your payment request for"} order <strong>#{OrderID}</strong>.
      </Text>

      {/* Order lines */}
      <Section className="my-4">
        <EvaFor
          expr="Order.Lines"
          items={Order.Lines}
          renderItem={(line) => (
            <Row key={line.ID} className="mb-2">
              <Column className="text-sm text-gray-700">
                {line.Description}
                <span className="text-gray-400"> × {line.TotalQuantityToShip}</span>
              </Column>
              <Column className="text-sm text-gray-900 text-right">
                {fmt(line.TotalAmountInTax, Order.CurrencyID)}
              </Column>
            </Row>
          )}
        />
      </Section>

      <Hr className="border-gray-100 my-4" />

      <Row>
        <Column className="text-sm font-semibold text-gray-900">Total due</Column>
        <Column className="text-lg font-bold text-gray-900 text-right">{fmt(Amount)}</Column>
      </Row>

      <Hr className="border-gray-100 my-6" />

      <Section>
        <Button
          href={Url}
          className="bg-gray-900 text-white text-sm font-semibold rounded-lg px-5 py-3 text-center w-full box-border"
        >
          Pay now
        </Button>
      </Section>

      <Text className="text-xs text-gray-400 text-center mt-6">
        If you have any questions about this payment, please contact {brandName} support.
      </Text>
    </EmailLayout>
  );
}
