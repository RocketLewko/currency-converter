import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'amount-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './amount-input.component.html',
  styleUrl: './amount-input.component.scss',
})
export class AmountInputComponent {
  readonly id = input.required<string>();
  readonly control = input.required<FormControl>();
}
