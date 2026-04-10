import { LoyaltyPointsMutatedDataModel } from "@/lib/types";
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

interface LoyaltyPointsMutatedEmailProps {
  data: LoyaltyPointsMutatedDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
  buttonBg?: string;
  buttonFg?: string;
}

export default function LoyaltyPointsMutatedEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
  surfaceBg,
}: LoyaltyPointsMutatedEmailProps) {
  const {
    User,
    LoyaltyProgram,
    CurrentLoyaltyBalance,
    Deposits,
    Withdrawals,
    GeneratedCouponCode,
    Order,
  } = data;

  const fmtPts = (pts: number) =>
    new Intl.NumberFormat("en-US").format(Math.round(pts));

  return (
    <EmailLayout
      previewText={`Your ${LoyaltyProgram.Name ?? brandName} points have been updated`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Points update
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {User.FirstName}, here's an update on your{" "}
        <strong>{LoyaltyProgram.Name}</strong> loyalty points.
      </Text>

      <Section
        style={{ backgroundColor: surfaceBg ?? "#f9fafb" }}
        className="rounded-lg px-4 py-5 my-4 text-center"
      >
        <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-1">
          Current balance
        </Text>
        <Text className="text-3xl font-bold text-gray-900 m-0">
          {fmtPts(CurrentLoyaltyBalance)} pts
        </Text>
      </Section>

      <EvaIf expr="Deposits != null" show={Deposits.length > 0}>
        <Hr className="border-gray-100 my-4" />
        <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-3">
          Points earned
        </Text>
        <EvaFor
          expr="Deposits"
          items={Deposits}
          renderItem={(entry) => (
            <Row key={entry.Description} className="mb-2">
              <Column className="text-sm text-gray-700">
                {entry.Description}
              </Column>
              <Column className="text-sm font-semibold text-green-600 text-right">
                +{fmtPts(entry.Points)} pts
              </Column>
            </Row>
          )}
        />
      </EvaIf>

      <EvaIf expr="Withdrawals != null" show={Withdrawals.length > 0}>
        <Hr className="border-gray-100 my-4" />
        <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-3">
          Points spent
        </Text>
        <EvaFor
          expr="Withdrawals"
          items={Withdrawals}
          renderItem={(entry) => (
            <Row key={entry.Description} className="mb-2">
              <Column className="text-sm text-gray-700">
                {entry.Description}
              </Column>
              <Column className="text-sm font-semibold text-gray-500 text-right">
                −{fmtPts(entry.Points)} pts
              </Column>
            </Row>
          )}
        />
      </EvaIf>

      <EvaIf expr="GeneratedCouponCode != null" show={!!GeneratedCouponCode}>
        <Hr className="border-gray-100 my-6" />
        <Text className="text-sm font-semibold text-center m-0 mb-3">
          You've unlocked a reward!
        </Text>
        <Section className="border border-dashed border-gray-200 rounded-lg py-4 px-6 my-0">
          <Text className="text-2xl font-bold tracking-widest text-center my-0">
            {GeneratedCouponCode}
          </Text>
        </Section>
        <Text className="text-xs text-gray-400 text-center mt-3">
          Apply this code at checkout to redeem your reward.
        </Text>
      </EvaIf>

      <EvaIf expr="Order != null" show={!!Order?.ID}>
        <Hr className="border-gray-100 my-4" />
        <Text className="text-xs text-gray-400 text-center m-0">
          Points updated for order <strong>#{Order?.ID}</strong>
        </Text>
      </EvaIf>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs text-gray-400 text-center">
        You're a valued member of the {LoyaltyProgram.Name} program at{" "}
        {brandName}.
      </Text>
    </EmailLayout>
  );
}
