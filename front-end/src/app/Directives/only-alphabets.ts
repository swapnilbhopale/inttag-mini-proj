import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyAlphabets]',
})
export class OnlyAlphabets {
  constructor() {}

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (!/^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
    }
  }
}
