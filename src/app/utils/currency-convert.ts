import {
  ConversionResult,
  ExchangeRate,
} from '../models/exchange-rate.interface';

export function convertCurrency(
  exchangeRates: ExchangeRate[],
  exchangeForm: { amount: number; fromCurrency: string; toCurrency: string }
): ConversionResult {
  const { toCurrency, fromCurrency, amount } = exchangeForm;

  const fromRate = exchangeRates.find(
    (rate) => rate.code === fromCurrency
  )?.mid;
  const toRate = exchangeRates.find((rate) => rate.code === toCurrency)?.mid;

  let result = 0;
  if (fromRate && toRate) {
    result = Number(((amount * fromRate) / toRate).toFixed(2));
  }

  return { toCurrency, fromCurrency, amount, result };
}
