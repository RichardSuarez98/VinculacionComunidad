import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-certificado-tutor',
  templateUrl: './certificado-tutor.component.html',
  styleUrls: ['./certificado-tutor.component.css']
})
export class CertificadoTutorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public list:any,) { }

  fechaGeneracion!: Date
  identificacion!: string
  maxFecha!: Date
  minFecha!: Date
  nomAnioLectivo!: string
  nombreEstudiante!: string
  nombreCarrera!: string
  nombreDocente!: string
  tituloProyecto!: string
  totalHoras!: number

  ngOnInit(): void {
    console.log(this.list);
    this.fechaGeneracion=this.list.fechaGeneracion
    this.identificacion=this.list.identificacion
    this.maxFecha=this.list.maxFecha
    this.minFecha=this.list.minFecha
    this.nomAnioLectivo=this.list.nomAnioLectivo
    this.nombreCarrera=this.list.nombreCarrera
    this.nombreDocente=this.list.nombreDocente
    this.nombreEstudiante=this.list.nombreEstudiante
    this.tituloProyecto=this.list.tituloProyecto
    this.totalHoras=this.list.totalHoras
  }



  async pol(){
    const input = document.getElementById('htmlData');
    html2canvas(input!, { useCORS: true, allowTaint: true, scrollY: 0 }).then((canvas) => {
      const image = { type: 'jpeg', quality: 0.98 };
      const margin = [0.5, 0.5];
      const filename = 'myfile.pdf';

      var imgWidth = 8.5;
      var pageHeight = 11;

      var innerPageWidth = imgWidth - margin[0] * 2;
      var innerPageHeight = pageHeight - margin[1] * 2;

      // Calculate the number of pages.
      var pxFullHeight = canvas.height;
      var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
      var nPages = Math.ceil(pxFullHeight / pxPageHeight);

      // Define pageHeight separately so it can be trimmed on the final page.
      var pageHeight = innerPageHeight;

      // Create a one-page canvas to split up the full image.
      var pageCanvas = document.createElement('canvas');
      var pageCtx = pageCanvas.getContext('2d');
      pageCanvas.width = canvas.width;
      pageCanvas.height = pxPageHeight;

      // Initialize the PDF.
      var pdf = new jsPDF('p', 'in', [8.5, 11]);

      for (var page = 0; page < nPages; page++) {
        // Trim the final page to reduce file size.
        if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
          pageCanvas.height = pxFullHeight % pxPageHeight;
          pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
        }

        // Display the page.
        var w = pageCanvas.width;
        var h = pageCanvas.height;
        pageCtx!.fillStyle = 'white';
        pageCtx!.fillRect(0, 0, w, h);
        pageCtx!.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

        // Add the page to the PDF.
        if (page > 0) pdf.addPage();
        debugger;
        var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
        pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
      }
      return pdf;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_CertificadoTutor.pdf`);
   });






    /*const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [4, 2]
    });

    doc.text("Hello world!", 1, 1);
    doc.save("two-by-four.pdf");*/

    /* const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p','mm','A4'); //jsPDF('p', 'pt', 'a4');
    doc.addFont('ArialMS', 'Arial', 'normal');
    doc.setFont('Arial');

    const options = {
      background: 'white',
      scale: 1,
    };
    html2canvas(DATA!, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;



      doc.addImage(img, 'SVG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;



    }).then((docResult) => {
       docResult.save(`${new Date().toISOString()}_FichaDeEvaluacionyRendimiento.pdf`);
    });*/




  }



}
