import { CurrenciesComponent } from './feature/home/currencies/currencies.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: CurrenciesComponent }],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
