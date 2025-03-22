import { Component, computed, inject, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorGearSix,
  phosphorPassword,
} from '@ng-icons/phosphor-icons/regular';
import { Store } from '@ngrx/store';
import { SharedModalComponent } from '../../shared/modal/modal.component';
import { sharedFeatures } from '../../shared/store/shared.reducers';
import { SaluteComponent } from '../salute/salute.component';
import { SettingsFormComponent } from '../settings/shared/form/form.component';
import { TypedCongratulationComponent } from './congratulation/congratulation.component';
import { TyperInputComponent } from './input/input.component';
import { TyperSymbol } from './typer.types';

@Component({
  standalone: true,
  selector: 'app-typer-container',
  templateUrl: './typer.component.html',
  imports: [
    TyperInputComponent,
    SaluteComponent,
    SharedModalComponent,
    NgIconComponent,
    SettingsFormComponent,
    TypedCongratulationComponent,
  ],
  viewProviders: [provideIcons({ phosphorPassword, phosphorGearSix })],
})
export class TyperContainerComponent {
  private store = inject(Store);

  isFinished = signal(false);
  restartTick = signal<number>(0);
  openSettings = signal(false);
  settings = this.store.selectSignal(sharedFeatures.selectTyperSettings);

  protected currentMask = computed(
    () => this.settings().masks[this.settings().activeMask]
  );
  rating = signal<number | null>(null);

  restartTask() {
    this.isFinished.set(false);
    this.restartTick.set(Math.floor(Date.now() / 1000));
  }

  finished(typed: TyperSymbol[]) {
    const errors =
      this.settings().count - typed.filter(symbol => symbol.isError).length;

    this.rating.set(Math.floor((errors / this.settings().count) * 10));
    this.isFinished.set(true);
  }
}
