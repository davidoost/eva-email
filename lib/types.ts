export interface OpeningHour {
  Day: number;
  Start: string;
  End: string;
  Closed: boolean;
}

export interface CustomFieldValue {
  StringValue?: string;
  BlobValue?: string;
  NumberValue?: number;
  BoolValue?: boolean;
  DateTimeValue?: string;
  ArrayValues?: unknown[];
}

export interface CustomField {
  Key: string;
  Value: CustomFieldValue;
}

export interface Company {
  Name: string;
  VatNumber?: string;
  RegistrationNumber?: string;
}

export interface User {
  Salutation?: string;
  Title?: string;
  Initials?: string;
  FirstName: string;
  LastName: string;
  FullName: string;
  Gender?: string;
  SingleSignOnOnly: boolean;
  AccountType: string;
  EmailAddress: string;
  Company?: Company;
}

export interface OrganizationUnit {
  Name: string;
  Description?: string;
  BackendID?: string;
  EmailAddress?: string;
  PhoneNumber?: string;
  HouseNumber?: string;
  Address1?: string;
  Address2?: string;
  ZipCodeAndCity?: string;
  State?: string;
  ZipCode?: string;
  City?: string;
  BankAccount?: string;
  VatNumber?: string;
  RegistrationNumber?: string;
  BranchNumber?: string;
  Website?: string;
  BIC?: string;
  OpeningHours?: OpeningHour[];
  CustomFields?: CustomField[];
  CocNumber?: string;
  StreetAndHouseNumber?: string;
}

