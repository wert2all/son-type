import { Injectable } from '@angular/core';

const WORD_SEPARATOR = ' ';

@Injectable({ providedIn: 'root' })
export class GeneratorService {
  generate(count: number, mask: string, maxWordLength = 0): string[] {
    const result = [];
    if (mask.length !== 0) {
      while (result.length < count) {
        // eslint-disable-next-line sonarjs/pseudo-random
        const randomIndex = Math.floor(Math.random() * mask.length);
        const ramdomChar = mask.charAt(randomIndex);
        if (maxWordLength) {
          const word = this.getWord(result);
          if (word.length >= maxWordLength) {
            result.push(WORD_SEPARATOR);
          }
        }
        result.push(ramdomChar);
      }
    }

    return result;
  }
  private getWord(result: string[]): string {
    return result.join('').split(WORD_SEPARATOR).pop() || '';
  }
}
