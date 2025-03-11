import {
  Component,
  computed,
  HostListener,
  linkedSignal,
  signal,
} from '@angular/core';

enum SymbolState {
  Typed,
  Should,
  None,
}
@Component({
  standalone: true,
  selector: 'app-typer',
  templateUrl: './typer.component.html',
})
export class TyperComponent {
  SymbolState = SymbolState;

  private mask = signal('0123456789');
  private generated = computed(() =>
    this.generateString(100, this.mask()).map(symbol => ({
      symbol: symbol,
      state: SymbolState.None,
      isError: false,
    }))
  );

  typed = linkedSignal({
    source: () => this.generated(),
    computation: res => {
      const first = res.slice(0, 1)[0];

      return [{ ...first, state: SymbolState.Should }, ...res.slice(1)];
    },
  });
  private generateString(length: number, symbols: string): string[] {
    if (length <= 0 || symbols.length === 0) {
      return [];
    }

    const result = [];
    for (let i = 0; i < length; i++) {
      // eslint-disable-next-line sonarjs/pseudo-random
      const randomIndex = Math.floor(Math.random() * symbols.length);
      result.push(symbols.charAt(randomIndex));
    }
    return result;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.typed.update(values => {
      if (event.key != 'Enter') {
        const typedIndex = values.findIndex(
          v => v.state === SymbolState.Should
        );

        if (typedIndex != -1) {
          if (values[typedIndex].symbol === event.key) {
            values[typedIndex].state = SymbolState.Typed;
            if (values[typedIndex + 1]) {
              values[typedIndex + 1].state = SymbolState.Should;
            }
          } else {
            values[typedIndex].isError = true;
          }
        }
      }
      return values;
    });
  }
}
