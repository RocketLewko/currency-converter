import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CurrencyRateTable } from '@models/currency-rate.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'currency-table',
  standalone: true,
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './currency-table.component.html',
  styleUrl: './currency-table.component.scss',
})
export class CurrencyTableComponent {
  readonly currencyData = input.required<CurrencyRateTable>();

  getTitle(): string {
    return `Tabela kursów średnich NBP nr ${this.currencyData()?.no} z dnia ${
      this.currencyData()?.effectiveDate
    }`;
  }
}
