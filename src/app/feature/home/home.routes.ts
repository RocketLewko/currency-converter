import { Routes } from '@angular/router';

export default <Routes>[
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./currencies/currencies.component').then(
            (m) => m.CurrenciesComponent
          ),
      },
    ],
  },
];
