export interface TyperMask {
  title: string;
  mask: string;
  useWords: boolean;
}
export interface TyperSymbol {
  symbol: string;
  isError: boolean;
}

export interface TyperSettings {
  masks: Record<TyperMaskName, TyperMask>;
  activeMask: TyperMaskName;
  count: number;
  letters: number;
}

export type TyperMaskName = keyof typeof TYPER_MASKS;

export const TYPER_MASKS: Record<string, TyperMask> = {
  numbers: {
    title: 'numbers',
    mask: '0123456789',
    useWords: false,
  },
  'number worlds': {
    title: 'number worlds',
    mask: '0123456789 ',
    useWords: true,
  },
  letters: {
    title: 'letters',
    mask: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    useWords: false,
  },
  worlds: {
    title: 'worlds',
    mask: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ',
    useWords: true,
  },
};
