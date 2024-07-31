import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'no-data',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.scss',
})
export class NoDataComponent {}
