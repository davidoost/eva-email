import { CaseInteractionCreatedDataModel } from "@/lib/types";
import { Column, Heading, Hr, Row, Section, Text } from "@react-email/components";
import EmailLayout from "./layout";
import { EvaIf } from "./eva-if";

interface CaseInteractionCreatedEmailProps {
  data: CaseInteractionCreatedDataModel;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
}

export default function CaseInteractionCreatedEmail({
  data,
  logoUrl,
  brandName = "EVA",
  bodyBg,
  surfaceBg,
}: CaseInteractionCreatedEmailProps) {
  const { Customer, User, Title, InteractionText, CurrentStatusName, AssignedOrganizationUnit } = data;

  return (
    <EmailLayout
      previewText={`New message on your case: ${Title}`}
      logoUrl={logoUrl}
      bodyBg={bodyBg}
    >
      <Heading className="text-2xl font-normal text-center p-0 mx-0 mb-8">
        New reply on your case
      </Heading>
      <Text className="text-sm leading-relaxed">
        Hi {Customer.FirstName}, {User.FullName} has added a reply to your support case.
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

      <EvaIf expr="InteractionText != null" show={!!InteractionText}>
        <Hr className="border-gray-100 my-4" />
        <Text className="text-xs font-semibold uppercase tracking-widest text-gray-400 m-0 mb-2">
          Message from {User.FullName}
        </Text>
        <Text className="text-sm text-gray-700 leading-relaxed m-0">
          {InteractionText}
        </Text>
      </EvaIf>

      <Hr className="border-gray-100 my-6" />

      <Text className="text-xs text-gray-400 text-center">
        Reply to this email to respond, or contact {brandName} support directly.
      </Text>
    </EmailLayout>
  );
}
