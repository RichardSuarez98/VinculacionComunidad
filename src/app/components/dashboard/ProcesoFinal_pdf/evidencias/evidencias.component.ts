import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-evidencias',
  templateUrl: './evidencias.component.html',
  styleUrls: ['./evidencias.component.css']
})
export class EvidenciasComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public list:any,) { }

  ngOnInit(): void {
  }



  async pol(){
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
