import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { IActividadConsulta, IActividades } from 'src/app/Interfaces/Actividad';
import { AsistenciaServiceService } from '../../Service/asistencia-service.service';
import { ServiceActividad } from '../../Service/service-actividad.service';
import { ActualizarDetaActividadComponent } from './actualizar-deta-actividad/actualizar-deta-actividad.component';
import { DetalleADComponent } from './detalle-ad/detalle-ad.component';
import * as FileSaver from 'file-saver';

import  jsPDF  from 'jspdf';
import autoTable from 'jspdf-autotable';
import swal from 'sweetalert';
import { ReportesComponent } from '../reportes/reportes.component';

@Component({
  selector: 'app-director-proyecto-modulo',
  templateUrl: './director-proyecto-modulo.component.html',
  styleUrls: ['./director-proyecto-modulo.component.css']
})
export class DirectorProyectoModuloComponent implements OnInit {
  displayedColumns: string[] = ['descripcion','fecha','nombreEstudiante','nombreDocente','nombreSupervisor','totalHoras','estadoGestorVinculacion','actividadProgress','accion'];
  datasource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //listActividad: IActividades[] = [];
  listActividad: IActividadConsulta[]=[];
  listCarrera: any[] = [];
  listAnioLectivo: any[] = [];
  listProyecto: any[] = [];
  form!: FormGroup

  idCarrera = 0;
  idAnioLectivo = 0;
  idProyecto = 0;

  deta: any[] = []
  habilitarBoton:boolean=true
  habilitarBotonAprobarPlanificacion:boolean=true
  lstEstados:any[] =[
    {valor:'NO',name:'Reprobado',colorbox:'red'},
    {valor:'SI',name:'Aprobado',colorbox:'green'},
    {valor:'SV',name:'Sin Verificar',colorbox:'black'},
    ]

    idEstado: any
    numberEstadProyecto: number=0
    onChanges(element:any){
      console.log("hoy es 29 de julio");
      console.log(element);
      console.log(this.idEstado);
    }

  constructor(private _asistenciaService: AsistenciaServiceService,private _actividadService: ServiceActividad,private route: Router,
    public dialog: MatDialog, private fb: FormBuilder,
   ) {
    this.form = this.fb.group({
      idCarrera: [0],
      idAnioLectivo: [0],
      idProyecto: [0],
      estadoDocente:[0]
      // active:[''],
    })
  }

  ngOnInit(): void {
    /*this.getCarrera();
    this.getAnioLectivo();
    this.getProyecto();*/
    var _finaldata=JSON.parse(localStorage.getItem('usuario')!);
    if(_finaldata.idRol===6){
      this.route.navigate(['dashboard/pagenotfound']);
    }
    else if(_finaldata.idRol===2){// idUsuario   // el      rol 2 pertence al de gestor de vinculacion
      this.getCarrera();
      this.getAnioLectivo();
      this.getProyecto();
      this.habilitarBoton=false;
     // this.habilitarBotonSupervisor=true;
     }else if(_finaldata.idRol===3){//DIRECTOR DE PROYECTO    ----------  //Docente Tutor
       this.getCarrera();
       this.getAnioLectivo();
       this.getProyecto();
       this.habilitarBotonAprobarPlanificacion=false
      //this.habilitarBotonSupervisor=false;
     }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(/*fac:IFactura*/) {

        const dialogo=this.dialog.open(DetalleADComponent,{
          width:'50%',
          height:'90%',
          //data:fac
        })
        dialogo.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.animal = result;
        });

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
      this._actividadService.get(solicitud).subscribe(response => {
        /*if(response.data!.estadoDocente === 1){

        }*/
        if (response.codigo == 1) {
          this.listActividad = response.data!;
          this.datasource = new MatTableDataSource(this.listActividad);
          this.datasource.paginator = this.paginator;
          console.log( this.listActividad);
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



  editarActividad(element:any) {
    const dialogo=this.dialog.open(ActualizarDetaActividadComponent,{
      width:'50%',
      height:'30%',
      data:element
    })
    dialogo.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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


  aprobarPlanificacion(numero:number){
    if(numero===1){
      const solicitud: IActividadesGestorAprobarPlanificacion = {
        idAnioLectivo: this.idAnioLectivo,
         idCarrera: this.idCarrera,
          idProyecto: this.idProyecto,
          estadoPlanifiacion: "SI"
         };
      this._actividadService.actualizarPlanificacionGestor(solicitud).subscribe(resp=>{
        if(resp.codigo==1){
          swal("Buen Trabajo!", resp.mensaje, "success");
          this.getActividad();
        }else if(resp.codigo==0){
          swal("Oops..!",  resp.mensaje, "warning");  //warning
        }

      });

    }else if(numero===0){
      const solicitud: IActividadesGestorAprobarPlanificacion = {
        idAnioLectivo: this.idAnioLectivo,
         idCarrera: this.idCarrera,
          idProyecto: this.idProyecto,
          estadoPlanifiacion: "NO"
         };
         this._actividadService.actualizarPlanificacionGestor(solicitud).subscribe(resp=>{
          if(resp.codigo==1){
            swal("Buen trabajo!",  resp.mensaje, "success");  //warning
            this.getActividad();
          }else if(resp.codigo==0){
            swal("Oops..!",  resp.mensaje, "warning");  //warning
          }
        });
    }

  }

/*  editarActividad(element:IActividades){
    //console.log(element);
    console.log("hola");
    this._actividadService.getMostrarActividadDialog(element).subscribe(response=>{
      if(response.codigo==1){
        console.log(response.data);
      }else{
        console.log(response.mensaje);
      }
    });
  }*/

/*
  porcentajeProyecto:number []=[]
  cargarPorcentajeProyecto(){
   const solicitud: IActividades = { idAnioLectivo: this.idAnioLectivo, idCarrera: this.idCarrera, idProyecto: this.idProyecto };
   this._actividadService.getMostrarPorcentajeProyecto(solicitud).subscribe(response=>{
     if(response.codigo==1){
      // console.log(response.data);
       this.porcentajeProyecto=response.data!;
      // console.log(this.porcentajeProyecto);
       this.doughnutChartData.datasets[0].data=response.data!;
     }else{
       console.log(response.mensaje);
     }
   });
  }
*/




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
        this.numberEstadProyecto=this.porcentajeProyecto[0]
        }else{
          console.log(response.mensaje);
        }
      });
     }



     exportExcel(){
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listActividad);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "products");
    });
     }

    exportPdf(){
      const doc = new jsPDF();
      doc.text("Planificación",20,20);
      autoTable(doc, { html: '#my-table',  margin:{ top: 25 } } )
      doc.save('table.pdf')
     }


     saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }



}



export interface IActividadesGestorAprobarPlanificacion{
  idAnioLectivo?: number;
   idCarrera?:    number;
    idProyecto?:  number;
    estadoPlanifiacion?: string;
}
