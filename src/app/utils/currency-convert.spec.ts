import {
  ConversionResult,
  ExchangeRate,
} from '../models/exchange-rate.interface';

import { convertCurrency } from './currency-convert';

describe('convertCurrency', () => {
  const mockExchangeRates: ExchangeRate[] = [
    { code: 'PLN', mid: 1.0, currency: 'PLN' },
    { code: 'EUR', mid: 2.1, currency: 'EUR' },
  ];

  it('should convert currency correctly', () => {
    const exchangeForm = {
      fromCurrency: 'PLN',
      toCurrency: 'EUR',
      amount: 100,
    };
    const result: ConversionResult = convertCurrency(
      mockExchangeRates,
      exchangeForm
    );
    expect(result).toEqual({
      fromCurrency: 'PLN',
      toCurrency: 'EUR',
      amount: 100,
      result: 47.62,
    });
  });

  it('should return 0 result for zero amount', () => {
    const exchangeForm = { fromCurrency: 'USD', toCurrency: 'EUR', amount: 0 };
    const result: ConversionResult = convertCurrency(
      mockExchangeRates,
      exchangeForm
    );
    expect(result).toEqual({
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 0,
      result: 0,
    });
  });

  it('should return 0 result if fromCurrency rate is missing', () => {
    const exchangeForm = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
    };
    const result: ConversionResult = convertCurrency(
      mockExchangeRates,
      exchangeForm
    );
    expect(result).toEqual({
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
      result: 0,
    });
  });

  it('should return 0 result if toCurrency rate is missing', () => {
    const exchangeForm = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
    };
    const result: ConversionResult = convertCurrency(
      mockExchangeRates,
      exchangeForm
    );
    expect(result).toEqual({
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
      result: 0,
    });
  });
});
