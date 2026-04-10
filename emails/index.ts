import CustomerCreatedEmail from "./CustomerCreatedEmail";
import EvapayEmail from "./EvapayEmail";
import { evapaySample } from "./evapay.sample";
import DigitalGiftCardMessageEmail from "./DigitalGiftCardMessageEmail";
import { digitalGiftCardMessageSample } from "./digitalGiftCardMessage.sample";
import DigitalGiftCardSenderMessageEmail from "./DigitalGiftCardSenderMessageEmail";
import { digitalGiftCardSenderMessageSample } from "./digitalGiftCardSenderMessage.sample";
import MagicLinkEmail from "./MagicLinkEmail";
import { magicLinkSample } from "./magicLink.sample";
import StockNotificationEmail from "./StockNotificationEmail";
import { stockNotificationSample } from "./stockNotification.sample";
import EmployeeCreatedEmail from "./EmployeeCreatedEmail";
import { employeeCreatedSample } from "./employeeCreated.sample";
import { customerCreatedSample } from "./customerCreated.sample";
import PasswordResetCompletedEmail from "./PasswordResetCompletedEmail";
import { passwordResetCompletedSample } from "./passwordResetCompleted.sample";
import PasswordResetRequestedEmail from "./PasswordResetRequestedEmail";
import { passwordResetRequestedSample } from "./passwordResetRequested.sample";

type EmailComponent<T> = (props: { data: T; logoUrl?: string; brandName?: string }) => React.ReactElement;

interface TemplateEntry<T> {
  slug: string;
  name: string;
  description: string;
  component: EmailComponent<T>;
  sampleData: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defineTemplate = <T>(entry: TemplateEntry<T>): TemplateEntry<any> => entry;

export const templates = [
  defineTemplate({
    slug: "customer-created",
    name: "Customer Created",
    description: "Sent when a new customer account is created.",
    component: CustomerCreatedEmail,
    sampleData: customerCreatedSample,
  }),
  defineTemplate({
    slug: "password-reset-requested",
    name: "Password Reset Requested",
    description: "Sent when a customer requests a password reset.",
    component: PasswordResetRequestedEmail,
    sampleData: passwordResetRequestedSample,
  }),
  defineTemplate({
    slug: "password-reset-completed",
    name: "Password Reset Completed",
    description: "Sent when a customer's password has been successfully reset.",
    component: PasswordResetCompletedEmail,
    sampleData: passwordResetCompletedSample,
  }),
  defineTemplate({
    slug: "digital-gift-card-message",
    name: "Digital Gift Card Message",
    description: "Sent to the recipient of a digital gift card.",
    component: DigitalGiftCardMessageEmail,
    sampleData: digitalGiftCardMessageSample,
  }),
  defineTemplate({
    slug: "digital-gift-card-sender-message",
    name: "Digital Gift Card Sender Message",
    description: "Sent to the sender confirming their digital gift card was delivered.",
    component: DigitalGiftCardSenderMessageEmail,
    sampleData: digitalGiftCardSenderMessageSample,
  }),
  defineTemplate({
    slug: "evapay",
    name: "EVAPAY",
    description: "Sent to request or remind a customer to complete a payment.",
    component: EvapayEmail,
    sampleData: evapaySample,
  }),
  defineTemplate({
    slug: "magic-link",
    name: "Magic Link",
    description: "Sent when a user requests a passwordless sign-in link.",
    component: MagicLinkEmail,
    sampleData: magicLinkSample,
  }),
  defineTemplate({
    slug: "stock-notification",
    name: "Stock Notification",
    description: "Sent when a product a customer signed up for is back in stock.",
    component: StockNotificationEmail,
    sampleData: stockNotificationSample,
  }),
  defineTemplate({
    slug: "employee-created",
    name: "Employee Created",
    description: "Sent when a new employee account is created.",
    component: EmployeeCreatedEmail,
    sampleData: employeeCreatedSample,
  }),
];

export type Template = (typeof templates)[number];
