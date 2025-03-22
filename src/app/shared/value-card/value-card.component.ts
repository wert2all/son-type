import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-shared-value-card',
  templateUrl: './value-card.component.html',
})
export class SharedValueCardComponent {
  value = input.required<string>();
  textClass = input('');
}
