import CustomerCreatedEmail from "./CustomerCreatedEmail";
import OrderConfirmationEmail from "./OrderConfirmationEmail";
import { orderConfirmationSample } from "./orderConfirmation.sample";
import DiscountCouponEmail from "./DiscountCouponEmail";
import { discountCouponSample } from "./discountCoupon.sample";
import LoyaltyPointsMutatedEmail from "./LoyaltyPointsMutatedEmail";
import { loyaltyPointsMutatedSample } from "./loyaltyPointsMutated.sample";
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
import StockReservationEmail from "./StockReservationEmail";
import { stockReservationSample } from "./stockReservation.sample";
import OrderReturnedEmail from "./OrderReturnedEmail";
import { orderReturnedSample } from "./orderReturned.sample";
import CaseCreatedEmail from "./CaseCreatedEmail";
import { caseCreatedSample } from "./caseCreated.sample";
import CaseClosedEmail from "./CaseClosedEmail";
import { caseClosedSample } from "./caseClosed.sample";
import CaseUpdatedEmail from "./CaseUpdatedEmail";
import { caseUpdatedSample } from "./caseUpdated.sample";
import CaseInteractionCreatedEmail from "./CaseInteractionCreatedEmail";
import { caseInteractionCreatedSample } from "./caseInteractionCreated.sample";
import OrderShippedConfirmationEmail from "./OrderShippedConfirmationEmail";
import { orderShippedConfirmationSample } from "./orderShippedConfirmation.sample";
import PickupReminderEmail from "./PickupReminderEmail";
import { pickupReminderSample } from "./pickupReminder.sample";
import PickupOrderPlacedConfirmationEmail from "./PickupOrderPlacedConfirmationEmail";
import { pickupOrderPlacedConfirmationSample } from "./pickupOrderPlacedConfirmation.sample";
import EmployeeCreatedEmail from "./EmployeeCreatedEmail";
import { employeeCreatedSample } from "./employeeCreated.sample";
import { customerCreatedSample } from "./customerCreated.sample";
import PasswordResetCompletedEmail from "./PasswordResetCompletedEmail";
import { passwordResetCompletedSample } from "./passwordResetCompleted.sample";
import PasswordResetRequestedEmail from "./PasswordResetRequestedEmail";
import { passwordResetRequestedSample } from "./passwordResetRequested.sample";

type EmailComponent<T> = (props: {
  data: T;
  logoUrl?: string;
  brandName?: string;
  bodyBg?: string;
  surfaceBg?: string;
  buttonBg?: string;
  buttonFg?: string;
}) => React.ReactElement;

