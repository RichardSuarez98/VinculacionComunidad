import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EstudianteService } from 'src/app/components/Service/estudiante.service';
import { IDescargarFichaMonitoreoDocente, IEstudianteQuery, IFichaEvaluacionEstudiantil, queryMonitoreoDocenteBuscar } from 'src/app/Interfaces/Estudiante';

@Component({
  selector: 'app-ficha-monitoreo-docente',
  templateUrl: './ficha-monitoreo-docente.component.html',
  styleUrls: ['./ficha-monitoreo-docente.component.css']
})
export class FichaMonitoreoDocenteComponent implements OnInit {
  listFichaMonitoreoDocente: IDescargarFichaMonitoreoDocente[]=[]

  nombreCarrera!: string
  nombreEstudiante!: string
  nombreDocente!: string
  nombreSupervisor!: string
  cedulaSupervisor!: string
  areaDepartamento!: string
  cedEstudiante!: string
  fechaGeneracion!: Date
  nombreInstitucion!: string
  numeroVisita!: number
  horaVisita!: string
  cargoSupervisor!:string

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

  logo!: string

  constructor(@Inject(MAT_DIALOG_DATA) public list:any,
  private _estudianteService: EstudianteService,) { }

  ngOnInit(): void {
    this.fichaGeneralCorrespondienteMonitoreoDocente();
    }

    async fichaGeneralCorrespondienteMonitoreoDocente(){
    let numeroEstudiante: queryMonitoreoDocenteBuscar={
      idUsuario:this.list.idUsuario,
      idFmonitoreoDocente:this.list.idFmonitoreoDocente
  }
    this._estudianteService.DescargarfichafichaMonitoreoDocente(numeroEstudiante).subscribe(resp=>{
      if(resp.codigo==1){
        this.listFichaMonitoreoDocente=resp.data!;
        this.nombreCarrera=this.listFichaMonitoreoDocente[0].nombreCarrera!;
        if(this.nombreCarrera=="INGENIERÍA DE SISTEMAS COMPUTACIONALES"){
          // this.logo="./assets/img/logoCisc.jpg"
           this.logo="https://res.cloudinary.com/guayaquil19980/image/upload/v1663209420/vincomunidad/wakmxaj5cwzb5s11kqf1.jpg"
         }else if(this.nombreCarrera=="SOFTWARE"){
              //this.logo="./assets/img/csoft.png"
              this.logo="https://res.cloudinary.com/guayaquil19980/image/upload/v1663209421/vincomunidad/b0ygbfe9h2oqrw4vmsrp.png"
         }
       /* if(this.nombreCarrera=="INGENIERÍA DE SISTEMAS COMPUTACIONALES"){
          this.logo="./assets/img/logoCisc.jpg"
        }else if(this.nombreCarrera=="SOFTWARE"){
             this.logo="./assets/img/csoft.png"
        }*/
        this.nombreEstudiante=this.listFichaMonitoreoDocente[0].nombreEstudiante!;
        this.nombreDocente=this.listFichaMonitoreoDocente[0].nombreDocente!;
        this.nombreSupervisor=this.listFichaMonitoreoDocente[0].nombreSupervisor!;
        this.areaDepartamento=this.listFichaMonitoreoDocente[0].areaDesempenio!;
        this.nombreInstitucion=this.listFichaMonitoreoDocente[0].nombreInstitucion!;
        this.numeroVisita=this.listFichaMonitoreoDocente[0].visita!;
        this.horaVisita=this.listFichaMonitoreoDocente[0].hora!;
        this.cargoSupervisor=this.listFichaMonitoreoDocente[0].cargoSupervisor!;
       // this.fechaGeneracion=this.listFichaMonitoreoDocente[0].fecha!;

        this.calificacion1=this.listFichaMonitoreoDocente[0].valoracion!;
        this.calificacion2=this.listFichaMonitoreoDocente[1].valoracion!;
        this.calificacion3=this.listFichaMonitoreoDocente[2].valoracion!;
        this.calificacion4=this.listFichaMonitoreoDocente[3].valoracion!;
        this.calificacion5=this.listFichaMonitoreoDocente[4].valoracion!;
        this.calificacion6=this.listFichaMonitoreoDocente[5].valoracion!;
        this.calificacion7=this.listFichaMonitoreoDocente[6].valoracion!;
        this.calificacion8=this.listFichaMonitoreoDocente[7].valoracion!;
        this.calificacion9=this.listFichaMonitoreoDocente[8].valoracion!;
        this.calificacion10=this.listFichaMonitoreoDocente[9].valoracion!;
        this.calificacion11=this.listFichaMonitoreoDocente[10].valoracion!;
        this.calificacion12=this.listFichaMonitoreoDocente[11].valoracion!;
        this.calificacion13=this.listFichaMonitoreoDocente[12].valoracion!;
        this.calificacion14=this.listFichaMonitoreoDocente[13].valoracion!;
        this.calificacion15=this.listFichaMonitoreoDocente[14].valoracion!;
        this.calificacion16=this.listFichaMonitoreoDocente[15].valoracion!;
        this.calificacion17=this.listFichaMonitoreoDocente[16].valoracion!;
        this.calificacion18=this.listFichaMonitoreoDocente[17].valoracion!;

        console.log(this.listFichaMonitoreoDocente);
      }
    })
    console.log(this.list);
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
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'SVG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
       docResult.save(`${new Date().toISOString()}_FichaMonitoreoDocente.pdf`);
    });
  }






}
