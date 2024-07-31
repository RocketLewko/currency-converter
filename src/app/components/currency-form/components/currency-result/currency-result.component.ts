import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CurrencyConversionResult } from '../../../../models/exchange-rate.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'currency-result',
  standalone: true,
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './currency-result.component.html',
  styleUrl: './currency-result.component.scss',
})
export class CurrencyResultComponent {
  readonly conversionResult = input.required<CurrencyConversionResult>();
}
