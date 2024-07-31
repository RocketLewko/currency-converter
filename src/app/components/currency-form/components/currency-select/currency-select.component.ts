import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';

import { CurrencyRate } from '@models/currency-rate.interface';

@Component({
  selector: 'currency-select',
  standalone: true,
  imports: [UpperCasePipe, TitleCasePipe, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './currency-select.component.html',
  styleUrl: './currency-select.component.scss',
})
export class CurrencySelectComponent {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly controlValue = input.required<FormControl>();
  readonly rates = input.required<CurrencyRate[]>();
}
