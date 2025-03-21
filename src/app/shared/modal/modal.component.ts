import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  input,
  output,
  ViewChild,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-shared-modal',
  templateUrl: './modal.component.html',
})
export class SharedModalComponent implements AfterViewInit {
  @ViewChild('modal', { read: ElementRef })
  private modal: ElementRef<HTMLDialogElement> | null = null;
  show = input.required<boolean>();
  closeOnPrimary = input(false);
  primaryButtonTitle = input('Close');

  title = input<string>();
  closed = output<boolean>();
  primary = output();

  constructor() {
    effect(() => {
      this.updateWindowState(this.show());
    });
  }

  ngAfterViewInit(): void {
    this.updateWindowState(this.show());
    this.modal?.nativeElement.addEventListener('close', () => {
      this.closed.emit(true);
    });
  }

  protected primaryAction() {
    if (this.closeOnPrimary()) {
      this.modal?.nativeElement.close();
      this.closed.emit(true);
    }
    this.primary.emit();
  }

  private updateWindowState(isShow: boolean) {
    // eslint-disable-next-line sonarjs/no-selector-parameter
    if (isShow) {
      this.modal?.nativeElement.showModal();
    } else {
      this.modal?.nativeElement.close();
    }
  }
}
