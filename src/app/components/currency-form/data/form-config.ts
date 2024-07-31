import { Validators } from '@angular/forms';

export const FORM_CONFIG = {
  amount: [1, [Validators.required, Validators.min(0)]],
  fromCurrency: ['PLN', Validators.required],
  toCurrency: ['EUR', Validators.required],
};
