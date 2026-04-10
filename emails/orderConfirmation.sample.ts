import { OrderConfirmationDataModel } from "@/lib/types";

export const orderConfirmationSample: OrderConfirmationDataModel = {
  TemplateName: "OrderPlacedConfirmation",
  Order: {
    ID: "762",
    CurrencyID: "EUR",
    TotalAmountInTax: 324.94,
    ShippingAddress: {
      FirstName: "Warren",
      LastName: "Langosh",
      StreetAndHouseNumber: "57208 Destiny Road 596",
      ZipCodeAndCity: "18495 West Mack",
      CountryID: "US",
    },
    BillingAddress: {
      FirstName: "Warren",
      LastName: "Langosh",
      StreetAndHouseNumber: "7053 Ciara Stravenue 23215",
      ZipCodeAndCity: "52568 West Israel",
      CountryID: "US",
    },
    Lines: [
      {
        ID: "765",
        Description: "Blue Wool Sweater",
        TotalQuantityToShip: 2,
        UnitPriceInTax: 49.99,
        TotalAmountInTax: 99.98,
        Type: "NormalProduct",
      },
      {
        ID: "769",
        Description: "Black Leather Boots",
        TotalQuantityToShip: 1,
        UnitPriceInTax: 149.99,
        TotalAmountInTax: 149.99,
        Type: "NormalProduct",
      },
      {
        ID: "773",
        Description: "Cotton Scarf",
        TotalQuantityToShip: 3,
        UnitPriceInTax: 24.99,
        TotalAmountInTax: 74.97,
        Type: "NormalProduct",
      },
    ],
  },
  User: {
    FirstName: "Warren",
    LastName: "Langosh",
    FullName: "Warren Langosh",
    Gender: "M",
    SingleSignOnOnly: false,
    AccountType: "Standard",
    EmailAddress: "warren.langosh@example.com",
    Company: {
      Name: "Langosh & Co.",
      VatNumber: "NL123456789B01",
      RegistrationNumber: "12345678",
    },
  },
  Data: {
    InvoiceData: {
      InvoiceNumber: "798789",
      PlacementDateTime: "2026-04-10T13:36:29.683Z",
    },
    Payments: {
      Payments: [
        {
          TypeName: "iDEAL",
          Amount: 324.94,
          Date: "2026-04-10T13:36:29.683Z",
        },
      ],
    },
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
    EmailAddress: "store@eva-example.com",
    PhoneNumber: "+31 20 123 4567",
    StreetAndHouseNumber: "Keizersgracht 123",
    ZipCodeAndCity: "1015 Amsterdam",
  },
};
