import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { IActividades } from 'src/app/Interfaces/Actividad';
import swal from 'sweetalert';
import { AsistenciaServiceService } from '../../Service/asistencia-service.service';
import { ExcelServiceService } from '../../Service/excel-service.service';
import { ServiceActividad } from '../../Service/service-actividad.service';
import { ReportesComponent } from '../reportes/reportes.component';
import { ActividadEstudianteModuloComponent } from './actividad-estudiante-modulo/actividad-estudiante-modulo.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { CrudEvaluacionEstudiantilComponent } from './crud-fichas-evaluativas/crud-evaluacion-estudiantil/crud-evaluacion-estudiantil.component';
import { CrudEvaluacionRendimientoComponent } from './crud-fichas-evaluativas/crud-evaluacion-rendimiento/crud-evaluacion-rendimiento.component';
import { CrudMonitoreoDocenteComponent } from './crud-fichas-evaluativas/crud-monitoreo-docente/crud-monitoreo-docente.component';
//import { CrudEvaluacionEstudiantilComponent } from '../crud-fichas-evaluativas/crud-evaluacion-estudiantil/crud-evaluacion-estudiantil.component';
//import { CrudMonitoreoDocenteComponent } from '../crud-fichas-evaluativas/crud-monitoreo-docente/crud-monitoreo-docente.component';

@Component({
  selector: 'app-docente-tutor-modulo',
  templateUrl: './docente-tutor-modulo.component.html',
  styleUrls: ['./docente-tutor-modulo.component.css']
})
export class DocenteTutorModuloComponent implements OnInit {
  displayedColumns: string[] = ['idActividadesDiarias','nombreEstudiante','nombreDocente','nombreSupervisor','totalHoras','fechaInicio','fechaFin','actividadProgress','accion'];
  datasource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listActividad: IActividades[] = [];
  listCarrera: any[] = [];
  listAnioLectivo: any[] = [];
  listProyecto: any[] = [];
  form!: FormGroup

  idCarrera = 0;
  idAnioLectivo = 0;
  idProyecto = 0;

  botonHabilitar!: boolean
  habilitarBotonSupervisor: boolean=false
  habilitarBotonMonitoreo: boolean=false

  deta: any[] = []

  lstEstados:any[] =[
    {valor:'RP',name:'Reprobado',colorbox:'red'},
    {valor:'AP',name:'Aprobado',colorbox:'green'},
    {valor:'SV',name:'Sin Verificar',colorbox:'black'},
    ]

    idEstado: any

   /* onChanges(element:any){
      console.log("hoy es 29 de julio");
      console.log(element);
      console.log(this.idEstado);
    }*/

  constructor(private _asistenciaService: AsistenciaServiceService,private _actividadService: ServiceActividad,
    public dialog: MatDialog, private fb: FormBuilder, private excelService: ExcelServiceService
   ) {
    this.form = this.fb.group({
      idCarrera: [0],
      idAnioLectivo: [0],
      idProyecto: [0],
      estadoDocente:[0]
    })
  }

  ngOnInit(): void {
    this.getCarrera();
    this.getAnioLectivo();
    this.getProyecto();
    var _finaldata=JSON.parse(localStorage.getItem('usuario')!);
    if(_finaldata.idRol===5){// docente supervisor
      this.habilitarBotonSupervisor=false;
      this.habilitarBotonMonitoreo=true;
     }else if(_finaldata.idRol===4){// docente tutor
      this.habilitarBotonSupervisor=true;
      this.habilitarBotonMonitoreo=false;
     }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
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


  getActividad() {
    if (this.idProyecto != 0 && this.idCarrera != 0 && this.idAnioLectivo != 0) {
      const solicitud: IActividades = { idAnioLectivo: this.idAnioLectivo, idCarrera: this.idCarrera, idProyecto: this.idProyecto };
      console.log(solicitud);
      this._actividadService.getActividadesEstudianteTotales(solicitud).subscribe(response => {
        if (response.codigo == 1) {
          this.listActividad = response.data!;
          console.log(this.listActividad);
          this.datasource = new MatTableDataSource(this.listActividad);
          this.datasource.paginator = this.paginator; console.log(this.listActividad);
          this.cargarPorcentajeProyecto();
        }
      })
    }
  }

  cambiarEstadoActividad(actividad:IActividades){
    this._actividadService.putEstadoActividad(actividad).subscribe(response =>{
        if(response.codigo==1){
          console.log(response.mensaje);
          this.getActividad()
        }
    })
    console.log(actividad)
  }



//#region OpenDialog
openDialog(element:any) {
  const dialogo=this.dialog.open(ActividadEstudianteModuloComponent,{
    width:'50%',
    height:'90%',
    data:element
  })
  dialogo.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.getActividad();
    this.cargarPorcentajeProyecto();
  });
}

