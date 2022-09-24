import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EstudianteService } from 'src/app/components/Service/estudiante.service';
import { DetalleEstudianteAsis, IDescargarAsistenciaEstudiante, IEstudianteQuery } from 'src/app/Interfaces/Estudiante';

@Component({
  selector: 'app-asistencia-estudiante',
  templateUrl: './asistencia-estudiante.component.html',
  styleUrls: ['./asistencia-estudiante.component.css']
})
export class AsistenciaEstudianteComponent implements OnInit {

  listFichaAsistencia!: IDescargarAsistenciaEstudiante
  detalleAsistencia: DetalleEstudianteAsis[]=[];

  nombreCarrera!: string
  nombreEstudiante!: string;
  nombreInstitucion!: string;
  departamento!: string;
  fechaInicio!: Date
  fechaFin!: Date


  logo!: string

  constructor(@Inject(MAT_DIALOG_DATA) public list:any,private _estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.listarAsistenciaEstudianteDescargar();
  }



listarAsistenciaEstudianteDescargar(){
  let numeroEstudiante: IEstudianteQuery={
    idEstudiante:this.list.idEstudiante
}
this._estudianteService.DescargarfichaAsistenciaEstudiantil(numeroEstudiante).subscribe(resp=>{
  if(resp.codigo==1){
    this.listFichaAsistencia=resp.data!;
    this.nombreCarrera=this.listFichaAsistencia.nombreCarrera!;
    if(this.nombreCarrera=="INGENIERÍA DE SISTEMAS COMPUTACIONALES"){
      this.logo="./assets/img/logoCisc.jpg"
     // this.logo="https://res.cloudinary.com/guayaquil19980/image/upload/v1663209420/vincomunidad/wakmxaj5cwzb5s11kqf1.jpg"
    }else if(this.nombreCarrera=="SOFTWARE"){
         this.logo="./assets/img/csoft.png"
       //  this.logo="https://res.cloudinary.com/guayaquil19980/image/upload/v1663209421/vincomunidad/b0ygbfe9h2oqrw4vmsrp.png"
    }
    this.nombreEstudiante= this.listFichaAsistencia.nombreEstudiante!;
    this.nombreInstitucion= this.listFichaAsistencia.nombreInstitucion!;
    this.departamento=this.listFichaAsistencia.areaDesempenio!;
    this.fechaInicio=this.listFichaAsistencia.fechaInicio!;
    this.fechaFin=this.listFichaAsistencia.fechaFin!;

    console.log(this.listFichaAsistencia);
    this.listFichaAsistencia.detalle?.forEach(element => {
      this.detalleAsistencia.push(element);
    });
  }
})
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
