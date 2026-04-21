import { PickupOrderPlacedConfirmationDataModel } from "@/lib/types";
import { Column, Heading, Hr, Row, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";
import { EvaFor } from "./eva-for";
import { EvaIf } from "./eva-if";

interface PickupOrderPlacedConfirmationEmailProps {
  data: PickupOrderPlacedConfirmationDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
  buttonBg?: string;
  buttonFg?: string;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function PickupOrderPlacedConfirmationEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
  surfaceBg,
}: PickupOrderPlacedConfirmationEmailProps) {
  const { Order, User, OrganizationUnit } = data;

  const fmt = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: Order.CurrencyID,
    }).format(amount);

  const upcomingHours = OrganizationUnit.UpcomingOpeningHours ?? [];
  const payments = Order.Payments ?? [];

  return (
    <EmailLayout
      previewText={`Order #${Order.ID} confirmed — ready for pickup at ${OrganizationUnit.Name}`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Order confirmed
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {User.FirstName}, your order has been placed and will be ready for pickup at <strong>{OrganizationUnit.Name}</strong>. We'll notify you as soon as it's ready to collect.
      </Text>

      <Hr className="border-gray-100 my-4" />

      <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-3">
        Order #{Order.ID}
      </Text>

      <EvaFor
        expr="Order.Lines"
        items={Order.Lines}
        renderItem={(line) => (
          <Row key={line.ID} className="mb-3">
            <Column className="text-sm text-gray-800">
              {line.Description}
              <span className="text-gray-400"> × {line.TotalQuantityToShip}</span>
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

      <EvaIf expr="Order.Payments != null" show={payments.length > 0}>
        <Hr className="border-gray-100 my-4" />
        <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-3">
          Payment
        </Text>
        <EvaFor
          expr="Order.Payments"
          items={payments}
          renderItem={(payment, i) => (
            <Row key={i} className="mb-1">
              <Column className="text-sm text-gray-700">{payment.Description}</Column>
              <Column className="text-sm text-gray-900 text-right">
                {fmt(payment.PaidAmount ?? 0)}
              </Column>
            </Row>
          )}
        />
      </EvaIf>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-2">
        Pickup location
      </Text>
      <Text className="text-sm text-gray-700 m-0">{OrganizationUnit.Name}</Text>
      <Text className="text-sm text-gray-700 m-0">
        {OrganizationUnit.StreetAndHouseNumber ?? OrganizationUnit.Address1}
      </Text>
      <Text className="text-sm text-gray-700 m-0">{OrganizationUnit.ZipCodeAndCity}</Text>

      <EvaIf expr="OrganizationUnit.UpcomingOpeningHours != null" show={upcomingHours.length > 0}>
        <Hr className="border-gray-100 my-6" />
        <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-3">
          Opening hours this week
        </Text>
        <Section>
          {upcomingHours.map((h, i) => (
            <Row
              key={h.Date}
              className="rounded-md"
              style={{ backgroundColor: i % 2 === 0 ? (surfaceBg ?? "#f9fafb") : "transparent" }}
            >
              <Column className="text-sm text-gray-700 font-medium py-2 px-3">
                {DAY_NAMES[h.DayOfWeek]}
              </Column>
              <Column className="text-sm text-gray-500 text-right py-2 px-3">
                {h.IsClosed ? "Closed" : `${h.OpeningTime.slice(0, 5)} – ${h.ClosingTime.slice(0, 5)}`}
              </Column>
            </Row>
          ))}
        </Section>
      </EvaIf>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs text-gray-400 text-center">
        Questions? Contact {brandName} and reference order #{Order.ID}.
      </Text>
    </EmailLayout>
  );
}