openDialogAsistencia(){
 const dialogo=this.dialog.open(AsistenciaComponent,{
   width:'50%',
   height:'90%',
 })
 dialogo.afterClosed().subscribe(result => {
   console.log('The dialog was closed');
 });
}

openDialogMonitoreo(){
 const dialogo=this.dialog.open(CrudMonitoreoDocenteComponent,{
   width:'50%',
   height:'90%',
 })
 dialogo.afterClosed().subscribe(result => {
   console.log('The dialog was closed');
 });
}

openDialogEvaluacionRendimiento(){
 const dialogo=this.dialog.open(CrudEvaluacionRendimientoComponent,{
   width:'50%',
   height:'90%',
 })
 dialogo.afterClosed().subscribe(result => {
   console.log('The dialog was closed');
 });
}
//#endregion

//#region Cargar Porcentaje de Proyecto
data: any;
chartOptions: any;
porcentajeProyecto:number []=[]
cargarPorcentajeProyecto(){
 const solicitud: IActividades = { idAnioLectivo: this.idAnioLectivo, idCarrera: this.idCarrera, idProyecto: this.idProyecto };
 this._actividadService.getMostrarPorcentajeProyecto(solicitud).subscribe(response=>{
   if(response.codigo==1){
     this.porcentajeProyecto=response.data!;
     this.data = {
       labels: ['Actividades completadas','Actividades por Completar'],
       datasets: [
           {
               data: [this.porcentajeProyecto[0],this.porcentajeProyecto[1]],
               backgroundColor: [
                   "#36A2EB",
                   "#3a4f63",
               ],
               hoverBackgroundColor: [
                 "#36A1EB",
                 "#3a4f53",
               ]
           }
       ]
   }
   }else{
     console.log(response.mensaje);
   }
 });
}
//#endregion



     downloadExcel() {
      this.excelService.exportAsExcelFile(this.listActividad, 'ListadoEstudiantesActividades');
    }



// GENERAMOS LAS FICHAS


    generarFichaActividadDiaria(element:IActividades){
      let solicitud:IActividades={
        totalHoras:element.totalHoras,
        idAnioLectivo:this.idAnioLectivo,
        idProyecto:this.idProyecto,
        idCarrera:this.idCarrera,
        idDocente:element.idDocente,
        idSupervisor:element.idSupervisor,
        idEstudiante:element.idEstudiante
      }
      this.excelService.generarFichaActividadesDiarias(solicitud).subscribe(resp=>{
        if(resp.codigo==1){
          swal("Buen trabajo!", resp.mensaje, "success");
          this.getActividad();
        }else if(resp.codigo==0){
          swal("Oops..!",  resp.mensaje, "warning");  //warning
        }
      });
    }


    generarCertificadoTutor(element:IActividades){
      let solicitud:IActividades={
        totalHoras:element.totalHoras,
        idAnioLectivo:this.idAnioLectivo,
        idProyecto:this.idProyecto,
        idCarrera:this.idCarrera,
        idDocente:element.idDocente,
        idSupervisor:element.idSupervisor,
        idEstudiante:element.idEstudiante
      }
      this.excelService.generarCertificadoTutor(solicitud).subscribe(resp=>{
        if(resp.codigo==1){
          swal("Buen trabajo!", resp.mensaje, "success");
          this.getActividad();
        }else if(resp.codigo==0){
          swal("Oops..!",  resp.mensaje, "warning");  //warning
        }
      });
    }


    generarCertificadoSupervisor(element:IActividades){
      let solicitud:IActividades={
        totalHoras:element.totalHoras,
        idAnioLectivo:this.idAnioLectivo,
        idProyecto:this.idProyecto,
        idCarrera:this.idCarrera,
        idDocente:element.idDocente,
        idSupervisor:element.idSupervisor,
        idEstudiante:element.idEstudiante
      }
      this.excelService.generarCertificadoSupervisor(solicitud).subscribe(resp=>{
        if(resp.codigo==1){
          swal("Buen trabajo!", resp.mensaje, "success");
          this.getActividad();
        }else if(resp.codigo==0){
          swal("Oops..!",  resp.mensaje, "warning");  //warning
        }
      });
    }




    exportPdf(){
      const doc = new jsPDF();
      doc.text("Planificación",20,20);
      autoTable(doc, { html: '#my-table',  margin:{ top: 25 } } )
      doc.save('planificacion.pdf')
     }


     saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }



  dialogReporte(){
    const dialogo=this.dialog.open(ReportesComponent,{
      width:'90%',
      height:'100%',
     // data:element
    })
    dialogo.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



}
