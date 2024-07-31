import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'currency-result',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './currency-result.component.html',
  styleUrl: './currency-result.component.scss',
})
export class CurrencyResultComponent {
  readonly conversionResult = input.required<any>();
}
