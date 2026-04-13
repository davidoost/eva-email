import { CaseCreatedDataModel } from "@/lib/types";
import { Column, Heading, Hr, Row, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";
import { EvaIf } from "./eva-if";

interface CaseCreatedEmailProps {
  data: CaseCreatedDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
}

export default function CaseCreatedEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
  surfaceBg,
}: CaseCreatedEmailProps) {
  const { Customer, Title, Description, CurrentStatusName, AssignedOrganizationUnit } = data;

  return (
    <EmailLayout
      previewText={`Your support case has been created, ${Customer.FirstName}.`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        Case created
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {Customer.FirstName}, your support case has been created. Our team will get back to you as soon as possible.
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
        <EvaIf expr="CurrentStatusName != null" show={!!CurrentStatusName}>
          <Row className="mt-1">
            <Column className="text-sm text-gray-500">Status</Column>
            <Column className="text-sm text-gray-700 text-right">{CurrentStatusName}</Column>
          </Row>
        </EvaIf>
        <EvaIf expr="AssignedOrganizationUnit != null" show={!!AssignedOrganizationUnit?.Name}>
          <Row className="mt-1">
            <Column className="text-sm text-gray-500">Assigned to</Column>
            <Column className="text-sm text-gray-700 text-right">{AssignedOrganizationUnit?.Name}</Column>
          </Row>
        </EvaIf>
      </Section>

      <EvaIf expr="Description != null" show={!!Description}>
        <Hr className="border-gray-100 my-4" />
        <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-2">
          Description
        </Text>
        <Text className="text-sm text-gray-700 leading-relaxed m-0">
          {Description}
        </Text>
      </EvaIf>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs text-gray-400 text-center">
        This case was opened at {brandName}. Reply to this email to add more information.
      </Text>
    </EmailLayout>
  );
}
