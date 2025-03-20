import { Component, input, linkedSignal, output, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorPassword } from '@ng-icons/phosphor-icons/regular';
import { TyperMask } from '../typer.types';

@Component({
  standalone: true,
  selector: 'app-typer-menu',
  templateUrl: './menu.component.html',
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ phosphorPassword })],
})
export class TyperMenuComponent {
  masks = input.required<TyperMask[]>();
  updateCurrentMask = output<TyperMask>();

  currentMask = linkedSignal({
    source: () => this.masks(),
    computation: masks => {
      const current = masks[0];
      this.updateCurrentMask.emit(current);
      return current;
    },
  });
  isOpened = signal(false);

  updateCurrent(mask: TyperMask) {
    this.currentMask.set(mask);
    this.updateCurrentMask.emit(mask);
    this.isOpened.set(false);
  }
}
