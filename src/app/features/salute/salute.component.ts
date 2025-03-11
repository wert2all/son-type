/* eslint-disable sonarjs/pseudo-random */
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { map, timer } from 'rxjs';

@Component({
  selector: 'app-salute',
  templateUrl: './salute.component.html',
  styleUrls: ['./salute.component.scss'],
  imports: [AsyncPipe],
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

  salute$ = timer(0, 4000).pipe(
    map(() =>
      Array(50)
        .fill(0)
        .map(() => ({
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          backgroundColor: this.randomColor(),
          animationDuration: `${Math.random() * 3 + 2}s`,
        }))
    )
  );

  private randomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
