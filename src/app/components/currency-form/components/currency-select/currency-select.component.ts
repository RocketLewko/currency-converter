import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ExchangeRate } from '../../../../models/exchange-rate.interface';

@Component({
  selector: 'currency-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './currency-select.component.html',
  styleUrl: './currency-select.component.scss',
})
export class CurrencySelectComponent {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly control = input.required<FormControl>();
  readonly rates = input.required<ExchangeRate[]>();
}
