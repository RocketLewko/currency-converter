export interface ExchangeRate {
  currency: string;
  code: string;
  mid: number;
}

export interface ExchangeRateTable {
  table: string;
  no: string;
  effectiveDate: string;
  rates: ExchangeRate[];
}

export interface Rate {
  currency: string;
  code: string;
  mid: number;
}

export interface ConversionResult {
  toCurrency: string;
  fromCurrency: string;
  amount: number;
  result: number;
}
