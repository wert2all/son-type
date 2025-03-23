import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

import { AsyncPipe } from '@angular/common';
import {
  BehaviorSubject,
  filter,
  map,
  Subject,
  tap,
  withLatestFrom,
} from 'rxjs';
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
    AsyncPipe,
  ],
  viewProviders: [provideIcons({ phosphorGearSix })],
})
export class TypePageComponent {
  private generator = inject(GeneratorService);
  private store = inject(Store);

  openSettings = signal(false);
  rating = signal('10');
  isFinished = signal(false);

  type$ = new Subject<string | null>();
  restartTask = new BehaviorSubject(true);
  currentIndex$ = new BehaviorSubject<number>(0);
  currentError$ = new BehaviorSubject<boolean>(false);

  private generated$ = this.restartTask.pipe(
    filter(restart => restart),
    tap(() => {
      this.currentIndex$.next(0);
    }),
    withLatestFrom(this.store.select(sharedFeatures.selectTyperSettings)),
    map(([, settings]) => ({
      count: settings.count,
      mask: settings.masks[settings.activeMask].mask,
      letters: settings.masks[settings.activeMask].useWords
        ? settings.letters
        : 0,
    })),
    map(arg => this.generator.generate(arg.count, arg.mask, arg.letters))
  );

  private userType$ = this.type$.pipe(
    filter(symbol => symbol != null && symbol != undefined)
  );

  current$ = this.currentIndex$.pipe(
    withLatestFrom(this.generated$),
    map(([index, generated]) => generated[index])
  );

  typed$ = this.currentIndex$.pipe(
    withLatestFrom(this.generated$),
    map(([index, generated]) => generated.slice(0, index))
  );

  should$ = this.currentIndex$.pipe(
    withLatestFrom(this.generated$),
    tap(([, g]) => console.log('generated ', g)),
    map(([index, generated]) => generated.slice(index))
  );

  constructor() {
    this.userType$
      .pipe(takeUntilDestroyed(), withLatestFrom(this.current$))
      .subscribe(([type, current]) => {
        if (type === current) {
          this.currentIndex$.next(this.currentIndex$.getValue() + 1);
        }
        this.currentError$.next(type !== current);
      });
  }
}
