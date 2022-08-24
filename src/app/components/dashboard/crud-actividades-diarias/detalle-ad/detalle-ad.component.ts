import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceActividad } from 'src/app/components/Service/service-actividad.service';
import { DetaActividad, IActividades } from 'src/app/Interfaces/Actividad';
import { IAsistenciaQuery, IAsistenciaResponse } from 'src/app/Interfaces/Asistencia';
import { AsistenciaServiceService } from '../../../Service/asistencia-service.service';

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

  addConceptoActividad: DetaActividad[] = [];

  listActividadCompleta:IActividades[] = [];

  constructor(
    private _actividadDiaria: ServiceActividad,
    private _asistenciaService: AsistenciaServiceService, private _snackBar: MatSnackBar,
    public dialog: MatDialog, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public list:any) {
    this.form = this.fb.group({
      idCarrera: [0],
      idAnioLectivo: [0],
      idProyecto: [0],
      semana: [0],

      fecha: ['',Validators.required],
      horas: [1,Validators.required],
      descripcionActividad: ['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.getCarrera();
    this.getAnioLectivo();
    this.getProyecto();

    this.cargarDatosForm();

    this.getEstudiante();
  }

  idCarrera = 0;
  idAnioLectivo = 0;
  idProyecto = 0;
  idUsuario = 0; /*ES EL ID DEL ESTUDIANTE*/

  idDocente=0;
  idSupervisor=0;

  getEstudiante() {
    //if (this.idProyecto != 0 && this.idCarrera != 0 && this.idAnioLectivo != 0) {
      const solicitud: IAsistenciaQuery = { idAnioLectivo: this.idAnioLectivo, idCarrera: this.idCarrera, idProyecto: this.idProyecto };

      this._asistenciaService.get(solicitud).subscribe(response => {
        console.log(response);
        if (response.codigo == 1) {

          this.listEstudiante = response.data!;
        }
      })
      this._asistenciaService.getDocente(solicitud).subscribe(response => {
        console.log(response);
        if (response.codigo == 1) {

          this.listDocente = response.data!;
          console.log(this.listDocente);
        }
      })
      this._asistenciaService.getSupervisor(solicitud).subscribe(response => {
        console.log(response);
        if (response.codigo == 1) {

          this.listSupervisor = response.data!;
          console.log(this.listDocente);
        }
      })
    //}
  }

  getCarrera() {
    this._asistenciaService.getCarrera().subscribe(carrera => {
      this.listCarrera = carrera;
      //this.idCarrera = this.listCarrera.length > 0 ? this.listCarrera[0].idCarrera : 0;
    })
  }

  getAnioLectivo() {
    this._asistenciaService.getCargaAnioLectivo().subscribe(aniolectivo => {
      this.listAnioLectivo = aniolectivo;
     // this.idAnioLectivo = this.listAnioLectivo.length > 0 ? this.listAnioLectivo[0].idAnioLectivo : 0;

    })
  }

  getProyecto() {
    this._asistenciaService.getCargaProyecto().subscribe(proyecto => {
      this.listProyecto = proyecto;
      this.idProyecto = this.listProyecto.length > 0 ? this.listProyecto[0].idProyecto : 0;
      //this.idProyecto =  this.listProyecto[0].idProyecto;

    })
  }

  totales: number =0
  addConeptoDetalleActividad(){
    console.log(this.form.value);
    this.addConceptoActividad.push(this.form.value);
    //this.addConceptoActividad = response.data!;
    this.datasource = new MatTableDataSource(this.addConceptoActividad);
    this.datasource.paginator = this.paginator;

    let total: number =0
    this.addConceptoActividad.forEach(element => {
      total += element.horas!;
    });
    this.totales=total;
    console.log(this.totales);
        /*this.form.reset();*/
  }

  remove(id:number){
    console.log(id);
  //  remove(id:number){
      this.addConceptoActividad.splice(id,1);
      this.datasource = new MatTableDataSource(this.addConceptoActividad);
      let total: number =0
      this.addConceptoActividad.forEach(element => {
        total += element.horas!;
      });
      this.totales=total;
      //this.datasource=this.addConceptoActividad
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

    //console.table(Actividades);

    this._actividadDiaria.post(Actividades).subscribe(response => {
      if (response.codigo == 1) {
        this.mensaje(response.mensaje);
        //alert(response.mensaje)
        this.form.reset();
      }else if(response.codigo == 2){
        this.mensaje(response.mensaje);
        //alert(response.mensaje)
      }else if(response.codigo == 0){
        this.mensaje(response.mensaje);
      }
    })
  }


  mensaje(mensaje:string){
    this._snackBar.open(mensaje, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  limpiarPantalla(){
    this.form.reset();
    this.idUsuario=0;
    this.idDocente=0;
    this.idSupervisor=0;
    this.addConceptoActividad = [];
    //this.nombreBoton = "Guardar";
    this.datasource = new MatTableDataSource(this.addConceptoActividad);
    this.totales=0;
    this.form.value.horas=1;
    //this.form.get;

    //this.da
  }


  cargarDatosForm(){
    this._actividadDiaria.getMostrarActividadDialog(this.list).subscribe(response=>{
      if(response.codigo==1){
        //console.log(response.data!);
        //this.idUsuario=response.data[0].idEstudiante;
        this.listActividadCompleta=response.data!;
        this.datasource = new MatTableDataSource(this.listActividadCompleta);
        this.datasource.paginator = this.paginator;
        this.idProyecto=this.listActividadCompleta[0].idProyecto!;
        this.idUsuario=this.listActividadCompleta[0].idEstudiante!;
        this.idCarrera=this.listActividadCompleta[0].idCarrera!;
        this.idAnioLectivo=this.listActividadCompleta[0].idAnioLectivo!;
        this.idDocente=this.listActividadCompleta[0].idDocente!;
        this.idSupervisor=this.listActividadCompleta[0].idSupervisor!;
        console.log(this.listActividadCompleta);
       // listaActividadCompleta=response.data!
      //  console.log(response.data);
      }else{
        console.log(response.mensaje);
      }
    });
    /*
    descripcionActividad: "hplc"
fecha: "2022-08-13T00:00:00"
horas: 10
idActividadDiDeta: 66
idActividadesDiarias: 38
idAnioLectivo: 1
idCarrera: 1
idDocente: 7
idEstudiante: 4
idProyecto: 1
idSupervisor: 8
    */
  //this.form.value.idCarrera = this.listActividadCompleta[0].idCarrera!;
  //this.idAnioLectivo = this.listActividadCompleta[0].idAnioLectivo!;
  //this.idProyecto = this.listActividadCompleta[0].idProyecto!;
  //this.idUsuario = this.listActividadCompleta[0].idEstudiante!; /*ES EL ID DEL ESTUDIANTE*/
  //this.idDocente=this.listActividadCompleta[0].idDocente!;
  //this.idSupervisor=this.listActividadCompleta[0].idSupervisor!;
 // console.log("hola");
//console.log(this.listActividadCompleta)
//console.log(this.listActividadCompleta[1].idEstudiante);
  }


}
