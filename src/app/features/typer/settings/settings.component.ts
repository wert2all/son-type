import { Component, computed, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TyperMaskName, TyperSettings } from '../typer.types';
@Component({
  standalone: true,
  selector: 'app-typer-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
})
export class TyperSettingsComponent {
  settings = input.required<TyperSettings>();
  updated = output<TyperSettings>();

  protected masks = computed(() => Object.keys(this.settings().masks));
  protected form = new FormGroup({
    activeMask: new FormControl<TyperMaskName>('numbers'),
    count: new FormControl<number>(0),
    letters: new FormControl<number>(0),
  });

  constructor() {
    effect(() => {
      this.form.setValue({
        activeMask: this.settings().activeMask,
        count: this.settings().count,
        letters: this.settings().letters,
      });
    });
    effect(() => {
      this.form.valueChanges.subscribe(value => {
        const settings = this.settings();
        if (value.count != null && settings.count !== value.count) {
          this.updated.emit({ ...settings, count: value.count });
        }
        if (value.letters != null && settings.letters !== value.letters) {
          this.updated.emit({ ...settings, letters: value.letters });
        }
        if (
          value.activeMask != null &&
          settings.activeMask !== value.activeMask
        ) {
          this.updated.emit({ ...settings, activeMask: value.activeMask });
        }
      });
    });
  }
}
