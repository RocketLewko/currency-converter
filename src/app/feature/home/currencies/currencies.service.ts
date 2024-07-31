import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { catchError, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { CurrencyRateTable } from '@models/exchange-rate.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private readonly apiUrl = 'https://api.nbp.pl/api/exchangerates/tables/A';
  private readonly http = inject(HttpClient);

  private readonly selectedDateSubject = new BehaviorSubject<string>('');

  readonly exchangeRateTable$ = this.selectedDateSubject.pipe(
    distinctUntilChanged(),
    switchMap((date) => (date ? this.getExchangeRatesByDate(date) : this.getExchangeRates())),
    map((rateTables) => (rateTables?.length ? rateTables[0] : null))
  );

  getExchangeRates(): Observable<CurrencyRateTable[] | null> {
    return this.http
      .get<CurrencyRateTable[] | null>(`${this.apiUrl}?format=json`)
      .pipe(catchError(() => of(null)));
  }

  getExchangeRatesByDate(date: string): Observable<CurrencyRateTable[] | null> {
    return this.http
      .get<CurrencyRateTable[] | null>(`${this.apiUrl}/${date}?format=json`)
      .pipe(catchError(() => of(null)));
  }

  setSelectedDate(date: string): void {
    this.selectedDateSubject.next(date);
  }
}
