import { StockNotificationDataModel } from "@/lib/types";
import { Heading, Hr, Text } from "@react-email/components";
import EmailLayout from "./layout";

interface StockNotificationEmailProps {
  data: StockNotificationDataModel;
  logoUrl?: string;
  brandName?: string;
}

const DAY_NAMES = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function StockNotificationEmail({
  data,
  logoUrl,
  brandName = "EVA",
}: StockNotificationEmailProps) {
  const { OrganizationUnit, ProductID } = data;

  const openDays = OrganizationUnit.UpcomingOpeningHours?.filter((h) => !h.IsClosed) ?? [];

  return (
    <EmailLayout
      previewText={`Good news — a product you wanted is back in stock at ${OrganizationUnit.Name}`}
      logoUrl={logoUrl}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Back in stock!
      </Heading>
      <Text className="text-sm leading-relaxed">
        Good news — product <strong>#{ProductID}</strong> is back in stock at <strong>{OrganizationUnit.Name}</strong>.
      </Text>
      <Text className="text-sm leading-relaxed">
        Visit us at {OrganizationUnit.StreetAndHouseNumber ?? OrganizationUnit.Address1}{OrganizationUnit.ZipCodeAndCity ? `, ${OrganizationUnit.ZipCodeAndCity}` : ""} to pick it up.
      </Text>

      {openDays.length > 0 && (
        <>
          <Hr className="border-gray-100 my-6" />
          <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-3">
            Opening hours this week
          </Text>
          {openDays.map((h) => (
            <Text key={h.Date} className="text-sm text-gray-700 m-0 mb-1">
              <strong>{DAY_NAMES[h.DayOfWeek]}</strong>{" "}
              <span className="text-gray-500">{h.OpeningTime.slice(0, 5)} – {h.ClosingTime.slice(0, 5)}</span>
            </Text>
          ))}
        </>
      )}

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs text-gray-400 text-center">
        You received this notification because you signed up for a stock alert at {brandName}.
      </Text>
    </EmailLayout>
  );
}
