import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DATE_TYPE, getToday } from '../utils/date-formatter';

import { CurrenciesService } from '../../feature/home/currencies/currencies.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'date-picker',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent {
  private readonly currenciesService = inject(CurrenciesService);
  readonly dateType = DATE_TYPE;

  readonly maxDate = getToday();
  readonly selectedDate = this.maxDate;

  setDate(): void {
    this.currenciesService.setSelectedDate(this.selectedDate);
  }
}
