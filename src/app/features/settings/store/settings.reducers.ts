import { createFeature, createReducer, on } from '@ngrx/store';
import { TYPER_MASKS } from '../../typer/typer.types';
import { SettingsActions } from './settings.actions';
import { SettingsState } from './settings.types';

const initState: SettingsState = {
  typer: {
    masks: TYPER_MASKS,
    activeMask: 'numbers',
    count: 10,
    letters: 5,
  },
};
export const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initState,

    on(
      SettingsActions.saveSettings,
      (state, { typer }): SettingsState => ({
        ...state,
        typer: typer,
      })
    )
  ),
});
