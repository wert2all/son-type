import { createFeature, createReducer } from '@ngrx/store';
import { SettingsState } from './settings.types';

const initState: SettingsState = {
  typer: {
    count: 10,
  },
};
export const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(initState),
});
