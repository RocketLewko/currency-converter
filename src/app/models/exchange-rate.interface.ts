export interface CurrencyRate {
  currency: string;
  code: string;
  mid: number;
}

export interface CurrencyRateTable {
  table: string;
  no: string;
  effectiveDate: string;
  rates: CurrencyRate[];
}

export interface CurrencyRateDetail {
  currency: string;
  code: string;
  mid: number;
}

export interface CurrencyConversionResult {
  toCurrency: string;
  fromCurrency: string;
  amount: number;
  result: number;
}