export interface PasswordResetRequestedDataModel {
  TemplateName: string;
  Token: string;
  ExpiresAt: string;
  Context?: string;
  AdminUrl?: string;
  SuiteUrl?: string;
  User: User;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export interface CustomerCreatedDataModel {
  TemplateName: string;
  User: User;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export type PasswordResetCompletedDataModel = CustomerCreatedDataModel;

export interface UpcomingOpeningHourSlot {
  StartTime: string;
  EndTime: string;
}

export interface UpcomingOpeningHour {
  DayOfWeek: number;
  OpeningTime: string;
  ClosingTime: string;
  Date: string;
  Slots?: UpcomingOpeningHourSlot[];
  IsClosed: boolean;
  Description?: string;
}

export interface StockNotificationOrganizationUnit {
  UpcomingOpeningHours?: UpcomingOpeningHour[];
  Name: string;
  EmailAddress?: string;
  PhoneNumber?: string;
  BankAccount?: string;
  VatNumber?: string;
  RegistrationNumber?: string;
  HouseNumber?: string;
  Address1?: string;
  Address2?: string;
  ZipCodeAndCity?: string;
  OpeningHours?: OpeningHour[];
  CocNumber?: string;
  StreetAndHouseNumber?: string;
}

export interface StockNotificationDataModel {
  TemplateName: string;
  OrganizationUnit: StockNotificationOrganizationUnit;
  ProductID: string;
  ProductProperties?: Record<string, string>;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export interface GiftCardTheme {
  ID?: string;
  Name?: string;
  Description?: string;
  LongDescription?: string;
  ForegroundColor?: string;
  BackgroundColor?: string;
  ImageUrl?: string;
  ImageWidth?: number;
  ImageHeight?: number;
  VideoUrl?: string;
}

export interface GiftCardIdentifiers {
  OrderID?: string;
  OrderLineID?: string;
  AccessToken?: string;
  GiftCardID?: string;
}

export interface GiftCardData {
  Theme?: GiftCardTheme;
  From?: string;
  To?: string;
  Text?: string;
  FromEmailAddress?: string;
  ToEmailAddress?: string;
  PhoneNumber?: string;
  DeliverySchedule?: string;
  UpdateUrl?: string;
  DeliveryMode?: string;
}

export interface GiftCardDetails {
  GiftCardNumber?: string;
  PIN?: string;
  DateOfPurchase?: string;
  DateOfExpiration?: string;
}

export interface OrderLine {
  ID: string;
  Description: string;
  TotalQuantityToShip: number;
  UnitPriceInTax: number;
  TotalAmountInTax: number;
  ProductPrimaryImage?: string;
  Type?: string;
}

export interface OrderTotals {
  SubTotal: number;
  Total: number;
  Discounts: number;
  ShippingCosts: number;
}

export interface EvapayOrder {
  IsRepair: boolean;
  CurrencyID: string;
  SoldFromOrganizationUnit: OrganizationUnit;
  Lines: OrderLine[];
  Totals: OrderTotals;
}

export interface EvapayDataModel {
  TemplateName: string;
  Url: string;
  EmailAddress: string;
  IsAnonymous: boolean;
  Subject?: string;
  IsReminder: boolean;
  OrderID: string;
  Amount: number;
  CurrencyID: string;
  FirstName: string;
  LastName: string;
  Gender?: string;
  Order: EvapayOrder;
  RepairOrder?: Record<string, unknown>;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export interface MagicLinkDataModel {
  TemplateName: string;
  FirstName: string;
  LastName: string;
  Url: string;
  ManualCode: string;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export interface EmployeeCreatedDataModel {
  TemplateName: string;
  Password: string;
  ResetExpiresAt: string;
  PasswordResetToken: string;
  User: User;
  SuiteUrl?: string;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export interface PostalAddress {
  FirstName?: string;
  LastName?: string;
  PhoneNumber?: string;
  EmailAddress?: string;
  HouseNumber?: string;
  Address1?: string;
  Address2?: string;
  ZipCode?: string;
  City?: string;
  State?: string;
  CountryID?: string;
  ZipCodeAndCity?: string;
  StreetAndHouseNumber?: string;
}

export interface OrderConfirmationInvoiceData {
  InvoiceNumber?: string;
  PlacementDateTime?: string;
  InvoiceDateTime?: string;
}

export interface OrderConfirmationPayment {
  TypeName?: string;
  Amount?: number;
  Date?: string;
}

export interface OrderConfirmationOrder {
  ID: string;
  CurrencyID: string;
  TotalAmountInTax: number;
  ShippingAddress?: PostalAddress;
  BillingAddress?: PostalAddress;
  Lines: OrderLine[];
  Payments: OrderConfirmationPayment[];
}

export interface OrderConfirmationDataModel {
  TemplateName: string;
  Order: OrderConfirmationOrder;
  User: User;
  Data: {
    InvoiceData?: OrderConfirmationInvoiceData;
  };
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export interface LoyaltyProgramRef {
  LoyaltyProgramID: string;
  BackendID?: string;
  Name?: string;
}

export interface LoyaltyPointsMutation {
  Description: string;
  Points: number;
}

export interface LoyaltyPointsMutatedOrder {
  ID: string;
  CurrencyID?: string;
  TotalAmountInTax?: number;
}

export interface LoyaltyPointsMutatedDataModel {
  TemplateName: string;
  LoyaltyProgram: LoyaltyProgramRef;
  Order?: LoyaltyPointsMutatedOrder;
  User: User;
  CurrentLoyaltyBalance: number;
  Deposits: LoyaltyPointsMutation[];
  Withdrawals: LoyaltyPointsMutation[];
  GeneratedCouponCode?: string | null;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export interface StockReservationOrderLine {
  ID: string;
  ProductID: string;
  Description: string;
  CurrencyID: string;
  UnitPriceInTax: number;
  TotalAmountInTax: number;
  TotalQuantityToShip: number;
}

export interface StockReservationOrder {
  ID: string;
  BackendID?: string;
  CurrencyID: string;
  TotalAmountInTax: number;
  ShippingAddress?: PostalAddress;
  BillingAddress?: PostalAddress;
  Lines: StockReservationOrderLine[];
}

export interface StockReservationDataModel {
  TemplateName: string;
  Order: StockReservationOrder;
  CancelledLines?: StockReservationOrderLine[] | null;
  VerificationCode?: string;
  User: User;
  OrganizationUnit: StockNotificationOrganizationUnit;
  Deadline?: string;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export interface PickupOrderPlacedConfirmationOrderPayment {
  CurrencyID?: string;
  PaidAmount?: number;
  PaymentDate?: string;
  Description?: string;
}

export interface PickupOrderPlacedConfirmationOrder {
  ID: string;
  BackendID?: string;
  CurrencyID: string;
  TotalAmountInTax: number;
  ShippingAddress?: PostalAddress;
  BillingAddress?: PostalAddress;
  Payments?: PickupOrderPlacedConfirmationOrderPayment[];
  Lines: StockReservationOrderLine[];
}

export interface PickupOrderPlacedConfirmationDataModel {
  TemplateName: string;
  User: User;
  Order: PickupOrderPlacedConfirmationOrder;
  OrganizationUnit: StockNotificationOrganizationUnit;
  Data?: Record<string, unknown> | null;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export interface PickupReminderDataModel {
  TemplateName: string;
  User: User;
  Order: StockReservationOrder;
  OrganizationUnit: StockNotificationOrganizationUnit;
  VerificationCode?: string;
  Days: number;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export interface CaseInteractionCreatedDataModel extends CaseCreatedDataModel {
  InteractionText?: string;
  User: User;
}

export interface CaseUpdatedDataModel extends CaseCreatedDataModel {
  PriorityChanged: boolean;
  PreviousPriority?: number;
  StatusChanged: boolean;
  IsReopened: boolean;
  PreviousStatusName?: string;
  PreviousStatusDescription?: string;
}

export interface CaseCreatedDataModel {
  TemplateName: string;
  ID: string;
  TopicName?: string;
  TopicDescription?: string;
  Title: string;
  Description?: string;
  CurrentPriority?: number;
  CurrentStatusName?: string;
  CurrentStatusDescription?: string;
  Customer: User;
  AssignedOrganizationUnit?: OrganizationUnit;
  OriginatingOrganizationUnit?: OrganizationUnit;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export interface ShippedLine {
  OrderLineID: string;
  Description: string;
  QuantityShipped: number;
  ShipmentDate?: string;
  TrackingCode?: string;
  TrackingLink?: string;
}

export interface OrderReturnedDataModel {
  TemplateName: string;
  Order: StockReservationOrder;
  ShippedLines: ShippedLine[];
  User: User;
  CommercialOrganizationUnit: StockNotificationOrganizationUnit;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export interface DiscountCouponOriginatingDiscount {
  Description?: string;
  MarketingDescription?: string;
  CampaignName?: string;
}

export interface DiscountCouponOriginatingAppointment {
  ID?: string;
  EventID?: string;
  EventName?: string;
  Date?: string;
  Duration?: number;
  Description?: string;
}

export interface DiscountCouponOriginatingOrder {
  ID: string;
  CurrencyID?: string;
  TotalAmountInTax?: number;
}

export interface DiscountCouponDataModel {
  TemplateName: string;
  CouponCode: string;
  OriginatingDiscount?: DiscountCouponOriginatingDiscount;
  OriginatingOrder?: DiscountCouponOriginatingOrder;
  OriginatingAppointment?: DiscountCouponOriginatingAppointment;
  Customer: User;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}

export type DigitalGiftCardSenderMessageDataModel =
  DigitalGiftCardMessageDataModel;

export interface DigitalGiftCardMessageDataModel {
  TemplateName: string;
  Amount: number;
  CurrencyID: string;
  Identifiers: GiftCardIdentifiers;
  Data: GiftCardData;
  Details: GiftCardDetails;
  ApplicationCode?: string;
  AssetsUrl: string;
  LanguageID: string;
  CountryID: string;
  TimeZone: string;
  IsTestEnvironment: boolean;
  RunningOnWatchtower: boolean;
  CurrentOrganizationUnit: OrganizationUnit;
}
