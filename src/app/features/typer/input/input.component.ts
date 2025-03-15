import {
  Component,
  computed,
  HostListener,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { GeneratorService } from '../../generator.service';
import { TyperMask, TyperSymbol } from '../typer.types';

@Component({
  selector: 'app-typer-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class TyperInputComponent {
  mask = input.required<TyperMask | null>();

  private generator = inject(GeneratorService);
  private generated = computed(() =>
    this.generator.generate(100, this.mask()?.mask || '').map(symbol => ({
      symbol: symbol,
      isError: false,
    }))
  );

  typed = signal<TyperSymbol[]>([]);
  currentType = linkedSignal({
    source: () => this.generated(),
    computation: (generated): TyperSymbol | undefined =>
      generated.slice(0, 1)[0],
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
            if (current) {
              current.isError = true;
            }
            return current;
          });
        }
      }
      return values;
    });
  }
}
