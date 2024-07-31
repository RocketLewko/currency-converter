import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { CurrenciesService } from './currencies.service';
import { CurrencyFormComponent } from '@components/currency-form/currency-form.component';
import { CurrencyRateTable } from '@models/exchange-rate.interface';
import { CurrencyTableComponent } from '@components/currency-table/currency-table.component';
import { DatePickerComponent } from '@components/date-picker/date-picker.component';
import { NoDataComponent } from '@patterns/no-data/no-data.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'currencies',
  standalone: true,
  imports: [
    CurrencyTableComponent,
    DatePickerComponent,
    CurrencyFormComponent,
    NoDataComponent,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss',
})
export class CurrenciesComponent {
  private readonly currenciesService = inject(CurrenciesService);

  readonly exchangeRateTable$: Observable<CurrencyRateTable | null> =
    this.currenciesService.exchangeRateTable$;
}
