import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorGearSix } from '@ng-icons/phosphor-icons/regular';
import { Store } from '@ngrx/store';
import { SharedModalComponent } from '../../shared/modal/modal.component';
import { sharedFeatures } from '../../shared/store/shared.reducers';
import { SharedTyperComponent } from '../../shared/typer/typer.component';
import { SharedValueCardComponent } from '../../shared/value-card/value-card.component';
import { GeneratorService } from '../generator.service';
import { SettingsFormComponent } from '../settings/shared/form/form.component';
import { TypedCongratulationComponent } from '../typer/congratulation/congratulation.component';
import { TyperSymbol } from '../typer/typer.types';
interface UserType {
  current: TyperSymbol | null;
  typed: TyperSymbol[];
  should: TyperSymbol[];
}
@Component({
  standalone: true,
  templateUrl: './type-page.component.html',
  styleUrl: './type-page.component.scss',
  imports: [
    SharedTyperComponent,
    NgIconComponent,
    SharedModalComponent,
    SettingsFormComponent,
    TypedCongratulationComponent,
    SharedValueCardComponent,
  ],
  viewProviders: [provideIcons({ phosphorGearSix })],
})
export class TypePageComponent {
  private generator = inject(GeneratorService);
  private store = inject(Store);

  private settings = this.store.selectSignal(
    sharedFeatures.selectTyperSettings
  );
  private currentMask = computed(
    () => this.settings().masks[this.settings().activeMask]
  );
  private generated = computed(() =>
    this.generator.generate(
      this.settings().count,
      this.currentMask().mask,
      this.currentMask().useWords ? this.settings().letters : 0
    )
  );

  userType = linkedSignal({
    source: () => this.generated(),
    computation: (should): UserType => ({
      current: { symbol: should.slice(1)[0], isError: false },
      typed: [],
      should: should.map(symbol => ({ symbol: symbol, isError: false })),
    }),
  });

  openSettings = signal(false);
  currentType = signal<string | null>(null);
  isFinished = computed(() => false);
  rating = computed(() => null);

  constructor() {
    effect(() => {
      this.userType.update(values => {
        const typed = this.currentType();
        if (typed === null) return values;

        const current: TyperSymbol | null = values.current;
        console.log(current);
        if (current?.symbol === typed) {
          values.typed.push(current);
          values.current = values.should.slice(0, 1)[0];
          values.should = values.should.slice(1);
        } else {
          console.log(values.current);
          if (values.current) values.current.isError = true;
        }
        return values;
      });
    });
  }
  restartTask() {
    console.log('restart');
  }
}
