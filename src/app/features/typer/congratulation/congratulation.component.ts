import { Component, input } from '@angular/core';
import { SharedValueCardComponent } from '../../../shared/value-card/value-card.component';

@Component({
  standalone: true,
  selector: 'app-typed-congratulation',
  templateUrl: './congratulation.component.html',
  imports: [SharedValueCardComponent],
})
export class TypedCongratulationComponent {
  rating = input<string | null>(null);
}
