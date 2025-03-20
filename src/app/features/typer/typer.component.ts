import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { phosphorPassword } from '@ng-icons/phosphor-icons/regular';
import { SaluteComponent } from '../salute/salute.component';
import { TyperInputComponent } from './input/input.component';
import { TyperMenuComponent } from './menu/menu.component';
import { TyperMask } from './typer.types';

@Component({
  standalone: true,
  selector: 'app-typer-container',
  templateUrl: './typer.component.html',
  imports: [TyperInputComponent, TyperMenuComponent, SaluteComponent],
  viewProviders: [provideIcons({ phosphorPassword })],
})
export class TyperContainerComponent {
  masks = signal<TyperMask[]>([
    { title: 'numbers', mask: '0123456789' },
    { title: 'number worlds', mask: '0123456789 ' },
    { title: 'letters', mask: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
    { title: 'worlds', mask: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ' },
  ]);
  currentMask = signal<TyperMask | null>(null);
  isFinished = signal(false);
}
