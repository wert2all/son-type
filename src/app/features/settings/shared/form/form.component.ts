import { Component, computed, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TyperMaskName } from '../../../typer/typer.types';
import { SettingsActions } from '../../store/settings.actions';
import { settingsFeature } from '../../store/settings.reducers';
@Component({
  standalone: true,
  selector: 'app-shared-settings-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class SettingsFormComponent {
  private store = inject(Store);

  protected typerSettings = this.store.selectSignal(
    settingsFeature.selectTyper
  );
  protected masks = computed(() => Object.keys(this.typerSettings().masks));
  protected form = new FormGroup({
    activeMask: new FormControl<TyperMaskName>('numbers'),
    count: new FormControl<number>(0),
    letters: new FormControl<number>(0),
  });

  constructor() {
    effect(() => {
      this.form.setValue({
        activeMask: this.typerSettings().activeMask,
        count: this.typerSettings().count,
        letters: this.typerSettings().letters,
      });
    });
    effect(() => {
      this.form.valueChanges.subscribe(value => {
        let typerSettings = this.typerSettings();
        if (value.count != null && typerSettings.count !== value.count) {
          typerSettings = { ...typerSettings, count: Number(value.count) };
        }
        if (value.letters != null && typerSettings.letters !== value.letters) {
          typerSettings = { ...typerSettings, letters: Number(value.letters) };
        }
        if (
          value.activeMask != null &&
          typerSettings.activeMask !== value.activeMask
        ) {
          typerSettings = { ...typerSettings, activeMask: value.activeMask };
        }

        this.store.dispatch(
          SettingsActions.saveSettings({ typer: typerSettings })
        );
      });
    });
  }
}
