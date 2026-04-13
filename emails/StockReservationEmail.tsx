import { StockReservationDataModel } from "@/lib/types";
import { Column, Heading, Hr, Row, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";
import { EvaFor } from "./eva-for";
import { EvaIf } from "./eva-if";

interface StockReservationEmailProps {
  data: StockReservationDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
}

const DAY_NAMES = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function StockReservationEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
  surfaceBg,
}: StockReservationEmailProps) {
  const { Order, User, OrganizationUnit } = data;

  const fmt = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: Order.CurrencyID,
    }).format(amount);

  const upcomingHours = OrganizationUnit.UpcomingOpeningHours ?? [];

  return (
    <EmailLayout
      previewText={`Your reservation at ${OrganizationUnit.Name} is confirmed, ${User.FirstName}!`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Reservation confirmed
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {User.FirstName}, your items have been reserved at <strong>{OrganizationUnit.Name}</strong>. Come pick them up at your convenience.
      </Text>

      <Hr className="border-gray-100 my-4" />

      <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-3">
        Reserved items
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
                {h.OpeningTime.slice(0, 5)} – {h.ClosingTime.slice(0, 5)}
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
