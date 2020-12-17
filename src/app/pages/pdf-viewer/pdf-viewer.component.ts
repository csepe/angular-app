import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import Quill from "quill";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.pug',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    let htmlContent = `<div>
      <h1>My title</h1>
      <p>
        This is a sentence with a <strong>bold word</strong>, <em>one in italic</em>,
        and <u>one with underline</u>. And finally <a href="https://www.somewhere.com">a link</a>.
      </p>
    </div>`;

    let viewer: any = document.getElementById('pdf-viwer');
    let showPDF = (htmlContent) => {
      const pdfDocGenerator = pdfMake.createPdf({ content: htmlToPdfmake(htmlContent) });
      pdfDocGenerator.getBlob((data) => {
        let viewerUrl = '/assets/pdfjs/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(data));
        viewer.src = viewerUrl;
      });
    }
    //pdfMake.createPdf(dd).download();
    showPDF(htmlContent);

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
    let quill = new Quill('#editor', options);
    quill.root.setAttribute('spellcheck', false);
    const delta = quill.clipboard.convert(htmlContent);
    quill.setContents(delta, 'silent');

    quill.on('text-change', () => {
      htmlContent = quill.root.innerHTML;
      showPDF(htmlContent);
    });

  }

}
