import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { IActividades } from 'src/app/Interfaces/Actividad';
import { AsistenciaServiceService } from '../../Service/asistencia-service.service';
import { ServiceActividad } from '../../Service/service-actividad.service';
import { ActividadEstudianteModuloComponent } from '../actividad-estudiante-modulo/actividad-estudiante-modulo.component';
import { AsistenciaComponent } from '../asistencia/asistencia.component';
import { CrudEvaluacionEstudiantilComponent } from '../crud-evaluacion-estudiantil/crud-evaluacion-estudiantil.component';
import { CrudMonitoreoDocenteComponent } from '../crud-monitoreo-docente/crud-monitoreo-docente.component';

@Component({
  selector: 'app-docente-tutor-modulo',
  templateUrl: './docente-tutor-modulo.component.html',
  styleUrls: ['./docente-tutor-modulo.component.css']
})
export class DocenteTutorModuloComponent implements OnInit {
  displayedColumns: string[] = ['idActividadesDiarias','nombreEstudiante','nombreDocente','nombreSupervisor','totalHoras','actividadProgress','accion'];
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
  habilitarBotonSupervisor!: boolean

  deta: any[] = []

  lstEstados:any[] =[
    {valor:'RP',name:'Reprobado',colorbox:'red'},
    {valor:'AP',name:'Aprobado',colorbox:'green'},
    {valor:'SV',name:'Sin Verificar',colorbox:'black'},
    ]

    idEstado: any

    onChanges(element:any){
      console.log("hoy es 29 de julio");
      console.log(element);
      console.log(this.idEstado);
    }

  constructor(private _asistenciaService: AsistenciaServiceService,private _actividadService: ServiceActividad,
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
    this.getCarrera();
    this.getAnioLectivo();
    this.getProyecto();
    var _finaldata=JSON.parse(localStorage.getItem('usuario')!);
    if(_finaldata.idRol===5){// docente supervisor
      this.habilitarBotonSupervisor=true;
     }else if(_finaldata.idRol===4){// docente tutor
      this.habilitarBotonSupervisor=false;
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
      this._actividadService.get(solicitud).subscribe(response => {
        /*if(response.data!.estadoDocente === 1){

        }*/
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




  openDialog(element:any) {
       const dialogo=this.dialog.open(ActividadEstudianteModuloComponent,{
         width:'50%',
         height:'90%',
         data:element
       })
       dialogo.afterClosed().subscribe(result => {
         console.log('The dialog was closed');
         // this.animal = result;
       });
     }


     openDialogAsistencia(){
      const dialogo=this.dialog.open(AsistenciaComponent,{
        width:'50%',
        height:'90%',
       // data:element
      })
      dialogo.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
     }

     openDialogEvaluacionEstudiantil(){
      const dialogo=this.dialog.open(CrudEvaluacionEstudiantilComponent,{
        width:'50%',
        height:'90%',
       // data:element
      })
      dialogo.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
     }

     openDialogMonitoreo(){
      const dialogo=this.dialog.open(CrudMonitoreoDocenteComponent,{
        width:'50%',
        height:'90%',
       // data:element
      })
      dialogo.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
     }



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
                        "#FF6384",
                        "#36A2EB",
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                    ]
                }
            ]
        }
        }else{
          console.log(response.mensaje);
        }
      });
     }


     /*public doughnutChartLabels: string[] = [ 'Actividades completadas', 'Actividades por Completar' ];
     public doughnutChartData: ChartData<'doughnut'> = {
       labels: this.doughnutChartLabels,
       datasets: [
         { data: [100] }
       ]
     };
     public doughnutChartType: ChartType = 'doughnut';
     // events
     public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
       console.log(event, active);
     }

     public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
       console.log(event, active);
     }*/

}