interface TemplateEntry<T> {
  slug: string;
  name: string;
  description: string;
  component: EmailComponent<T>;
  sampleData: T;
  helpers?: string[];
  /** Maps a rendered sample value to a helper expression for the copied template HTML */
  varReplacements?: (sampleData: T) => Record<string, string>;
  /** Per-loop replacements applied only within {{for}} body, keyed by array path */
  loopVarReplacements?: (
    sampleData: T,
  ) => Record<string, Record<string, string>>;
  /** Sequential replacements applied before injectTemplateVars — each pair replaces only the next occurrence */
  sequentialVarReplacements?: (sampleData: T) => Array<[string, string]>;
  /** Subject line — runs through varReplacements + injectTemplateVars, prepended as {#subject}...{#/subject} */
  subject?: (sampleData: T, brandName?: string) => string;
  isNew?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defineTemplate = <T>(entry: TemplateEntry<T>): TemplateEntry<any> =>
  entry;

export const templates = [
  defineTemplate({
    slug: "loyalty-points-mutated",
    name: "Loyalty Points Mutated",
    description: "Sent when a customer's loyalty points balance changes.",
    component: LoyaltyPointsMutatedEmail,
    sampleData: loyaltyPointsMutatedSample,
    varReplacements: (s) => ({
      [new Intl.NumberFormat("en-US").format(
        Math.round(s.CurrentLoyaltyBalance),
      )]: `{{>CurrentLoyaltyBalance}}`,
    }),
    loopVarReplacements: (s) => ({
      Deposits: {
        [String(s.Deposits[0].Points)]: `{{>Points}}`,
      },
      Withdrawals: {
        [String(s.Withdrawals[0].Points)]: `{{>Points}}`,
      },
    }),
    subject: (s, b = "EVA") => `Your ${s.LoyaltyProgram.Name ?? b} points have been updated`,
  }),
  defineTemplate({
    slug: "discount-coupon",
    name: "Discount Coupon Email",
    description: "Sent when a customer earns a discount coupon.",
    component: DiscountCouponEmail,
    sampleData: discountCouponSample,
    subject: (_, b = "EVA") => `Your exclusive coupon code from ${b}`,
  }),
  defineTemplate({
    slug: "order-confirmation",
    name: "Order Placed Confirmation",
    description: "Sent when a customer places an order.",
    component: OrderConfirmationEmail,
    sampleData: orderConfirmationSample,
    helpers: ["currency", "date"],
    varReplacements: (s) => ({
      [new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: s.Order.CurrencyID,
      }).format(s.Order.TotalAmountInTax)]:
        `{{:~currency(Order.TotalAmountInTax, Order.CurrencyID, LanguageID)}}`,
      [new Date(s.Data.InvoiceData!.PlacementDateTime!).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "long", day: "numeric" },
      )]:
        `{{:~date(Data.InvoiceData.PlacementDateTime, "DD MMMM YYYY", LanguageID, TimeZone)}}`,
    }),
    loopVarReplacements: (s) => ({
      "Order.Lines": {
        [String(s.Order.Lines[0].TotalQuantityToShip)]:
          `{{>TotalQuantityToShip}}`,
        [new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: s.Order.CurrencyID,
        }).format(s.Order.Lines[0].UnitPriceInTax)]:
          `{{:~currency(UnitPriceInTax, Order.CurrencyID, LanguageID)}}`,
        [new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: s.Order.CurrencyID,
        }).format(s.Order.Lines[0].TotalAmountInTax)]:
          `{{:~currency(TotalAmountInTax, Order.CurrencyID, LanguageID)}}`,
      },
    }),
    subject: (s) => `Order #${s.Order.ID} confirmed — thanks, ${s.User.FirstName}!`,
  }),
  defineTemplate({
    slug: "customer-created",
    name: "Customer Created",
    description: "Sent when a new customer account is created.",
    component: CustomerCreatedEmail,
    sampleData: customerCreatedSample,
    subject: (s) => `Welcome, ${s.User.FirstName}!`,
  }),
  defineTemplate({
    slug: "password-reset-requested",
    name: "Password Reset Requested",
    description: "Sent when a customer requests a password reset.",
    component: PasswordResetRequestedEmail,
    sampleData: passwordResetRequestedSample,
    helpers: ["date"],
    varReplacements: (s) => ({
      [new Date(s.ExpiresAt).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })]: `{{:~date(ExpiresAt, "DD MMMM YYYY HH:mm", LanguageID, TimeZone)}}`,
    }),
    subject: (_, b = "EVA") => `Reset your ${b} password`,
  }),
  defineTemplate({
    slug: "password-reset-completed",
    name: "Password Reset Completed",
    description: "Sent when a customer's password has been successfully reset.",
    component: PasswordResetCompletedEmail,
    sampleData: passwordResetCompletedSample,
    subject: (_, b = "EVA") => `Your ${b} password has been reset`,
  }),
  defineTemplate({
    slug: "digital-gift-card-message",
    name: "Digital Gift Card Message",
    description: "Sent to the recipient of a digital gift card.",
    component: DigitalGiftCardMessageEmail,
    sampleData: digitalGiftCardMessageSample,
    helpers: ["currency", "date"],
    varReplacements: (s) => ({
      [new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: s.CurrencyID,
      }).format(s.Amount)]: `{{:~currency(Amount, CurrencyID, LanguageID)}}`,
      [new Date(s.Details.DateOfExpiration!).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })]:
        `{{:~date(Details.DateOfExpiration, "DD MMMM YYYY", LanguageID, TimeZone)}}`,
    }),
    subject: (s) => `You've received a gift card from ${s.Data.From ?? ""}`,
  }),
  defineTemplate({
    slug: "digital-gift-card-sender-message",
    name: "Digital Gift Card Sender Message",
    description:
      "Sent to the sender confirming their digital gift card was delivered.",
    component: DigitalGiftCardSenderMessageEmail,
    sampleData: digitalGiftCardSenderMessageSample,
    helpers: ["currency", "date"],
    varReplacements: (s) => ({
      [new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: s.CurrencyID,
      }).format(s.Amount)]: `{{:~currency(Amount, CurrencyID, LanguageID)}}`,
      [new Date(s.Data.DeliverySchedule!).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })]:
        `{{:~date(Data.DeliverySchedule, "DD MMMM YYYY", LanguageID, TimeZone)}}`,
    }),
    subject: (s) => `Your gift card to ${s.Data.To ?? ""} is on its way`,
  }),
  defineTemplate({
    slug: "evapay",
    name: "EVAPAY",
    description: "Sent to request or remind a customer to complete a payment.",
    component: EvapayEmail,
    sampleData: evapaySample,
    varReplacements: (s) => ({
      [new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: s.CurrencyID,
      }).format(s.Amount)]: `{{:~currency(Amount, CurrencyID, LanguageID)}}`,
    }),
    loopVarReplacements: (s) => ({
      "Order.Lines": {
        [String(s.Order.Lines[0].TotalQuantityToShip)]:
          `{{>TotalQuantityToShip}}`,
        [new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: s.Order.CurrencyID,
        }).format(s.Order.Lines[0].TotalAmountInTax)]:
          `{{:~currency(TotalAmountInTax, Order.CurrencyID, LanguageID)}}`,
      },
    }),
    helpers: ["currency"],
    subject: (s) => `Your payment request for order #${s.OrderID}`,
  }),
  defineTemplate({
    slug: "magic-link",
    name: "Magic Link",
    description: "Sent when a user requests a passwordless sign-in link.",
    component: MagicLinkEmail,
    sampleData: magicLinkSample,
    subject: (_, b = "EVA") => `Your sign-in link for ${b}`,
  }),
  defineTemplate({
    slug: "stock-notification",
    name: "Stock Notification",
    description:
      "Sent when a product a customer signed up for is back in stock.",
    component: StockNotificationEmail,
    sampleData: stockNotificationSample,
    sequentialVarReplacements: (s) =>
      (s.OrganizationUnit.UpcomingOpeningHours ?? []).flatMap(
        (h, i) =>
          [
            [
              h.OpeningTime.slice(0, 5),
              `{{>OrganizationUnit.UpcomingOpeningHours[${i}].OpeningTime}}`,
            ],
            [
              h.ClosingTime.slice(0, 5),
              `{{>OrganizationUnit.UpcomingOpeningHours[${i}].ClosingTime}}`,
            ],
          ] as Array<[string, string]>,
      ),
    subject: (s) => `${s.ProductProperties?.["display_value"] ?? s.ProductID} is back in stock at ${s.OrganizationUnit.Name}`,
  }),
  defineTemplate({
    slug: "stock-reservation",
    name: "Stock Reservation",
    description: "Sent when a customer's items have been reserved for pickup.",
    component: StockReservationEmail,
    sampleData: stockReservationSample,
    helpers: ["currency"],
    varReplacements: (s) => ({
      [new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: s.Order.CurrencyID,
      }).format(s.Order.TotalAmountInTax)]:
        `{{:~currency(Order.TotalAmountInTax, Order.CurrencyID, LanguageID)}}`,
    }),
    loopVarReplacements: (s) => ({
      "Order.Lines": {
        [String(s.Order.Lines[0].TotalQuantityToShip)]:
          `{{>TotalQuantityToShip}}`,
        [new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: s.Order.CurrencyID,
        }).format(s.Order.Lines[0].TotalAmountInTax)]:
          `{{:~currency(TotalAmountInTax, Order.CurrencyID, LanguageID)}}`,
      },
    }),
    sequentialVarReplacements: (s) =>
      (s.OrganizationUnit.UpcomingOpeningHours ?? []).flatMap(
        (h, i) =>
          [
            [
              h.OpeningTime.slice(0, 5),
              `{{>OrganizationUnit.UpcomingOpeningHours[${i}].OpeningTime}}`,
            ],
            [
              h.ClosingTime.slice(0, 5),
              `{{>OrganizationUnit.UpcomingOpeningHours[${i}].ClosingTime}}`,
            ],
          ] as Array<[string, string]>,
      ),
    subject: (s) => `Your reservation at ${s.OrganizationUnit.Name} is confirmed, ${s.User.FirstName}!`,
    isNew: true,
  }),
  defineTemplate({
    slug: "case-interaction-created",
    name: "Case Interaction Created",
    description: "Sent when a reply is added to a customer support case.",
    component: CaseInteractionCreatedEmail,
    sampleData: caseInteractionCreatedSample,
    subject: (s) => `New message on your case: ${s.Title}`,
    isNew: true,
  }),
  defineTemplate({
    slug: "case-updated",
    name: "Case Updated",
    description:
      "Sent when a customer support case status or priority changes.",
    component: CaseUpdatedEmail,
    sampleData: caseUpdatedSample,
    subject: (s) => `Update on your case: ${s.Title}`,
    isNew: true,
  }),
  defineTemplate({
    slug: "case-closed",
    name: "Case Closed",
    description: "Sent when a customer support case is resolved and closed.",
    component: CaseClosedEmail,
    sampleData: caseClosedSample,
    subject: (s) => `Your support case has been closed, ${s.Customer.FirstName}.`,
    isNew: true,
  }),
  defineTemplate({
    slug: "case-created",
    name: "Case Created",
    description: "Sent when a customer support case is opened.",
    component: CaseCreatedEmail,
    sampleData: caseCreatedSample,
    subject: (s) => `Your support case has been created, ${s.Customer.FirstName}.`,
    isNew: true,
  }),
  defineTemplate({
    slug: "order-returned",
    name: "Order Returned",
    description: "Sent when a customer's return has been received.",
    component: OrderReturnedEmail,
    sampleData: orderReturnedSample,
    loopVarReplacements: (s) => ({
      ShippedLines: {
        [String(s.ShippedLines[0].QuantityShipped)]: `{{>QuantityShipped}}`,
        [s.ShippedLines[0].TrackingCode!]: `{{>TrackingCode}}`,
      },
    }),
    subject: (s) => `Your return for order #${s.Order.ID} has been received, ${s.User.FirstName}.`,
    isNew: true,
  }),
  defineTemplate({
    slug: "order-shipped-confirmation",
    name: "Order Shipped Confirmation",
    description: "Sent when items from a customer's order have been shipped.",
    component: OrderShippedConfirmationEmail,
    sampleData: orderShippedConfirmationSample,
    subject: (s) => `Your order #${s.Order.ID} is on its way, ${s.User.FirstName}!`,
    loopVarReplacements: (s) => ({
      ShippedLines: {
        [String(s.ShippedLines[0].QuantityShipped)]: `{{>QuantityShipped}}`,
      },
      UnshippedLines: {
        [String(s.UnshippedLines![0].TotalQuantityToShip)]: `{{>TotalQuantityToShip}}`,
      },
    }),
    isNew: true,
  }),
  defineTemplate({
    slug: "pickup-order-placed-confirmation",
    name: "Pickup Order Placed Confirmation",
    description: "Sent when a customer places a click-and-collect order.",
    component: PickupOrderPlacedConfirmationEmail,
    sampleData: pickupOrderPlacedConfirmationSample,
    helpers: ["currency"],
    varReplacements: (s) => ({
      [new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: s.Order.CurrencyID,
      }).format(s.Order.TotalAmountInTax)]:
        `{{:~currency(Order.TotalAmountInTax, Order.CurrencyID, LanguageID)}}`,
    }),
    loopVarReplacements: (s) => ({
      "Order.Lines": {
        [String(s.Order.Lines[0].TotalQuantityToShip)]:
          `{{>TotalQuantityToShip}}`,
        [new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: s.Order.CurrencyID,
        }).format(s.Order.Lines[0].TotalAmountInTax)]:
          `{{:~currency(TotalAmountInTax, Order.CurrencyID, LanguageID)}}`,
      },
      "Order.Payments": {
        [new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: s.Order.CurrencyID,
        }).format(s.Order.Payments![0].PaidAmount!)]:
          `{{:~currency(PaidAmount, Order.CurrencyID, LanguageID)}}`,
      },
    }),
    sequentialVarReplacements: (s) =>
      (s.OrganizationUnit.UpcomingOpeningHours ?? []).flatMap(
        (h, i) =>
          [
            [
              h.OpeningTime.slice(0, 5),
              `{{>OrganizationUnit.UpcomingOpeningHours[${i}].OpeningTime}}`,
            ],
            [
              h.ClosingTime.slice(0, 5),
              `{{>OrganizationUnit.UpcomingOpeningHours[${i}].ClosingTime}}`,
            ],
          ] as Array<[string, string]>,
      ),
    subject: (s) => `Order #${s.Order.ID} confirmed — ready for pickup at ${s.OrganizationUnit.Name}`,
    isNew: true,
  }),
  defineTemplate({
    slug: "pickup-reminder",
    name: "Pickup Reminder",
    description: "Sent to remind a customer their reserved items are waiting for pickup.",
    component: PickupReminderEmail,
    sampleData: pickupReminderSample,
    helpers: ["currency"],
    varReplacements: (s) => ({
      [new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: s.Order.CurrencyID,
      }).format(s.Order.TotalAmountInTax)]:
        `{{:~currency(Order.TotalAmountInTax, Order.CurrencyID, LanguageID)}}`,
      [String(s.Days)]: `{{>Days}}`,
    }),
    loopVarReplacements: (s) => ({
      "Order.Lines": {
        [String(s.Order.Lines[0].TotalQuantityToShip)]:
          `{{>TotalQuantityToShip}}`,
        [new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: s.Order.CurrencyID,
        }).format(s.Order.Lines[0].TotalAmountInTax)]:
          `{{:~currency(TotalAmountInTax, Order.CurrencyID, LanguageID)}}`,
      },
    }),
    sequentialVarReplacements: (s) =>
      (s.OrganizationUnit.UpcomingOpeningHours ?? []).flatMap(
        (h, i) =>
          [
            [
              h.OpeningTime.slice(0, 5),
              `{{>OrganizationUnit.UpcomingOpeningHours[${i}].OpeningTime}}`,
            ],
            [
              h.ClosingTime.slice(0, 5),
              `{{>OrganizationUnit.UpcomingOpeningHours[${i}].ClosingTime}}`,
            ],
          ] as Array<[string, string]>,
      ),
    subject: (s) => `Reminder: your reservation at ${s.OrganizationUnit.Name} expires in ${s.Days} days`,
    isNew: true,
  }),
  defineTemplate({
    slug: "employee-created",
    name: "Employee Created",
    description: "Sent when a new employee account is created.",
    component: EmployeeCreatedEmail,
    sampleData: employeeCreatedSample,
    helpers: ["date"],
    varReplacements: (s) => ({
      [new Date(s.ResetExpiresAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })]: `{{:~date(ResetExpiresAt, "DD MMMM YYYY", LanguageID, TimeZone)}}`,
    }),
    subject: (s, b = "EVA") => `Welcome to ${b}, ${s.User.FirstName}!`,
  }),
];

export type Template = (typeof templates)[number];
