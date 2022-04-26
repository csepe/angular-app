import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import Quill from "quill";

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.pug',
  styleUrls: ['./quill-editor.component.scss']
})
export class QuillEditorComponent implements AfterViewInit {
  @ViewChild('editor') editor!: ElementRef;
  @Input() htmlContent: string = '';
  @Output() htmlContentChange = new EventEmitter<string>();

  constructor() { }

  ngAfterViewInit(): void {
    this.initQuill(this.htmlContent)
  }

  initQuill(content: string): void {
    let options = {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    };
    let quill = new Quill(this.editor.nativeElement, options);
    //quill.root.setAttribute('spellcheck', 'false');
    const delta = quill.clipboard.convert(content as any);
    quill.setContents(delta, 'silent');

    quill.on('text-change', () => {
      content = quill.root.innerHTML;
      this.htmlContentChange.emit(content);
    });
  }

}
