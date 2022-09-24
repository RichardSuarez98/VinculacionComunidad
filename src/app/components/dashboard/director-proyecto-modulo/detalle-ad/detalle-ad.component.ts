import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { elementAt } from 'rxjs';
import { ServiceActividad } from 'src/app/components/Service/service-actividad.service';
import { DetaActividad, IActividades, IActividadesDetallePrueba } from 'src/app/Interfaces/Actividad';
import { IAsistenciaQuery, IAsistenciaResponse } from 'src/app/Interfaces/Asistencia';
import { AsistenciaServiceService } from '../../../Service/asistencia-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-ad',
  templateUrl: './detalle-ad.component.html',
  styleUrls: ['./detalle-ad.component.css']
})
export class DetalleADComponent implements OnInit {
  displayedColumns: string[] = ['descripcionActividad', 'fecha', 'horas', 'accion'];
  datasource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  listSupervisor: any[] = [];
  listDocente: any[] = [];
  listEstudiante: IAsistenciaResponse[] = [];
  listCarrera: any[] = [];
  listAnioLectivo: any[] = [];
  listProyecto: any[] = [];
  form!: FormGroup
  nombreBoton = "Agregar Actividad";
  nuevo = true;
  indiceDetalle = 0;
  addConceptoActividad: DetaActividad[] = [];

  //  listActividadCompleta: IActividades[] = [];
  listActividadCompleta!: IActividades //IActividadesDetallePrueba[] = [];

  botonVoyActualizar:boolean=false
  constructor(
    private _actividadDiaria: ServiceActividad,
    private _asistenciaService: AsistenciaServiceService, private _snackBar: MatSnackBar,
    public dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public list: any) {
    this.form = this.fb.group({
      idCarrera: [0,Validators.required],
      idAnioLectivo: [0,Validators.required],
      idProyecto: [0,Validators.required],
      idUsuario:[0,Validators.required],
      idDocente:[0,Validators.required],
      idSupervisor:[0,Validators.required],
    //  semana: [0],

      fecha: ['', Validators.required],
      horas: [1, Validators.required],
      descripcionActividad: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.cargarDatosForm();
    this.getCarrera();
    this.getAnioLectivo();
    this.getProyecto();
    this.getEstudiante();
    if(this.list!=null){
      this.botonVoyActualizar=true
    }

  }

  idCarrera = 0;
  idAnioLectivo = 0;
  idProyecto = 0;
  idUsuario = 0; /*ES EL ID DEL ESTUDIANTE*/

  idDocente = 0;
  idSupervisor = 0;



  cargarDatosForm() {
    if (this.list != null)
      this._actividadDiaria.getMostrarActividadDialog(this.list).subscribe(response => {
        if (response.codigo == 1) {
          this.listActividadCompleta = response.data!;
          this.cargarDataSource();
        } else {
          //console.log(response.mensaje);
        }
      });
  }
  cargarDataSource() {
    this.totales = 0;
    this.listActividadCompleta = this.listActividadCompleta;
    let actividades: DetaActividad[] = [];

    this.listActividadCompleta.detaActividad?.forEach(element => {
      if (element.estadoActividad){
        actividades.push(element)
        this.totales += element.horas!;
      }
    })
    this.datasource = new MatTableDataSource(actividades);
    this.datasource.paginator = this.paginator;
    this.idProyecto = this.listActividadCompleta.idProyecto!;
    this.idUsuario = this.listActividadCompleta.idEstudiante!;
    this.idCarrera = this.listActividadCompleta.idCarrera!;
    this.idAnioLectivo = this.listActividadCompleta.idAnioLectivo!;
    this.idDocente = this.listActividadCompleta.idDocente!;
    this.idSupervisor = this.listActividadCompleta.idSupervisor!;

    this.getCarrera();
    this.getAnioLectivo();
    this.getProyecto();
    this.getEstudiante();

  }

  getEstudiante() {

    if (this.idProyecto != 0 && this.idCarrera != 0 && this.idAnioLectivo != 0) {
      const solicitud: IAsistenciaQuery = { idAnioLectivo: this.idAnioLectivo, idCarrera: this.idCarrera, idProyecto: this.idProyecto };

      this._asistenciaService.get(solicitud).subscribe(response => {
        if (response.codigo == 1) {

          this.listEstudiante = response.data!;
        }
      })
      this._asistenciaService.getDocente(solicitud).subscribe(response => {
        //console.log(response);
        if (response.codigo == 1) {

          this.listDocente = response.data!;
          //console.log(this.listDocente);
        }
      })
      this._asistenciaService.getSupervisor(solicitud).subscribe(response => {
        //console.log(response);
        if (response.codigo == 1) {

          this.listSupervisor = response.data!;
          //console.log(this.listDocente);
        }
      })
    }
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
      if (this.idProyecto == 0)
        this.idProyecto = this.listProyecto.length > 0 ? this.listProyecto[0].idProyecto : 0;
      this.idProyecto = this.listProyecto[0].idProyecto;

    })
  }

