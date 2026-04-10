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
}

export interface OrderConfirmationDataModel {
  TemplateName: string;
  Order: OrderConfirmationOrder;
  User: User;
  Data: {
    InvoiceData?: OrderConfirmationInvoiceData;
    Payments?: {
      Payments?: OrderConfirmationPayment[];
    };
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

export type DigitalGiftCardSenderMessageDataModel = DigitalGiftCardMessageDataModel;

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
