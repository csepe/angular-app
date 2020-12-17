import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.pug',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() errorMessage: any = '';

  constructor() { }
}
