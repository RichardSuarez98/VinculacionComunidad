import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EstudianteService } from 'src/app/components/Service/estudiante.service';
import { IEstudianteQuery, IFichaEvaluacionEstudiantil } from 'src/app/Interfaces/Estudiante';

@Component({
  selector: 'app-ficha-evaluacion-estudiantil',
  templateUrl: './ficha-evaluacion-estudiantil.component.html',
  styleUrls: ['./ficha-evaluacion-estudiantil.component.css']
})
export class FichaEvaluacionEstudiantilComponent implements OnInit {
  listFichaEvaluacionEstudiantil: IFichaEvaluacionEstudiantil[]=[]

  nombreCarrera!: string
  nombreEstudiante!: string
  nombreDocente!: string
  nombreSupervisor!: string
  cedulaSupervisor!: string
  areaDepartamento!: string
  cedEstudiante!: string
  fechaGeneracion!: Date
  nombreInstitucion!: string

  calificacion1!: string
  calificacion2!: string
  calificacion3!: string
  calificacion4!: string
  calificacion5!: string
  calificacion6!: string
  calificacion7!: string
  calificacion8!: string



  constructor(@Inject(MAT_DIALOG_DATA) public list:any,
  private _estudianteService: EstudianteService,) { }

  ngOnInit(): void {
    this.fichaGeneralCorrespondiente();
  }

  fichaGeneralCorrespondiente(){
    let numeroEstudiante: IEstudianteQuery={
      idEstudiante:this.list.idEstudiante
  }
    this._estudianteService.DescargarfichaEvaluacionEstudiantil(numeroEstudiante).subscribe(resp=>{
      if(resp.codigo==1){


        this.listFichaEvaluacionEstudiantil=resp.data!;
        this.nombreCarrera=this.listFichaEvaluacionEstudiantil[0].nombreCarrera!;
        this.nombreEstudiante=this.listFichaEvaluacionEstudiantil[0].nombreEstudiante!;
        this.nombreDocente=this.listFichaEvaluacionEstudiantil[0].nombreDocente!;
        this.nombreSupervisor=this.listFichaEvaluacionEstudiantil[0].nombreSupervisor!;
        this.cedulaSupervisor=this.listFichaEvaluacionEstudiantil[0].cedulaSupervisor!;
        this.cedEstudiante=this.listFichaEvaluacionEstudiantil[0].cedEstudiante!;
        this.areaDepartamento=this.listFichaEvaluacionEstudiantil[0].areaDepartamento!;
        this.nombreInstitucion=this.listFichaEvaluacionEstudiantil[0].nombreInstitucion!;

        this.calificacion1=this.listFichaEvaluacionEstudiantil[0].calificacion!;
        this.calificacion2=this.listFichaEvaluacionEstudiantil[1].calificacion!;
        this.calificacion3=this.listFichaEvaluacionEstudiantil[2].calificacion!;
        this.calificacion4=this.listFichaEvaluacionEstudiantil[3].calificacion!;
        this.calificacion5=this.listFichaEvaluacionEstudiantil[4].calificacion!;
        this.calificacion6=this.listFichaEvaluacionEstudiantil[5].calificacion!;
        this.calificacion7=this.listFichaEvaluacionEstudiantil[6].calificacion!;
        this.calificacion8=this.listFichaEvaluacionEstudiantil[7].calificacion!;

        console.log("hola");
        console.log(this.listFichaEvaluacionEstudiantil);
      }
    })
    console.log(this.list);
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
       docResult.save(`${new Date().toISOString()}_FichaDeEvaluacionEstudiantil.pdf`);
    });

  }





}
