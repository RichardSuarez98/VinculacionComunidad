import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { IActividadConsulta, IActividades } from 'src/app/Interfaces/Actividad';
import { IAsistenciaQuery } from 'src/app/Interfaces/Asistencia';
import { IReporte } from 'src/app/Interfaces/Reporte';
import { AsistenciaServiceService } from '../../Service/asistencia-service.service';
import { ReporteServiceService } from '../../Service/reporte-service.service';
import { ServiceActividad } from '../../Service/service-actividad.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  listEstudiante: any
  listActividad: IActividadConsulta[]=[];
  listCarrera: any[] = [];
  listAnioLectivo: any[] = [];
  listProyecto: any[] = [];
  form!: FormGroup

  idCarrera=0;
  idAnioLectivo = 0;
  idProyecto = 0;
  idEstudiante:number=0;
  fechaDesde!:any;
  fechaHasta!:any;

  deta: any[] = []
  habilitarBoton:boolean=true
  datasource: any

  ocultarReporte:boolean=false

  valor=0;
  ocultarfechas:boolean=false;
  ocultarEstudiante:boolean=false;
logo!:string

  lstReporte:any[] =[
    {valor:0,name:'LISTADO DE ESTUDIANTES ASIGNADOS A  PROYECTO'},
    {valor:1,name:'LISTADO DE PORCENTAJE DE ACTIVIDADES DE ESTUDIANTES'},
    {valor:2,name:'LISTADO DE ACTIVIDADES CUMPLIDAS DEL PROYECTO'},
    {valor:3,name:'LISTADO DE ACTIVIDADES INCUMPLIDAS DEL PROYECTO'},
    {valor:4,name:'LISTADO DE ACTIVIDADES POR ESTUDIANTE'}
    ]
    listEstudianteAsignado: any[]=[]
    lstPorcentajeActividadEstudiante:any[]=[]
    lstActividadCumplida:any[]=[]
    lstActividadInCumplida:any[]=[]
    lstActividadPorEstudiante:any[]=[]

    nombreCarrera!: string
    noData!:string
  constructor(private _asistenciaService: AsistenciaServiceService,private _actividadService: ServiceActividad,private route: Router,
    public dialog: MatDialog, private fb: FormBuilder, private _serviceReporte:ReporteServiceService) { }

  ngOnInit(): void {
    this.getCarrera();
    this.getAnioLectivo();
    this.getProyecto();
    this.getEstudiante();
  }


  getCarrera() {
    this._asistenciaService.getCarrera().subscribe(carrera => {
      this.listCarrera = carrera;
      this.idCarrera = this.listCarrera.length > 0 ? this.listCarrera[0].idCarrera : 0;
    })
  }

  getAnioLectivo() {
    this._asistenciaService.getCargaAnioLectivo().subscribe(aniolectivo => {
      this.listAnioLectivo = aniolectivo;
      this.idAnioLectivo = this.listAnioLectivo.length > 0 ? this.listAnioLectivo[0].idAnioLectivo : 0;
    })
  }

  getProyecto() {
    this._asistenciaService.getCargaProyecto().subscribe(proyecto => {
      this.listProyecto = proyecto;
      this.idProyecto = this.listProyecto.length > 0 ? this.listProyecto[0].idProyecto : 0;
    })
  }

  getEstudiante() {
    if (this.idProyecto != 0 && this.idCarrera != 0 && this.idAnioLectivo != 0) {
      const solicitud: IAsistenciaQuery = { idAnioLectivo: this.idAnioLectivo, idCarrera: this.idCarrera, idProyecto: this.idProyecto };

      this._asistenciaService.get(solicitud).subscribe(response => {
        if (response.codigo == 1) {

          this.listEstudiante = response.data!;
        }
      })

    }
  }

  habilitarInputFecha(element:any){
    if(element.valor===2 || element.valor==3){
      this.ocultarfechas=true;
    }else if(element.valor===4){
      this.ocultarEstudiante=true;
      this.ocultarfechas=false;
    }
    else{
      this.ocultarfechas=false;
      this.ocultarEstudiante=false;
    }
  }

