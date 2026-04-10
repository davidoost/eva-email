import { DiscountCouponDataModel } from "@/lib/types";

export const discountCouponSample: DiscountCouponDataModel = {
  TemplateName: "DiscountCouponEmail",
  CouponCode: "WELCOME10",
  OriginatingDiscount: {
    Description: "10% welcome discount",
    MarketingDescription: "Get 10% off your next purchase — just for you!",
    CampaignName: "Welcome Campaign",
  },
  OriginatingOrder: {
    ID: "953",
    CurrencyID: "EUR",
    TotalAmountInTax: 324.94,
  },
  OriginatingAppointment: {
    ID: "123",
    EventID: "456",
    EventName: "Spring Styling Consultation",
    Date: "2026-04-10T13:44:38.882Z",
    Duration: 60,
    Description: "Personal styling session",
  },
  Customer: {
    FirstName: "Awesome",
    LastName: "Awesomnest",
    FullName: "Awesome Awesomnest",
    Gender: "M",
    SingleSignOnOnly: false,
    AccountType: "Standard",
    EmailAddress: "awesome@example.com",
  },
  AssetsUrl: "https://assets.eva-online.cloud",
  LanguageID: "en",
  CountryID: "NL",
  TimeZone: "Europe/Amsterdam",
  IsTestEnvironment: false,
  RunningOnWatchtower: false,
  CurrentOrganizationUnit: {
    Name: "EVA Store Amsterdam",
    BackendID: "eva-amsterdam",
  },
};
