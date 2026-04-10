import { LoyaltyPointsMutatedDataModel } from "@/lib/types";

export const loyaltyPointsMutatedSample: LoyaltyPointsMutatedDataModel = {
  TemplateName: "LoyaltyPointsMutated",
  LoyaltyProgram: {
    LoyaltyProgramID: "1",
    BackendID: "rewards",
    Name: "EVA Rewards",
  },
  Order: {
    ID: "1022",
    CurrencyID: "EUR",
    TotalAmountInTax: 324.94,
  },
  User: {
    FirstName: "Wendy",
    LastName: "Prohaska",
    FullName: "Wendy Prohaska",
    Gender: "F",
    SingleSignOnOnly: false,
    AccountType: "Standard",
    EmailAddress: "wendy.prohaska@example.com",
  },
  CurrentLoyaltyBalance: 1075,
  Deposits: [
    {
      Description: "Purchase reward",
      Points: 125,
    },
  ],
  Withdrawals: [
    {
      Description: "Coupon redemption",
      Points: 50,
    },
  ],
  GeneratedCouponCode: "REWARD2026",
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
