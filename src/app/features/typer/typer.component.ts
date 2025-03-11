import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorPassword } from '@ng-icons/phosphor-icons/regular';
import { TyperInputComponent } from './input/input.component';
@Component({
  standalone: true,
  selector: 'app-typer-container',
  templateUrl: './typer.component.html',
  imports: [TyperInputComponent, NgIconComponent],
  viewProviders: [provideIcons({ phosphorPassword })],
})
export class TyperContainerComponent {}
