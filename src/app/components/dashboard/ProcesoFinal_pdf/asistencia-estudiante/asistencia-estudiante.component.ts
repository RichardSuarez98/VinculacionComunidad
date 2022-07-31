import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-asistencia-estudiante',
  templateUrl: './asistencia-estudiante.component.html',
  styleUrls: ['./asistencia-estudiante.component.css']
})
export class AsistenciaEstudianteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }




  async pol(){
    /*const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [4, 2]
    });
    
    doc.text("Hello world!", 1, 1);
    doc.save("two-by-four.pdf");*/

     const DATA = document.getElementById('htmlData');
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
    });

  }


}
