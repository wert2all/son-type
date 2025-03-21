import { Component, computed, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorGearSix,
  phosphorPassword,
} from '@ng-icons/phosphor-icons/regular';
import { SharedModalComponent } from '../../shared/modal/modal.component';
import { SaluteComponent } from '../salute/salute.component';
import { TyperInputComponent } from './input/input.component';
import { TyperSettingsComponent } from './settings/settings.component';
import { TYPER_MASKS, TyperSettings } from './typer.types';

@Component({
  standalone: true,
  selector: 'app-typer-container',
  templateUrl: './typer.component.html',
  imports: [
    TyperInputComponent,
    SaluteComponent,
    SharedModalComponent,
    NgIconComponent,
    TyperSettingsComponent,
  ],
  viewProviders: [provideIcons({ phosphorPassword, phosphorGearSix })],
})
export class TyperContainerComponent {
  isFinished = signal(false);
  restartTick = signal<number>(0);
  openSettings = signal(false);
  settings = signal<TyperSettings>({
    masks: TYPER_MASKS,
    activeMask: 'numbers',
    count: 10,
    letters: 5,
  });

  protected currentMask = computed(
    () => this.settings().masks[this.settings().activeMask]
  );

  restartTask() {
    this.restartTick.set(Math.floor(Date.now() / 1000));
  }
}
