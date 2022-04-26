import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.pug',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {
  iframeContent: SafeResourceUrl = ''
  codeJS: any = `let onTextClick = () => {
    console.log('clicked')
  }`;
  codeHTML: any = `<p onClick="onTextClick()">Sample text</p>`;
  codeCSS: any = `p { color: red; }`;

  optionsJS: any = { lineNumbers: true, theme: 'material', mode: 'javascript' };
  optionsHTML: any = { lineNumbers: true, theme: 'material', mode: 'text/html', htmlMode: true };
  optionsCSS: any = { lineNumbers: true, theme: 'material', mode: 'text/css' };

  constructor(private san: DomSanitizer) { }

  ngOnInit(): void {
    this.runIframe();
    let iframe: any = document.getElementById('preview');
    /*
    let iWindow = (iframe.contentWindow || iframe.contentDocument);
    iWindow.onerror = (error: string, url: string, line: string) => {
      console.log({ acc: 'error', data: 'ERR:' + error + ' URL:' + url + ' L:' + line });
      return false;
    };
    (window as any).onerror = (error: string, url: string, line: string): any => {
      console.log({ acc: 'error', data: 'ERR:' + error + ' URL:' + url + ' L:' + line });
    };*/
  }

  onChange() {
    this.runIframe();
  }

  logError(){
    console.log('k')
  }

  runIframe() {
    this.iframeContent = this.san.bypassSecurityTrustResourceUrl(
      `data:text/html;charset=utf-8,<html><head><style>${this.codeCSS}</style></head>
      <body>${this.codeHTML}<script>${this.codeJS}</script></body></html>`
    )

    /*let iframe: any = document.getElementById('preview');
    let lll = 
      `<html><head><style>${this.codeCSS}</style><script>(()=>{${this.codeJS}})()</script></head>
      <body>${this.codeHTML}</body></html>`
      let doc = iframe.contentWindow.document;
      doc.open();
      doc.write(lll);
      doc.close();*/
  }

}
