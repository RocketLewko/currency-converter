import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
} from '@angular/core';
import { CurrencyConversionResult, CurrencyRateDetail } from '@models/currency-rate.interface';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

import { AmountInputComponent } from './components/amount-input/amount-input.component';
import { CurrenciesService } from '@feature/home/currencies/currencies.service';
import { CurrencyResultComponent } from './components/currency-result/currency-result.component';
import { CurrencySelectComponent } from './components/currency-select/currency-select.component';
import { FORM_CONFIG } from './data/form-config';
import { PLN_CURRENCY } from './data/pln-currency';
import { convertCurrency } from '../utils/currency-convert';

@Component({
  selector: 'currency-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CurrencySelectComponent,
    AmountInputComponent,
    CurrencyResultComponent,
  ],
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyFormComponent {
  readonly rates = input.required({
    transform: (values: CurrencyRateDetail[]) => [PLN_CURRENCY, ...values],
  });

  readonly destroyRef = inject(DestroyRef);
  readonly currenciesService = inject(CurrenciesService);
  readonly form = inject(FormBuilder).nonNullable.group(FORM_CONFIG);
  readonly changeDetectorRef = inject(ChangeDetectorRef);

  conversionResult!: CurrencyConversionResult;

  constructor() {
    effect(() => {
      this.convert(this.rates());
    });
  }

  convert(rates: CurrencyRateDetail[]): void {
    const conversionResult = convertCurrency(rates, this.form.getRawValue());
    this.conversionResult = conversionResult;
    this.changeDetectorRef.detectChanges();
  }

  onSwitchCurrencies(): void {
    const { toCurrency, fromCurrency } = this.form.value;
    this.form.patchValue({
      fromCurrency: toCurrency,
      toCurrency: fromCurrency,
    });
  }

  get fromCurrencyControl(): FormControl {
    return this.form.get('fromCurrency') as FormControl;
  }

  get toCurrencyControl(): FormControl {
    return this.form.get('toCurrency') as FormControl;
  }

  get amountControl(): FormControl {
    return this.form.get('amount') as FormControl;
  }
}