  totales: number = 0
  addConeptoDetalleActividad() {
    //console.log(this.form.value);
    if(this.list ==null){
      this.addConceptoActividad.push(this.form.value);
      //this.addConceptoActividad = response.data!;
      this.datasource = new MatTableDataSource(this.addConceptoActividad);
      this.datasource.paginator = this.paginator;

      let total: number = 0
      this.addConceptoActividad.forEach(element => {
        total += element.horas!;
      });
      this.totales = total;
    }

    else{
      let detas2:DetaActividad={
        fecha:this.form.value.fecha,
        horas:this.form.value.horas,
        descripcionActividad:this.form.value.descripcionActividad
      }
      this.listActividadCompleta.detaActividad?.push(detas2);
      this.datasource = new MatTableDataSource(this.listActividadCompleta.detaActividad);
      this.datasource.paginator = this.paginator;
    }
    //console.log(this.totales);
    /*this.form.reset();*/
  }
  editConeptoDetalleActividad() {

    if(this.list !=null){
      this.listActividadCompleta.detaActividad!.forEach(element => {
        if (element.idActividadDiDeta == this.indiceDetalle) {
          element.descripcionActividad = this.form.value.descripcionActividad;
          element.horas = this.form.value.horas;
          element.fecha = this.form.value.fecha;
          //console.log(element);
          this.cargarDataSource();
        }
      });
    }else{
      this.addConceptoActividad.splice(this.indiceDetalle, 1);
      this.addConceptoActividad.push(this.form.value);
      this.datasource = new MatTableDataSource(this.addConceptoActividad);
      this.nombreBoton = "Agregar Actividad";
    this.nuevo = true;
    }
    //this.nombreBoton="Agregar";
  }

  remove(id: number, actividad: DetaActividad) {
    let total: number = 0

    if (this.list != null) {
      this.listActividadCompleta.detaActividad!.forEach(element => {
        if (element.idActividadDiDeta == actividad.idActividadDiDeta) {
          element.estadoActividad = false;
          element.horas = 0
          this.cargarDataSource();
        }
        total += element.horas!;
      });
    } else {
      this.addConceptoActividad.splice(id, 1);
      this.datasource = new MatTableDataSource(this.addConceptoActividad);
      this.addConceptoActividad.forEach(element => {
        total += element.horas!;
      });
    }

    this.totales = total;
    //this.datasource=this.addConceptoActividad
  }

  editDetalle(element: DetaActividad, i: number = 0) {
    this.nombreBoton = "Editar Actividad";
    element.fecha = element.fecha?.replace("T00:00:00", "");
    this.form = this.fb.group({
      idCarrera: [this.idCarrera],
      idAnioLectivo: [this.idAnioLectivo],
      idProyecto: [this.idProyecto],
      semana: [0],

      fecha: [element.fecha, Validators.required],
      horas: [element.horas, Validators.required],
      descripcionActividad: [element.descripcionActividad, Validators.required],
    })

    this.nuevo = false;
    this.indiceDetalle = this.list != null ? element.idActividadDiDeta! : i;
    //value.horas = element.horas;
  }


  GuardarActividad() {
    const Actividades: IActividades = {
      idAnioLectivo: this.idAnioLectivo,
      idCarrera: this.idCarrera,
      idProyecto: this.idProyecto,
      idEstudiante: this.idUsuario,
      idDocente: this.idDocente,
      idSupervisor: this.idSupervisor,
      //numeroSemana: this.form.value.semana,
      detaActividad: this.addConceptoActividad
    }

    ////console.table(Actividades);

    this._actividadDiaria.post(Actividades).subscribe(response => {
      if (response.codigo == 1) {
        swal.fire("Buen trabajo!", response.mensaje, "success");
      } else if (response.codigo == 2) {
        swal.fire("Oops..!",  response.mensaje, "warning");
      } else if (response.codigo == 0) {
        swal.fire("Oops..!",  response.mensaje, "warning");
      }
    })
  }

  ActualizarActividad() {
    const Actividades: IActividades = {
      idAnioLectivo: this.idAnioLectivo,
      idCarrera: this.idCarrera,
      idProyecto: this.idProyecto,
      idEstudiante: this.idUsuario,
      idDocente: this.idDocente,
      idSupervisor: this.idSupervisor,
      idActividadesDiarias:this.listActividadCompleta.idActividadesDiarias,
      detaActividad:  this.listActividadCompleta.detaActividad!
    }


    this._actividadDiaria.ActualizarActividad(Actividades).subscribe(response => {
      if (response.codigo == 1) {
        swal.fire("Buen trabajo!", response.mensaje, "success");
        this.cargarDatosForm();
        //this.form.reset();
      } else if (response.codigo == 2) {
        swal.fire("Oops..!",  response.mensaje, "warning");
      } else if (response.codigo == 0) {
        swal.fire("Oops..!",  response.mensaje, "warning");
      }
    })

  }


  mensaje(mensaje: string) {
    this._snackBar.open(mensaje, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  limpiarPantalla() {
    this.form.reset();
    this.idUsuario = 0;
    this.idDocente = 0;
    this.idSupervisor = 0;
    this.addConceptoActividad = [];
    //this.nombreBoton = "Guardar";
    this.datasource = new MatTableDataSource(this.addConceptoActividad);
    this.totales = 0;
    this.form.value.horas = 1;
    //this.form.get;

    //this.da
  }


}
