import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'amount-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './amount-input.component.html',
  styleUrl: './amount-input.component.scss',
})
export class AmountInputComponent {
  readonly id = input.required<string>();
  readonly controlValue = input.required<FormControl>();
}
