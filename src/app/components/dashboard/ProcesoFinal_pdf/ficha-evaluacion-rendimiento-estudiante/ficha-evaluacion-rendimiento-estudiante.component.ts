import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EstudianteService } from 'src/app/components/Service/estudiante.service';
import { IEstudianteQuery, IFichaEvaluacionEstudiantil } from 'src/app/Interfaces/Estudiante';

@Component({
  selector: 'app-ficha-evaluacion-rendimiento-estudiante',
  templateUrl: './ficha-evaluacion-rendimiento-estudiante.component.html',
  styleUrls: ['./ficha-evaluacion-rendimiento-estudiante.component.css']
})
export class FichaEvaluacionRendimientoEstudianteComponent implements OnInit {
  listFichaEvaluacionRendimiento: IFichaEvaluacionEstudiantil[]=[]

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
  calificacion9!: string
  calificacion10!: string
  calificacion11!: string
  calificacion12!: string
  calificacion13!: string
  calificacion14!: string
  calificacion15!: string
  calificacion16!: string
  calificacion17!: string
  calificacion18!: string



  constructor(@Inject(MAT_DIALOG_DATA) public list:any,
  private _estudianteService: EstudianteService,) { }

  ngOnInit(): void {
    this. fichaGeneralCorrespondiente();
  }



  async pol(){
     const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p','mm','A4');
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


  fichaGeneralCorrespondiente(){
    let numeroEstudiante: IEstudianteQuery={
      idEstudiante:this.list.idEstudiante
  }
    this._estudianteService.DescargarfichaEvaluacionEstudiantil(numeroEstudiante).subscribe(resp=>{
      if(resp.codigo==1){


        this.listFichaEvaluacionRendimiento=resp.data!;
        this.nombreCarrera=this.listFichaEvaluacionRendimiento[0].nombreCarrera!;
        this.nombreEstudiante=this.listFichaEvaluacionRendimiento[0].nombreEstudiante!;
        this.nombreDocente=this.listFichaEvaluacionRendimiento[0].nombreDocente!;
        this.nombreSupervisor=this.listFichaEvaluacionRendimiento[0].nombreSupervisor!;
        this.cedulaSupervisor=this.listFichaEvaluacionRendimiento[0].cedulaSupervisor!;
        this.cedEstudiante=this.listFichaEvaluacionRendimiento[0].cedEstudiante!;
        this.areaDepartamento=this.listFichaEvaluacionRendimiento[0].areaDepartamento!;
        this.nombreInstitucion=this.listFichaEvaluacionRendimiento[0].nombreInstitucion!;

        this.calificacion1=this.listFichaEvaluacionRendimiento[0].calificacion!;
        this.calificacion2=this.listFichaEvaluacionRendimiento[1].calificacion!;
        this.calificacion3=this.listFichaEvaluacionRendimiento[2].calificacion!;
        this.calificacion4=this.listFichaEvaluacionRendimiento[3].calificacion!;
        this.calificacion5=this.listFichaEvaluacionRendimiento[4].calificacion!;
        this.calificacion6=this.listFichaEvaluacionRendimiento[5].calificacion!;
        this.calificacion7=this.listFichaEvaluacionRendimiento[6].calificacion!;
        this.calificacion8=this.listFichaEvaluacionRendimiento[7].calificacion!;

        console.log("hola");
        console.log(this.listFichaEvaluacionRendimiento);
      }
    })
    console.log(this.list);
  }






}
