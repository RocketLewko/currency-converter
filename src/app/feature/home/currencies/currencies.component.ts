import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CurrenciesService } from './currencies.service';
import { CurrencyFormComponent } from '../../../components/currency-form/currency-form.component';
import { CurrencyTableComponent } from '../../../components/currency-table/currency-table.component';
import { DatePickerComponent } from '../../../components/date-picker/date-picker.component';
import { ExchangeRateTable } from '../../../models/exchange-rate.interface';
import { NoDataComponent } from '../../../patterns/no-data/no-data.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'currencies',
  standalone: true,
  imports: [
    CurrencyTableComponent,
    DatePickerComponent,
    CurrencyFormComponent,
    NoDataComponent,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss',
})
export class CurrenciesComponent {
  private readonly currenciesService = inject(CurrenciesService);

  readonly exchangeRateTable$: Observable<ExchangeRateTable | null> =
    this.currenciesService.exchangeRateTable$;
}