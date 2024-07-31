import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
} from '@angular/core';
import { ConversionResult, ExchangeRateTable, Rate } from '../../models/exchange-rate.interface';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

import { AmountInputComponent } from './components/amount-input/amount-input.component';
import { CurrenciesService } from '../../feature/home/currencies/currencies.service';
import { CurrencyResultComponent } from './components/currency-result/currency-result.component';
import { CurrencySelectComponent } from './components/currency-select/currency-select.component';
import { FORM_CONFIG } from './data/form-config';
import { PLN_CURRENCY } from './data/pln-currency';
import { convertCurrency } from '../utils/currency-convert';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class CurrencyFormComponent implements OnInit {
  readonly currencyData = input.required<ExchangeRateTable>();

  readonly destroyRef = inject(DestroyRef);
  readonly currenciesService = inject(CurrenciesService);
  readonly form = inject(FormBuilder).nonNullable.group(FORM_CONFIG);
  readonly changeDetectorRef = inject(ChangeDetectorRef);

  rates: Rate[] = [];
  conversionResult!: ConversionResult;

  ngOnInit(): void {
    this.currenciesService.exchangeRateTable$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((exchangeRateTable) => {
        if (exchangeRateTable) {
          this.rates = [PLN_CURRENCY, ...exchangeRateTable.rates];
          this.convert();
        }
      });
  }

  convert(): void {
    const conversionResult = convertCurrency(this.rates, this.form.getRawValue());
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
