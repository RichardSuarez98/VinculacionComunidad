import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DetaAsistencia, IAsistenciaEvidencia, IAsistenciaQuery, IAsistenciaResponse } from 'src/app/Interfaces/Asistencia';
//import swal from 'sweetalert';
import { AsistenciaServiceService } from '../../../Service/asistencia-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  displayedColumns: string[] = ['idAsigP', 'identificacion', 'nombres', 'asistencia','jornadaInicio','jornadaFin'];
  datasource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listEstudiante: IAsistenciaEvidencia[]=[] //IAsistenciaResponse[] = [];
  listCarrera: any[] = [];
  listAnioLectivo: any[] = [];
  listProyecto: any[] = [];
  form!: FormGroup

  idCarrera = 0;
  idAnioLectivo = 0;
  idProyecto = 0;

  deta: any[] = []
  nombreBoton: any
  ocultarBoton!: boolean

  constructor(private _asistenciaService: AsistenciaServiceService,
    public dialog: MatDialog, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      idCarrera: [0],
      idAnioLectivo: [0],
      idProyecto: [0, Validators.required],
      fecha: ['', Validators.required]

    })
  }

  /*ngDoCheck() {

    this.form.value.idCarrera = this.idCarrera
    this.form.value.idAnioLectivo = this.idAnioLectivo
    this.form.value.idProyecto = this.idProyecto

    if(this.idProyecto != 0 && this.idCarrera != 0 && this.idAnioLectivo != 0 ){
      this.getEstudiante();
      console.log(`Codigos ${this.idCarrera} ${this.idProyecto} ${this.idAnioLectivo}`)


  }*/
  ngOnInit(): void {
    this.getCarrera();
    this.getAnioLectivo();
    this.getProyecto();

    this.addConcepto();

    this.nombreBoton = "Guardar"
    this.ocultarBoton=false;
  }

  getEstudiante() {
    if (this.idProyecto != 0 && this.idCarrera != 0 && this.idAnioLectivo != 0) {
      const solicitud: IAsistenciaQuery = { idAnioLectivo: this.idAnioLectivo, idCarrera: this.idCarrera, idProyecto: this.idProyecto };

      this._asistenciaService.get(solicitud).subscribe(response => {
        if (response.codigo == 1) {
          this.ocultarBoton=true;
          this.listEstudiante = response.data!;
          this.datasource = new MatTableDataSource(this.listEstudiante);
          this.datasource.paginator = this.paginator;
        }

      })
    }

  }

  mostrarFecha() {
    const solicitud: IAsistenciaQuery = { idAnioLectivo: this.idAnioLectivo, idCarrera: this.idCarrera, idProyecto: this.idProyecto, fecha: this.form.value.fecha };

    this._asistenciaService.get(solicitud).subscribe(response => {
      if (response.codigo == 1) {
        this.nombreBoton = "Guardar";
        console.log(response.data);
        this.listEstudiante = response.data!;
        this.datasource = new MatTableDataSource(this.listEstudiante);
        this.datasource.paginator = this.paginator;
      }
      else if (response.codigo == 2) {
        console.log(response.data);
        this.nombreBoton = "Actualizar";
        this.listEstudiante = response.data!;
        this.datasource = new MatTableDataSource(this.listEstudiante);
        this.datasource.paginator = this.paginator;
      }

    })


  }


  checkear(element: IAsistenciaResponse) {
    this.listEstudiante.forEach(e => {
      if (e.idEstudiante == element.idEstudiante) {
        e.asistencia = !e.asistencia;
      }
    })
  }


  GuardarAsistencia() {
    if (this.listEstudiante[0].idAsistenciaDet == 0 || this.listEstudiante[0].idAsistenciaDet == null) {
      let detalleAistencia: DetaAsistencia[] = []

      this.listEstudiante.forEach(e => {
        const detalle: DetaAsistencia = {
          //idAsistenciaDet :e.idAsistenciaDet,
          idEstudiante: e.idEstudiante,
          asistencia: e.asistencia
        }
        detalleAistencia.push(detalle)
      })
      const solicitud: IAsistenciaQuery = {
        idAnioLectivo: this.idAnioLectivo,
        idCarrera: this.idCarrera,
        idProyecto: this.idProyecto,
        fecha: this.form.value.fecha,
        detaAsistencia: detalleAistencia
      };
      this._asistenciaService.postAsistencia(solicitud).subscribe(response => {
        console.log(response);
        if (response.codigo == 1) {
          swal.fire("Buen Trabajo!", response.mensaje, "success");
          this.getProyecto();
          this.ocultarBoton=true;
          this.form.reset();
          this.listProyecto = [];
          this.datasource = new MatTableDataSource(this.listProyecto)
        } else if (response.codigo == 2) {
          swal.fire("Oops..!",  response.mensaje, "warning");  //warning
        }
      })
    } else {
      let detalleAistencia: DetaAsistencia[] = []

      this.listEstudiante.forEach(e => {
        const detalle: DetaAsistencia = {
          idAsistenciaDet: e.idAsistenciaDet,
          idEstudiante: e.idEstudiante,
          asistencia: e.asistencia
        }
        detalleAistencia.push(detalle)
      })
      const solicitud: IAsistenciaQuery = {
        idAnioLectivo: this.idAnioLectivo,
        idCarrera: this.idCarrera,
        idProyecto: this.idProyecto,
        fecha: this.form.value.fecha,
        detaAsistencia: detalleAistencia
      };
      this._asistenciaService.putAsistencia(solicitud).subscribe(response => {
        if (response.codigo == 1) {
          swal.fire("Buen Trabajo!", response.mensaje, "success");
          //this.ocultarBoton=false;
          this.getProyecto();
          this.form.reset();
          this.listProyecto = [];
          this.nombreBoton = "Guardar";
          this.datasource = new MatTableDataSource(this.listProyecto)
        }else
        {
          swal.fire("Oops..!",  response.mensaje, "warning");  //warning
        }

      });
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


  addConcepto() {
    this.deta.push(this.form.value);
  }






}
