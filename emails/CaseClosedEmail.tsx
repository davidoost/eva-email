import { CaseCreatedDataModel } from "@/lib/types";
import { Column, Heading, Hr, Row, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";
import { EvaIf } from "./eva-if";

interface CaseClosedEmailProps {
  data: CaseCreatedDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
}

export default function CaseClosedEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
  surfaceBg,
}: CaseClosedEmailProps) {
  const { Customer, Title, Description, AssignedOrganizationUnit } = data;

  return (
    <EmailLayout
      previewText={`Your support case has been closed, ${Customer.FirstName}.`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Case closed
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {Customer.FirstName}, your support case has been resolved and closed. We hope your issue has been addressed to your satisfaction.
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
        <EvaIf expr="AssignedOrganizationUnit != null" show={!!AssignedOrganizationUnit?.Name}>
          <Row className="mt-1">
            <Column className="text-sm text-gray-500">Handled by</Column>
            <Column className="text-sm text-gray-700 text-right">{AssignedOrganizationUnit?.Name}</Column>
          </Row>
        </EvaIf>
      </Section>

      <EvaIf expr="Description != null" show={!!Description}>
        <Hr className="border-gray-100 my-4" />
        <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-2">
          Resolution
        </Text>
        <Text className="text-sm text-gray-700 leading-relaxed m-0">
          {Description}
        </Text>
      </EvaIf>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs text-gray-400 text-center">
        If you have further questions, please open a new case with {brandName}.
      </Text>
    </EmailLayout>
  );
}
