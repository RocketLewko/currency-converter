import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { DecimalPipe } from '@angular/common';
import { ExchangeRateTable } from '../../models/exchange-rate.interface';

@Component({
  selector: 'currency-table',
  standalone: true,
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './currency-table.component.html',
  styleUrl: './currency-table.component.scss',
})
export class CurrencyTableComponent {
  readonly currencyData = input.required<ExchangeRateTable>();

  getTitle(): string {
    return `Tabela kursów średnich NBP nr ${this.currencyData()?.no} z dnia ${
      this.currencyData()?.effectiveDate
    }`;
  }
}
