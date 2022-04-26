import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-editor',
  templateUrl: './pdf-editor.component.pug',
  styleUrls: ['./pdf-editor.component.scss']
})
export class PdfEditorComponent implements OnInit {
  htmlContent: string = `<div>
  <h1>My title</h1>
  <p>
    This is a sentence with a <strong>bold word</strong>, <em>one in italic</em>,
    and <u>one with underline</u>. And finally <a href="https://www.somewhere.com">a link</a>.
  </p>
</div>`;

  constructor() { }

  ngOnInit(): void {}
}
