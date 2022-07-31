import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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

  displayedColumns: string[] = ['idAsigP', 'identificacion', 'nombres', 'asistencia'];
  datasource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  listEstudiante: IAsistenciaResponse[] = [];
  listCarrera: any[] = [];
  listAnioLectivo: any[] = [];
  listProyecto: any[] = [];
  dias: any[] = [1, 2, 3, 4, 5]
  form!: FormGroup


  constructor(
    private _actividadDiaria: ServiceActividad,
    private _asistenciaService: AsistenciaServiceService,
    public dialog: MatDialog, private fb: FormBuilder,) {
    this.form = this.fb.group({

      //#region  Cabecera

      idCarrera: [0],
      idAnioLectivo: [0],
      idProyecto: [0],
      semana: [0],

      //#endregion

      //#region  Detalle

      //#region  Día 1

      fecha1: [''],
      horas1: [0],
      actividad1: [''],

      //#endregion

      //#region  Día 2

      fecha2: [''],
      horas2: [0],
      actividad2: [''],

      //#endregion
      //#region  Día 3

      fecha3: [''],
      horas3: [0],
      actividad3: [''],

      //#endregion
      //#region  Día

      fecha4: [''],
      horas4: [0],
      actividad4: [''],

      //#endregion
      //#region  Día

      fecha5: [''],
      horas5: [0],
      actividad5: ['']

      //#endregion

      //#endregion 
    })
  }

  ngOnInit(): void {
    this.getCarrera();
    this.getAnioLectivo();
    this.getProyecto();

  }

  idCarrera = 0;
  idAnioLectivo = 0;
  idProyecto = 0;
  idUsuario = 0; /*ES EL ID DEL ESTUDIANTE*/


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


  GuardarActividad() {
    let detalleActividad: DetaActividad[] = [];
    let actividad: DetaActividad = {
      fecha: this.form.value.fecha1,
      horas: this.form.value.horas1,
      descripcionActividad: this.form.value.actividad1,
    }

    detalleActividad.push(actividad)
    actividad = {
      fecha: this.form.value.fecha2,
      horas: this.form.value.horas2,
      descripcionActividad: this.form.value.actividad2,
    }

    detalleActividad.push(actividad)
    actividad = {
      fecha: this.form.value.fecha3,
      horas: this.form.value.horas3,
      descripcionActividad: this.form.value.actividad3,
    }

    detalleActividad.push(actividad)
    actividad = {
      fecha: this.form.value.fecha4,
      horas: this.form.value.horas4,
      descripcionActividad: this.form.value.actividad4,
    }

    detalleActividad.push(actividad)
    actividad = {
      fecha: this.form.value.fecha5,
      horas: this.form.value.horas5,
      descripcionActividad: this.form.value.actividad5,
    }

    detalleActividad.push(actividad)

    const Actividades: IActividades = {
      idAnioLectivo: this.idAnioLectivo,
      idCarrera: this.idCarrera,
      idProyecto: this.idProyecto,
      idUsuario: this.idUsuario,
      numeroSemana: this.form.value.semana,
      detaActividad: detalleActividad
    }



    this._actividadDiaria.post(Actividades).subscribe(response => {
      if (response.codigo == 1) {
        alert(response.mensaje)
        this.form.reset();
      }else{
        alert(response.mensaje)
      }
    })

  }

}
