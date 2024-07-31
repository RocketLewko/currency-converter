import { Component } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@Component({
  selector: 'root',
  standalone: true,
  imports: [MainLayoutComponent],
  template: `<main-layout />`,
})
export class AppComponent {}
