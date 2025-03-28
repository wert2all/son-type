import { Component, HostListener, output } from '@angular/core';

@Component({
  selector: 'app-shared-typer',
  templateUrl: './typer.component.html',
})
export class SharedTyperComponent {
  typed = output<string>();

  @HostListener('document:keypress', ['$event'])
  keyup(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      this.typed.emit(event.key);
    }
  }
}
