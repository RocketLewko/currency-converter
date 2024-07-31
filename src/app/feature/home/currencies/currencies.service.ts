import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { catchError, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { CurrencyRateTable } from '@models/exchange-rate.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private readonly apiUrl = 'http://api.nbp.pl/api/exchangerates/tables/A';
  private readonly http = inject(HttpClient);

  private readonly selectedDateSubject = new BehaviorSubject<string>('');

  readonly exchangeRateTable$ = this.selectedDateSubject.pipe(
    distinctUntilChanged(),
    switchMap((date) => (date ? this.getExchangeRatesByDate(date) : this.getExchangeRates())),
    map((rateTables) => rateTables[0]),
    catchError(() => of(null))
  );

  getExchangeRates(): Observable<CurrencyRateTable[]> {
    return this.http.get<CurrencyRateTable[]>(`${this.apiUrl}?format=json`);
  }

  getExchangeRatesByDate(date: string): Observable<CurrencyRateTable[]> {
    return this.http.get<CurrencyRateTable[]>(`${this.apiUrl}/${date}?format=json`);
  }

  setSelectedDate(date: string): void {
    this.selectedDateSubject.next(date);
  }
}
