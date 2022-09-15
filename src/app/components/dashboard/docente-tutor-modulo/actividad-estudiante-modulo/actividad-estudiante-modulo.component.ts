import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DetaActividad, IActividades } from 'src/app/Interfaces/Actividad';
import { AsistenciaServiceService } from '../../../Service/asistencia-service.service';
import { ServiceActividad } from '../../../Service/service-actividad.service';
//import swal from 'sweetalert';

@Component({
  selector: 'app-actividad-estudiante-modulo',
  templateUrl: './actividad-estudiante-modulo.component.html',
  styleUrls: ['./actividad-estudiante-modulo.component.css']
})
export class ActividadEstudianteModuloComponent implements OnInit {

  displayedColumns: string[] = [/*'idActividadDiDeta',*/'fecha','descripcionActividad','horas','estadoDocente','estadoSupervisor','observacion','accion'];
  datasource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listActividad: any[] = [];
  form!: FormGroup

  idCarrera = 0;
  idAnioLectivo = 0;
  idProyecto = 0;

  deta: any[] = []

  panelOpenState = false;


  habilitarEstadoDocente!: Boolean
  habilitarEstadoSupervisor!: Boolean

  lstEstados:any[] =[
    {valor:'SI',name:'Sí',colorbox:'green'},
    {valor:'NO',name:'No',colorbox:'red'},
    {valor:'SV',name:'Sin Evaluar',colorbox:'black'},
    ]

    idEstado: any

    onChanges(element:any){
      console.log("hoy es 29 de julio");
      console.log(element);
      console.log(this.idEstado);
    }

  constructor(private _asistenciaService: AsistenciaServiceService,
    private _actividadService: ServiceActividad, @Inject(MAT_DIALOG_DATA) public fac:any,
    public dialog: MatDialog, private fb: FormBuilder, private _snackBar: MatSnackBar,

   ) {
    this.form = this.fb.group({
      idCarrera: [0],
      idAnioLectivo: [0],
      idProyecto: [0],
      estadoDocente:[0],
      observacion:['']
      // active:[''],
    })
  }

  ngOnInit(): void {
    console.log(this.fac);
    this.mostrarActividad();
    var _finaldata=JSON.parse(localStorage.getItem('usuario')!);
    if(_finaldata.idRol===5){// SUPERVISOR
      this.habilitarEstadoSupervisor=false;
      this.habilitarEstadoDocente=true;
     // this.habilitarEstadoDocente=false;
     }else if(_finaldata.idRol===4){// DOCENTE TUTOR
      this.habilitarEstadoDocente=false;
      this.habilitarEstadoSupervisor=true;
      //this.habilitarEstadoSupervisor=false;
     }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }


  mostrarActividad(){
    this._actividadService.getMostrarActividadEstudiante(this.fac).subscribe(resp =>{
      if(resp.codigo==1){
        this.listActividad = resp.data!;
          this.datasource = new MatTableDataSource(this.listActividad);
          this.datasource.paginator = this.paginator;
      }
    })

  }

/*

import swal from 'sweetalert';

*/
  cambiarEstadoActividad(actividad:IActividades){
    this._actividadService.putEstaDocenteActividad(actividad).subscribe(response =>{
        if(response.codigo==1){
       //   swal("Buen trabajo!", response.mensaje, "success");
        }else{
       //   swal("Oops..!",  response.mensaje, "warning");  //warning
        }
    })
  }



  guardarObservacionActividad(element:any){
    const Actividades: DetaActividad = {
      idActividadesDiarias:element.idActividadesDiarias,
      idActividadDiDeta:element.idActividadDiDeta,
      observacion:element.observacion
    }
    this._actividadService.putActualizarObservacion(Actividades).subscribe(response=>{
      if(response.codigo==1){
     //   swal("Buen trabajo!", response.mensaje, "success");
      }else{
      //  swal("Oops..!",  response.mensaje, "warning");  //warning
      }
    });
  }





  mensaje(mensaje:string){
    this._snackBar.open(mensaje, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }








}
