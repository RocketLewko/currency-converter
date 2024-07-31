import { CurrencyConversionResult, CurrencyRate } from '@models/currency-rate.interface';

function findRate(rates: CurrencyRate[], code: string): number | undefined {
  return rates.find((rate) => rate.code === code)?.mid;
}

function calculateResult(amount: number, fromRate: number, toRate: number): number {
  return Number(((amount * fromRate) / toRate).toFixed(2));
}

function buildConversionResult(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  result: number
): CurrencyConversionResult {
  return { amount, fromCurrency, toCurrency, result };
}

export function convertCurrency(
  exchangeRates: CurrencyRate[],
  exchangeForm: CurrencyConversionResult
): CurrencyConversionResult {
  const { toCurrency, fromCurrency, amount } = exchangeForm;

  const fromRate = findRate(exchangeRates, fromCurrency);
  const toRate = findRate(exchangeRates, toCurrency);

  let result = 0;
  if (fromRate && toRate) {
    result = calculateResult(amount, fromRate, toRate);
  }

  return buildConversionResult(amount, fromCurrency, toCurrency, result);
}
