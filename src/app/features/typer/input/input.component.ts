import {
  Component,
  computed,
  HostListener,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { GeneratorService } from '../../generator.service';
import { TyperSymbol } from '../typer.types';

@Component({
  selector: 'app-typer-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class TyperInputComponent {
  private generator = inject(GeneratorService);
  private mask = signal('0123456789');
  private generated = computed(() => {
    return this.generator.generate(100, this.mask()).map(symbol => ({
      symbol: symbol,
      isError: false,
    }));
  });

  typed = signal<TyperSymbol[]>([]);
  currentType = linkedSignal({
    source: () => this.generated(),
    computation: generated => generated.slice(0, 1)[0],
  });
  should = linkedSignal({
    source: () => this.generated(),
    computation: generated => generated.slice(1),
  });

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.typed.update(values => {
      if (event.key != 'Enter') {
        const current: TyperSymbol | undefined = this.currentType();
        if (current?.symbol === event.key) {
          this.typed.update(values => {
            values.push(current);
            return values;
          });
          this.currentType.set(this.should().slice(0, 1)[0]);
          this.should.update(values => values.slice(1));
        } else {
          this.currentType.update(current => {
            current.isError = true;
            return current;
          });
        }
      }
      return values;
    });
  }
}
