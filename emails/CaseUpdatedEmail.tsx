import { CaseUpdatedDataModel } from "@/lib/types";
import { Column, Heading, Hr, Row, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";
import { EvaIf } from "./eva-if";

interface CaseUpdatedEmailProps {
  data: CaseUpdatedDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
}

export default function CaseUpdatedEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
  surfaceBg,
}: CaseUpdatedEmailProps) {
  const {
    Customer, Title, CurrentStatusName, PreviousStatusName,
    StatusChanged, IsReopened, AssignedOrganizationUnit,
  } = data;

  const heading = IsReopened ? "Case reopened" : "Case updated";
  const intro = IsReopened
    ? `Your support case has been reopened.`
    : `There's an update on your support case.`;

  return (
    <EmailLayout
      previewText={`Update on your case: ${Title}`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        {heading}
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {Customer.FirstName}, {intro}
      </Text>

      <Section
        style={{ backgroundColor: surfaceBg ?? "#f9fafb" }}
        className="rounded-lg px-4 py-3 my-4"
      >
        <Row>
          <Column className="text-sm text-gray-500">Case number</Column>
          <Column className="text-sm font-semibold text-gray-900 text-right">
            #{data.ID}
          </Column>
        </Row>
        <Row className="mt-1">
          <Column className="text-sm text-gray-500">Subject</Column>
          <Column className="text-sm text-gray-700 text-right">{Title}</Column>
        </Row>
        <EvaIf expr="StatusChanged" show={StatusChanged}>
          <Row className="mt-1">
            <Column className="text-sm text-gray-500">Status</Column>
            <Column className="text-sm text-gray-700 text-right">
              <span className="line-through text-gray-400">{PreviousStatusName}</span>
              {" → "}
              {CurrentStatusName}
            </Column>
          </Row>
        </EvaIf>
        <EvaIf expr="AssignedOrganizationUnit != null" show={!!AssignedOrganizationUnit?.Name}>
          <Row className="mt-1">
            <Column className="text-sm text-gray-500">Assigned to</Column>
            <Column className="text-sm text-gray-700 text-right">{AssignedOrganizationUnit?.Name}</Column>
          </Row>
        </EvaIf>
      </Section>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs text-gray-400 text-center">
        Questions? Reply to this email or contact {brandName} support.
      </Text>
    </EmailLayout>
  );
}
