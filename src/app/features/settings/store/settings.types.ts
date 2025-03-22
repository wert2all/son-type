import { TyperMask, TyperMaskName } from '../../typer/typer.types';


export interface SettingsState {
  typer: TyperSettings;
}

export interface TyperSettings {
  masks: Record<TyperMaskName, TyperMask>;
  activeMask: TyperMaskName;
  count: number;
  letters: number;
}
