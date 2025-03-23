import { A11yModule } from '@angular/cdk/a11y';
import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  linkedSignal,
  output,
  ViewChild,
} from '@angular/core';
import { AutofocusDirective } from '../../../shared/directives/autofocus.directive';
import { SharedValueCardComponent } from '../../../shared/value-card/value-card.component';
import { GeneratorService } from '../../generator.service';
import { TyperMask, TyperSymbol } from '../typer.types';

@Component({
  selector: 'app-typer-input',
  imports: [SharedValueCardComponent, A11yModule, AutofocusDirective],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class TyperInputComponent {
  mask = input.required<TyperMask | null>();
  count = input(100);
  wordLength = input(0);
  restart = input<number>();
  finished = output<TyperSymbol[]>();

  @ViewChild('inputField')
  private inputField?: ElementRef;

  private generator = inject(GeneratorService);
  private generated = computed(() => {
    this.restart();
    this.setFocusToInput();
    const count = this.count();

    return this.generator
      .generate(count, this.mask()?.mask || '', this.wordLength())
      .map(symbol => ({
        symbol: symbol,
        isError: false,
      }));
  });

  typed = linkedSignal({
    source: () => this.generated(),
    computation: (): TyperSymbol[] => [],
  });
  currentType = linkedSignal({
    source: () => this.generated(),
    computation: (generated): TyperSymbol | undefined =>
      generated.slice(0, 1)[0],
  });
  should = linkedSignal({
    source: () => this.generated(),
    computation: generated => generated.slice(1),
  });

  private isFinished = computed(
    () =>
      this.count() !== 0 &&
      this.should().length === 0 &&
      this.typed().length === this.count()
  );

  constructor() {
    effect(() => {
      if (this.isFinished()) {
        this.finished.emit(this.typed());
      }
    });
  }

  setFocusToInput() {
    console.log('setFocusToInput');
    this.inputField?.nativeElement.focus();
  }

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
