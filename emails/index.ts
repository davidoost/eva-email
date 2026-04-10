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
  loopVarReplacements?: (sampleData: T) => Record<string, Record<string, string>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defineTemplate = <T>(entry: TemplateEntry<T>): TemplateEntry<any> => entry;

export const templates = [
  defineTemplate({
    slug: "loyalty-points-mutated",
    name: "Loyalty Points Mutated",
    description: "Sent when a customer's loyalty points balance changes.",
    component: LoyaltyPointsMutatedEmail,
    sampleData: loyaltyPointsMutatedSample,
    varReplacements: (s) => ({
      [new Intl.NumberFormat("en-US").format(Math.round(s.CurrentLoyaltyBalance))]:
        `{{>CurrentLoyaltyBalance}}`,
    }),
    loopVarReplacements: (s) => ({
      "Deposits": {
        [String(s.Deposits[0].Points)]: `{{>Points}}`,
      },
      "Withdrawals": {
        [String(s.Withdrawals[0].Points)]: `{{>Points}}`,
      },
    }),
  }),
  defineTemplate({
    slug: "discount-coupon",
    name: "Discount Coupon Email",
    description: "Sent when a customer earns a discount coupon.",
    component: DiscountCouponEmail,
    sampleData: discountCouponSample,
  }),
  defineTemplate({
    slug: "order-confirmation",
    name: "Order Placed Confirmation",
    description: "Sent when a customer places an order.",
    component: OrderConfirmationEmail,
    sampleData: orderConfirmationSample,
    helpers: ["currency", "date"],
    varReplacements: (s) => ({
      [new Intl.NumberFormat("en-US", { style: "currency", currency: s.Order.CurrencyID }).format(s.Order.TotalAmountInTax)]:
        `{{:~currency(Order.TotalAmountInTax, Order.CurrencyID, LanguageID)}}`,
      [new Date(s.Data.InvoiceData!.PlacementDateTime!).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })]:
        `{{:~date(Data.InvoiceData.PlacementDateTime, "DD MMMM YYYY", LanguageID, TimeZone)}}`,
    }),
    loopVarReplacements: (s) => ({
      "Order.Lines": {
        [String(s.Order.Lines[0].TotalQuantityToShip)]: `{{>TotalQuantityToShip}}`,
        [new Intl.NumberFormat("en-US", { style: "currency", currency: s.Order.CurrencyID }).format(s.Order.Lines[0].UnitPriceInTax)]:
          `{{:~currency(UnitPriceInTax, Order.CurrencyID, LanguageID)}}`,
        [new Intl.NumberFormat("en-US", { style: "currency", currency: s.Order.CurrencyID }).format(s.Order.Lines[0].TotalAmountInTax)]:
          `{{:~currency(TotalAmountInTax, Order.CurrencyID, LanguageID)}}`,
      },
    }),
  }),
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
    helpers: ["date"],
    varReplacements: (s) => ({
      [new Date(s.ExpiresAt).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })]:
        `{{:~date(ExpiresAt, "DD MMMM YYYY HH:mm", LanguageID, TimeZone)}}`,
    }),
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
    helpers: ["currency", "date"],
    varReplacements: (s) => ({
      [new Intl.NumberFormat("en-US", { style: "currency", currency: s.CurrencyID }).format(s.Amount)]:
        `{{:~currency(Amount, CurrencyID, LanguageID)}}`,
      [new Date(s.Details.DateOfExpiration!).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })]:
        `{{:~date(Details.DateOfExpiration, "DD MMMM YYYY", LanguageID, TimeZone)}}`,
    }),
  }),
  defineTemplate({
    slug: "digital-gift-card-sender-message",
    name: "Digital Gift Card Sender Message",
    description: "Sent to the sender confirming their digital gift card was delivered.",
    component: DigitalGiftCardSenderMessageEmail,
    sampleData: digitalGiftCardSenderMessageSample,
    helpers: ["currency", "date"],
    varReplacements: (s) => ({
      [new Intl.NumberFormat("en-US", { style: "currency", currency: s.CurrencyID }).format(s.Amount)]:
        `{{:~currency(Amount, CurrencyID, LanguageID)}}`,
      [new Date(s.Data.DeliverySchedule!).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })]:
        `{{:~date(Data.DeliverySchedule, "DD MMMM YYYY", LanguageID, TimeZone)}}`,
    }),
  }),
  defineTemplate({
    slug: "evapay",
    name: "EVAPAY",
    description: "Sent to request or remind a customer to complete a payment.",
    component: EvapayEmail,
    sampleData: evapaySample,
    varReplacements: (s) => ({
      [new Intl.NumberFormat("en-US", { style: "currency", currency: s.CurrencyID }).format(s.Amount)]:
        `{{:~currency(Amount, CurrencyID, LanguageID)}}`,
    }),
    loopVarReplacements: (s) => ({
      "Order.Lines": {
        [String(s.Order.Lines[0].TotalQuantityToShip)]: `{{>TotalQuantityToShip}}`,
        [new Intl.NumberFormat("en-US", { style: "currency", currency: s.Order.CurrencyID }).format(s.Order.Lines[0].TotalAmountInTax)]:
          `{{:~currency(TotalAmountInTax, Order.CurrencyID, LanguageID)}}`,
      },
    }),
    helpers: ["currency"],
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
    helpers: ["date"],
    varReplacements: (s) => ({
      [new Date(s.ResetExpiresAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })]:
        `{{:~date(ResetExpiresAt, "DD MMMM YYYY", LanguageID, TimeZone)}}`,
    }),
  }),
];

export type Template = (typeof templates)[number];
