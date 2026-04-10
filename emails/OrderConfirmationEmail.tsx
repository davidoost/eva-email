import { OrderConfirmationDataModel } from "@/lib/types";
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
import { EvaIf } from "./eva-if";

interface OrderConfirmationEmailProps {
  data: OrderConfirmationDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
  buttonBg?: string;
  buttonFg?: string;
}

export default function OrderConfirmationEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
  surfaceBg,
}: OrderConfirmationEmailProps) {
  const { Order, User, Data } = data;

  const fmt = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: Order.CurrencyID,
    }).format(amount);

  const placementDate = Data.InvoiceData?.PlacementDateTime
    ? new Date(Data.InvoiceData.PlacementDateTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : undefined;

  const paymentMethod = Data.Payments?.Payments?.[0]?.TypeName;
  const shipping = Order.ShippingAddress;

  return (
    <EmailLayout
      previewText={`Order #${Order.ID} confirmed — thanks, ${User.FirstName}!`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Order confirmed
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {User.FirstName}, thank you for your order! We've received it and
        will let you know once it's on its way.
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
        <EvaIf
          expr="Data.InvoiceData.PlacementDateTime != null"
          show={!!placementDate}
        >
          <Row className="mt-1">
            <Column className="text-sm text-gray-500">Order date</Column>
            <Column className="text-sm text-gray-700 text-right">
              {placementDate}
            </Column>
          </Row>
        </EvaIf>
      </Section>

      <Hr className="border-gray-100 my-4" />

      <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-3">
        Items ordered
      </Text>

      <EvaFor
        expr="Order.Lines"
        items={Order.Lines}
        renderItem={(line) => (
          <Row key={line.ID} className="mb-3">
            <Column className="text-sm text-gray-800">
              {line.Description}
              <span className="text-gray-400">
                {" "}
                × {line.TotalQuantityToShip}
              </span>
            </Column>
            <Column className="text-sm text-gray-900 text-right font-medium">
              {fmt(line.TotalAmountInTax)}
            </Column>
          </Row>
        )}
      />

      <Hr className="border-gray-100 my-4" />

      <Row>
        <Column className="text-sm font-semibold text-gray-900">Total</Column>
        <Column className="text-lg font-bold text-gray-900 text-right">
          {fmt(Order.TotalAmountInTax)}
        </Column>
      </Row>

      <EvaIf expr="Data.Payments.Payments != null" show={!!paymentMethod}>
        <Row className="mt-1">
          <Column className="text-sm text-gray-500">Payment</Column>
          <Column className="text-sm text-gray-700 text-right">
            {paymentMethod}
          </Column>
        </Row>
      </EvaIf>

      <EvaIf
        expr="Order.ShippingAddress != null"
        show={!!(shipping?.StreetAndHouseNumber || shipping?.Address1)}
      >
        <Hr className="border-gray-100 my-4" />
        <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-2">
          Shipping to
        </Text>
        <Text className="text-sm text-gray-700 m-0">
          {shipping?.FirstName} {shipping?.LastName}
        </Text>
        <Text className="text-sm text-gray-700 m-0">
          {shipping?.StreetAndHouseNumber ?? shipping?.Address1}
        </Text>
        <Text className="text-sm text-gray-700 m-0">
          {shipping?.ZipCodeAndCity}
          {shipping?.CountryID ? `, ${shipping.CountryID}` : ""}
        </Text>
      </EvaIf>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs text-gray-400 text-center">
        Questions about your order? Contact {brandName} support and reference
        order #{Order.ID}.
      </Text>
    </EmailLayout>
  );
}
