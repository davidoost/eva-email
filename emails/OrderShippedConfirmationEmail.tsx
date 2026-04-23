import { OrderShippedConfirmationDataModel } from "@/lib/types";
import { Column, Heading, Hr, Link, Row, Text } from "@react-email/components";
import EmailLayout from "./layout";
import { EvaFor } from "./eva-for";
import { EvaIf } from "./eva-if";

interface OrderShippedConfirmationEmailProps {
  data: OrderShippedConfirmationDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
  buttonBg?: string;
  buttonFg?: string;
}

export default function OrderShippedConfirmationEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
}: OrderShippedConfirmationEmailProps) {
  const { Order, User, ShippedLines, UnshippedLines, Tracking } = data;
  const unshipped = UnshippedLines ?? [];

  return (
    <EmailLayout
      previewText={`Your order #${Order.ID} is on its way, ${User.FirstName}!`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Your order is on its way
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {User.FirstName}, good news — items from order <strong>#{Order.ID}</strong> have been shipped and are heading your way.
      </Text>

      <EvaIf expr="Tracking != null" show={!!Tracking?.Code}>
        <Hr className="border-gray-100 my-4" />
        <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-1">
          Tracking code
        </Text>
        <EvaIf expr="Tracking.Link != null" show={!!Tracking?.Link}>
          <Link href={Tracking?.Link ?? "#"} className="text-sm font-semibold text-gray-900">
            {Tracking?.Code}
          </Link>
        </EvaIf>
        <EvaIf expr="Tracking.Link == null" show={!Tracking?.Link}>
          <Text className="text-sm font-semibold text-gray-900 m-0">
            {Tracking?.Code}
          </Text>
        </EvaIf>
      </EvaIf>

      <Hr className="border-gray-100 my-4" />

      <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-3">
        Shipped items
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
            <EvaIf expr="line.TrackingCode != null" show={!!line.TrackingCode}>
              <Column className="text-xs text-gray-400 text-right">
                {line.TrackingCode}
              </Column>
            </EvaIf>
          </Row>
        )}
      />

      <EvaIf expr="UnshippedLines != null" show={unshipped.length > 0}>
        <Hr className="border-gray-100 my-4" />
        <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-3">
          Still to come
        </Text>
        <EvaFor
          expr="UnshippedLines"
          items={unshipped}
          renderItem={(line) => (
            <Row key={line.ID} className="mb-3">
              <Column className="text-sm text-gray-800">
                {line.Description}
                <span className="text-gray-400"> × {line.TotalQuantityToShip}</span>
              </Column>
            </Row>
          )}
        />
      </EvaIf>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs text-gray-400 text-center">
        Questions? Contact {brandName} and reference order #{Order.ID}.
      </Text>
    </EmailLayout>
  );
}
