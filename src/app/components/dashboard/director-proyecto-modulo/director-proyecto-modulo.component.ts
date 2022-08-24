import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { IActividades } from 'src/app/Interfaces/Actividad';
import { AsistenciaServiceService } from '../../Service/asistencia-service.service';
import { ServiceActividad } from '../../Service/service-actividad.service';
import { DetalleADComponent } from '../crud-actividades-diarias/detalle-ad/detalle-ad.component';

@Component({
  selector: 'app-director-proyecto-modulo',
  templateUrl: './director-proyecto-modulo.component.html',
  styleUrls: ['./director-proyecto-modulo.component.css']
})
export class DirectorProyectoModuloComponent implements OnInit {
  displayedColumns: string[] = ['idActividadesDiarias','nombreEstudiante','nombreDocente','nombreSupervisor','totalHoras','estadoGestorVinculacion','actividadProgress','accion'];
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
    else if(_finaldata.idRol===5){// idUsuario
     // this.habilitarBotonSupervisor=true;
     }else if(_finaldata.idRol===4){ //Docente Tutor
       this.getCarrera();
       this.getAnioLectivo();
       this.getProyecto();
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


    const dialogo=this.dialog.open(DetalleADComponent,{
      width:'50%',
      height:'90%',
      data:element
    })
    dialogo.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });

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




  public doughnutChartLabels: string[] = [ 'Porcentaje de Actividades completadas', 'Porcentaje de Actividades por Completar' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [100] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
  public chartColors: any[] = [
   {
     backgroundColor:["#FF7360", "#6FC8CE"]
   }];

  public options: any = {
   legend: { position: 'rigth' }
 }
  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }






}
