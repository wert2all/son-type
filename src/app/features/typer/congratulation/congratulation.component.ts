import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-typed-congratulation',
  templateUrl: './congratulation.component.html',
})
export class TypedCongratulationComponent {
  rating = input<number | null>(null);
}
