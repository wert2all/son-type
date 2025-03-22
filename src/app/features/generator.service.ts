import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GeneratorService {
  generate(count: number, mask: string): string[] {
    const result = [];
    if (mask.length !== 0) {
      while (result.length < count) {
        // eslint-disable-next-line sonarjs/pseudo-random
        const randomIndex = Math.floor(Math.random() * mask.length);
        const ramdomChar = mask.charAt(randomIndex);

        result.push(ramdomChar);
      }
    }

    return result;
  }
}
