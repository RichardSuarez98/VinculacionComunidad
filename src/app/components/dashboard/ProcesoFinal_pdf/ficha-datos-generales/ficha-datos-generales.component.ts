import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EstudianteService } from 'src/app/components/Service/estudiante.service';
import { EvaluacionEstudiantilServiceService } from 'src/app/components/Service/evaluacion-estudiantil-service.service';
import { datosGeneralesResponse, fichaDatosGeneralResponse } from 'src/app/Interfaces/IFichaDatosGenerales';

@Component({
  selector: 'app-ficha-datos-generales',
  templateUrl: './ficha-datos-generales.component.html',
  styleUrls: ['./ficha-datos-generales.component.css']
})
export class FichaDatosGeneralesComponent implements OnInit {
  tituloProyecto!:         string;
  nombreCarrera!:          string;
  nombreEstudiante!:       string;
  cedulaEstudiante!:       string;
  correoEstudiante!:       string;
  nombreDocente!:          string;
  nombreSupervisor!:       string;
  cedulaSupervisor!:       string;
  cargoSupervisor!:        string;
  departamentoSupervisor!: string;
  nombreInstitucion!:      string;
  ruc!:                    string;
  direccion!:              string;
  telefonos!:              string;
  email!:                  string;
  fechaInicio!:            Date;
  fechaProgramada!:        Date;
  fechaFinalReal!:         Date;
  jornadaPractica!:        string;
  horario!:                string;
  diasSemanas!:            string;
  codigoProyecto!:         string;

  logo!: string;

  listFichaGeneral:  datosGeneralesResponse[]=[]
  constructor(private _fichaDatoGeneral : EstudianteService,@Inject(MAT_DIALOG_DATA) public list:any) { }

  ngOnInit(): void {
    this.cargarDatosFiGeneral();
  }


  cargarDatosFiGeneral(){
    let soli : fichaDatosGeneralResponse={
      idAnioLectivo:this.list.idAnioLectivo,
      idCarrera:this.list.idCarrera,
      idProyecto: this.list.idProyecto
    }
    this._fichaDatoGeneral.postCargarFichaDatosGenerales(soli).subscribe(resp=>{
      if(resp.codigo===1){
        this.listFichaGeneral=resp.data!;
        this.tituloProyecto=this.listFichaGeneral[0].tituloProyecto!;
        this.nombreCarrera=this.listFichaGeneral[0].nombreCarrera!;
       /* if(this.nombreCarrera=="INGENIERÍA DE SISTEMAS COMPUTACIONALES"){
          this.logo="./assets/img/logoCisc.jpg"
        }else if(this.nombreCarrera=="SOFTWARE"){
             this.logo="./assets/img/csoft.png"
        }*/
        if(this.nombreCarrera=="INGENIERÍA DE SISTEMAS COMPUTACIONALES"){
          // this.logo="./assets/img/logoCisc.jpg"
           this.logo="https://res.cloudinary.com/guayaquil19980/image/upload/v1663209420/vincomunidad/wakmxaj5cwzb5s11kqf1.jpg"
         }else if(this.nombreCarrera=="SOFTWARE"){
              //this.logo="./assets/img/csoft.png"
              this.logo="https://res.cloudinary.com/guayaquil19980/image/upload/v1663209421/vincomunidad/b0ygbfe9h2oqrw4vmsrp.png"
         }
        this.nombreInstitucion=this.listFichaGeneral[0].nombreInstitucion!;
        this.ruc=this.listFichaGeneral[0].ruc!;
        this.direccion=this.listFichaGeneral[0].direccion!;
        this.telefonos=this.listFichaGeneral[0].telefonos!;
        this.email=this.listFichaGeneral[0].email!;
        this.nombreSupervisor=this.listFichaGeneral[0].nombreSupervisor!;
        this.cedulaSupervisor=this.listFichaGeneral[0].cedulaSupervisor!;
        this.cargoSupervisor=this.listFichaGeneral[0].cargoSupervisor!;
        this.departamentoSupervisor=this.listFichaGeneral[0].departamentoSupervisor!;
        this.fechaInicio=this.listFichaGeneral[0].fechaInicio!;
        this.fechaProgramada=this.listFichaGeneral[0].fechaProgramada!;
        this.fechaFinalReal=this.listFichaGeneral[0].fechaFinalReal!;
        this.jornadaPractica=this.listFichaGeneral[0].jornadaPractica!;
        this.diasSemanas=this.listFichaGeneral[0].diasSemanas!;
        this.horario=this.listFichaGeneral[0].horario!;
        this.codigoProyecto=this.listFichaGeneral[0].codigoProyecto!;
        this.nombreDocente=this.listFichaGeneral[0].nombreDocente!;
      }
    });
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
