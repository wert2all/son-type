/* eslint-disable sonarjs/pseudo-random */
import { Component, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { EMPTY, map, switchMap, take, timer } from 'rxjs';

interface SaluteDot {
  left: string;
  width: string;
  height: string;
  backgroundColor: string;
  animationDuration: string;
}

@Component({
  selector: 'app-salute',
  templateUrl: './salute.component.html',
  styleUrls: ['./salute.component.scss'],
})
export class SaluteComponent {
  show = input(false);

  private colors: string[] = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
  ];
  protected salute = signal<SaluteDot[]>([]);
  private timer$ = toObservable(this.show).pipe(
    switchMap(val => (val ? timer(0, 3000) : EMPTY)),
    map(() => this.generateFire(50)),
    take(20),
    takeUntilDestroyed()
  );

  constructor() {
    this.timer$.subscribe(dots => {
      this.salute.update(values => {
        values.push(...dots);
        return values;
      });
    });
  }

  private generateFire(count: number): SaluteDot[] {
    return Array(count)
      .fill(0)
      .map(() => ({
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
        backgroundColor: this.randomColor(),
        animationDuration: `${Math.random() * 3 + 2}s`,
      }));
  }

  private randomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
