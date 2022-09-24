import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EstudianteService } from 'src/app/components/Service/estudiante.service';
import { IEstudianteQuery, IFichaActividadDiaria } from 'src/app/Interfaces/Estudiante';

@Component({
  selector: 'app-ficha-actividades-diarias',
  templateUrl: './ficha-actividades-diarias.component.html',
  styleUrls: ['./ficha-actividades-diarias.component.css']
})
export class FichaActividadesDiariasComponent implements OnInit {
  listFichaActividadDiaria: IFichaActividadDiaria[]=[]

  nombreCarrera!: string
  nombreEstudiante!: string
  nombreDocente!: string
  nombreSupervisor!: string
  cedulaSupervisor!: string
  totalHoras!:  number


  logo!: string
  constructor(@Inject(MAT_DIALOG_DATA) public list:any,
  private _estudianteService: EstudianteService,) { }

  ngOnInit(): void {
    this.fichaGeneralCorrespondiente();
  }


  fichaGeneralCorrespondiente(){
    let numeroEstudiante: IEstudianteQuery={
      idEstudiante:this.list.idEstudiante
  }
    this._estudianteService.DescargarfichaActividadDiaria(numeroEstudiante).subscribe(resp=>{
      if(resp.codigo==1){
        this.listFichaActividadDiaria=resp.data!;
        this.nombreCarrera=this.listFichaActividadDiaria[0].nombreCarrera!;
       /* if(this.nombreCarrera=="INGENIERÍA DE SISTEMAS COMPUTACIONALES"){
          this.logo="./assets/img/logoCisc.jpg"
        }else if(this.nombreCarrera=="SOFTWARE"){
             this.logo="./assets/img/csoft.png"
        }*/
        if(this.nombreCarrera=="INGENIERÍA DE SISTEMAS COMPUTACIONALES"){
           this.logo="./assets/img/logoCisc.jpg"
           //this.logo="https://res.cloudinary.com/guayaquil19980/image/upload/v1663209420/vincomunidad/wakmxaj5cwzb5s11kqf1.jpg"
         }else if(this.nombreCarrera=="SOFTWARE"){
              this.logo="./assets/img/csoft.png"
              //this.logo="https://res.cloudinary.com/guayaquil19980/image/upload/v1663209421/vincomunidad/b0ygbfe9h2oqrw4vmsrp.png"
         }
        this.nombreEstudiante=this.listFichaActividadDiaria[0].nombreEstudiante!;
        this.nombreDocente=this.listFichaActividadDiaria[0].nombreDocente!;
        this.nombreSupervisor=this.listFichaActividadDiaria[0].nombreSupervisor!;
        this.cedulaSupervisor=this.listFichaActividadDiaria[0].cedulaSupervisor!;
        this.totalHoras=this.listFichaActividadDiaria[0].totalHoras!;
        console.log("hola");
        console.log(this.listFichaActividadDiaria);
      }
    })
    console.log(this.list);
  }



   convertPointsToUnit(points:number, unit:string) {
    // Unit table from https://github.com/MrRio/jsPDF/blob/ddbfc0f0250ca908f8061a72fa057116b7613e78/jspdf.js#L791
    var multiplier;
    switch(unit) {
      case 'pt':  multiplier = 1;          break;
      case 'mm':  multiplier = 72 / 25.4;  break;
      case 'cm':  multiplier = 72 / 2.54;  break;
      case 'in':  multiplier = 72;         break;
      case 'px':  multiplier = 96 / 72;    break;
      case 'pc':  multiplier = 12;         break;
      case 'em':  multiplier = 12;         break;
      //case 'ex':  multiplier = 6;
      default:
        throw ('Invalid unit: ' + unit);
    }
    return points * multiplier;
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
      docResult.save(`${new Date().toISOString()}_FichaDeEvaluacionyRendimiento.pdf`);
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