tablaReporte!: number;
  getReporte(){
    this.ocultarReporte=true;
    const solicitud:IReporte={
      tipoReporte:this.valor,
      idCarrera:this.idCarrera,
      idAnioLectivo:this.idAnioLectivo,
      idProyecto:this.idProyecto,
      idEstudiante:this.idEstudiante,
      fechaDesde:this.fechaDesde,
      fechaHasta:this.fechaHasta
    }

    if(solicitud.idCarrera==1){
      this.nombreCarrera="INGENIERÍA DE SISTEMAS COMPUTACIONALES"
      this.logo="https://res.cloudinary.com/guayaquil19980/image/upload/v1663209420/vincomunidad/wakmxaj5cwzb5s11kqf1.jpg";
    }else{
      this.nombreCarrera="CARRERA DE SOFTWARE"
      this.logo="https://res.cloudinary.com/guayaquil19980/image/upload/v1663209421/vincomunidad/b0ygbfe9h2oqrw4vmsrp.png";
    }


    switch (this.valor) {
      case 0:
        this._serviceReporte.getReporte(solicitud).subscribe(resp=>{
          if(resp.codigo===1){
            this.listEstudianteAsignado=resp.data!;
            this.tablaReporte=0;
            console.log(resp.data);
            console.log(this.listEstudianteAsignado);
          }else if(resp.codigo===2){
            this.noData=resp.mensaje;
          }
        })
          break;
      case 1:
        this._serviceReporte.getReporte(solicitud).subscribe(resp=>{
          if(resp.codigo===1){
            this.tablaReporte=1
            this.lstPorcentajeActividadEstudiante=resp.data!;
          }else if(resp.codigo===2){
            this.noData=resp.mensaje;
          }
        })
          break;
      case 2:
        this._serviceReporte.getReporte(solicitud).subscribe(resp=>{
          if(resp.codigo===1){
            this.tablaReporte=2
            this.lstActividadCumplida=resp.data!;
          }else if(resp.codigo===2){
            this.noData=resp.mensaje;
          }
        })
          break;
      case 3:
        this._serviceReporte.getReporte(solicitud).subscribe(resp=>{
          if(resp.codigo===1){
            this.tablaReporte=3
            this.lstActividadInCumplida=resp.data!;
          }else if(resp.codigo===2){
            this.noData=resp.mensaje;
          }
        })
          break;
      case 4:
        this._serviceReporte.getReporte(solicitud).subscribe(resp=>{
          if(resp.codigo===1){
            this.tablaReporte=4
            this.lstActividadPorEstudiante=resp.data!;
          }else if(resp.codigo===2){
            this.noData=resp.mensaje;
          }
        })
          break;
      default:
          //
          break;
   }

  }



  exportExcel(filename:string){
    switch (this.valor) {
      case 0:
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.listEstudianteAsignado);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, filename);
      });
          break;
      case 1:
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.lstPorcentajeActividadEstudiante);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, filename);
      });
          break;
      case 2:
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.lstActividadCumplida);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, filename);
      });
          break;
      case 3:
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.lstActividadInCumplida);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, filename);
      });
          break;
      case 4:
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.lstActividadPorEstudiante);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, filename);
      });
          break;
      default:
          //
          break;
   }
   this.limpiarPantalla();
   }

   saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data,new Date().getTime()+fileName+ EXCEL_EXTENSION);
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


async descargarPdf(filenames:string){
  const input = document.getElementById('htmlData');
  html2canvas(input!, { useCORS: true, allowTaint: true, scrollY: 0 }).then((canvas) => {
    const image = { type: 'jpeg', quality: 0.98 };
    const margin = [0.5, 0.5];
    //const filenames = 'myfile.pdf';

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
    const fecha=`${new Date().toISOString()}`;
    docResult.save(fecha+filenames+".pdf");
 });
this.limpiarPantalla();

}





limpiarPantalla(){
  this.ocultarReporte=false;
 // this.idCarrera=0;
 // this.idAnioLectivo=0;
 // this.idEstudiante=0;
 // this.idProyecto=0;
 // this.idProyecto!=null;

}



}
