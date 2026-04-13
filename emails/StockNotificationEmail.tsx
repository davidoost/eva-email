import { StockNotificationDataModel } from "@/lib/types";
import { Heading, Hr, Row, Column, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";
import { EvaIf } from "./eva-if";

interface StockNotificationEmailProps {
  data: StockNotificationDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
}

const DAY_NAMES = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function StockNotificationEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
  surfaceBg,
}: StockNotificationEmailProps) {
  const { OrganizationUnit, ProductID, ProductProperties } = data;

  const productName = ProductProperties?.name ?? ProductID;
  const upcomingHours = OrganizationUnit.UpcomingOpeningHours ?? [];

  return (
    <EmailLayout
      previewText={`Good news — ${productName} is back in stock at ${OrganizationUnit.Name}`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Back in stock!
      </Heading>
      <Text className="text-sm leading-relaxed">
        Good news — <strong>{productName}</strong> is back in stock at <strong>{OrganizationUnit.Name}</strong>.
      </Text>
      <Text className="text-sm leading-relaxed">
        Visit us at {OrganizationUnit.StreetAndHouseNumber ?? OrganizationUnit.Address1}{OrganizationUnit.ZipCodeAndCity ? `, ${OrganizationUnit.ZipCodeAndCity}` : ""} to pick it up.
      </Text>

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
        You received this notification because you signed up for a stock alert at {brandName}.
      </Text>
    </EmailLayout>
  );
}
