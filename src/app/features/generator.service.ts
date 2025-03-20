import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GeneratorService {
  generate(length: number, symbols: string): string[] {
    if (length <= 0 || symbols.length === 0) {
      return [];
    }

    const result = [];
    for (let i = 0; i < length; i++) {
      // eslint-disable-next-line sonarjs/pseudo-random
      const randomIndex = Math.floor(Math.random() * symbols.length);
      const ramdomChar = symbols.charAt(randomIndex);

      result.push(ramdomChar);
    }
    return result;
  }
}
