import { createActionGroup, props } from '@ngrx/store';
import { TyperSettings } from './settings.types';

export const SettingsActions = createActionGroup({
  source: 'Settings',
  events: {
    'save settings': props<{ typer: TyperSettings }>(),
  },
});
