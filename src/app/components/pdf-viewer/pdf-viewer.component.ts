import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from "html-to-pdfmake";
(<any>pdfMake).addVirtualFileSystem(pdfFonts);

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.pug',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnChanges {
  @Input() htmlContent: string = '';
  //viewerUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  viewerUrl: string = '';
  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(): void {
    this.showPDF(this.htmlContent);
  }

  showPDF(htmlContent: string): void {
    const pdfDocGenerator: any = pdfMake.createPdf({ content: htmlToPdfmake(htmlContent) });
    pdfDocGenerator.getBlob().then((data: Blob) => {
      //let url: string = '/assets/pdfjs/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(data));
      //this.viewerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.viewerUrl = URL.createObjectURL(data);
    });
  }
}
