import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { catchError, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { CurrencyRateTable } from '../../../models/exchange-rate.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private readonly apiUrl = 'http://api.nbp.pl/api/exchangerates/tables/A';
  private readonly http = inject(HttpClient);

  private readonly exchangeRateTableSubject = new BehaviorSubject<CurrencyRateTable | null>(null);
  exchangeRateTable$ = this.exchangeRateTableSubject.asObservable();

  private readonly selectedDateSubject = new BehaviorSubject<string>('');
  selectedDate$ = this.selectedDateSubject.asObservable();

  constructor() {
    this.selectedDate$
      .pipe(
        distinctUntilChanged(),
        switchMap((date) => this.getExchangeRatesByDate(date).pipe(catchError(() => of([]))))
      )
      .subscribe((data) => this.exchangeRateTableSubject.next(data[0]));
  }

  getExchangeRatesByDate(date: string): Observable<CurrencyRateTable[]> {
    const url = this.buildUrl(date);
    return this.http.get<CurrencyRateTable[]>(url);
  }

  setSelectedDate(date: string): void {
    this.selectedDateSubject.next(date);
  }

  private buildUrl(date: string): string {
    return date ? `${this.apiUrl}/${date}?format=json` : `${this.apiUrl}?format=json`;
  }
}
