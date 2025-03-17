/* eslint-disable sonarjs/pseudo-random */
import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { takeWhile, timer } from 'rxjs';

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
  private colors: string[] = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
  ];
  private picks = signal(0);
  private timer$ = timer(0, 4000).pipe(
    takeUntilDestroyed(),
    takeWhile(() => this.picks() < 10)
  );
  salute = signal<SaluteDot[]>([]);

  constructor() {
    this.timer$.subscribe(() => {
      this.salute.update(values => {
        values.push(...this.generateFire(50));
        return values;
      });
      this.picks.update(value => value + 1);
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
