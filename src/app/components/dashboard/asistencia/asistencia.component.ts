import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetaAsistencia, IAsistenciaQuery, IAsistenciaResponse } from 'src/app/Interfaces/Asistencia';
import { AsistenciaServiceService } from '../../Service/asistencia-service.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  displayedColumns: string[] = ['idAsigP', 'identificacion', 'nombres', 'asistencia'];
  datasource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listEstudiante: IAsistenciaResponse[] = [];
  listCarrera: any[] = [];
  listAnioLectivo: any[] = [];
  listProyecto: any[] = [];
  form!: FormGroup

  idCarrera = 0;
  idAnioLectivo = 0;
  idProyecto = 0;

  deta: any[] = []


  constructor(private _asistenciaService: AsistenciaServiceService,
    public dialog: MatDialog, private fb: FormBuilder,) {
    this.form = this.fb.group({
      idCarrera: [0],
      idAnioLectivo: [0],
      idProyecto: [0],
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


  }

  getEstudiante() {
    if (this.idProyecto != 0 && this.idCarrera != 0 && this.idAnioLectivo != 0) {
      const solicitud: IAsistenciaQuery = { idAnioLectivo: this.idAnioLectivo, idCarrera: this.idCarrera, idProyecto: this.idProyecto };

      this._asistenciaService.get(solicitud).subscribe(response => {
        if (response.codigo == 1) {

          this.listEstudiante = response.data!;
          this.datasource = new MatTableDataSource(this.listEstudiante);
          this.datasource.paginator = this.paginator;
        }

      })
    }

  }

  checkear(element: IAsistenciaResponse) {

    /*  this.datasource.filteredData.forEach((c: {
        idEstudiante: number;
        nombreEstudiante: string;
        cedula: string;
        asistencia: boolean;
      }))*/

    this.listEstudiante.forEach(e => {
      if (e.idEstudiante == element.idEstudiante) {
        e.asistencia = !e.asistencia;
      }
    })
  }
  GuardarAsistencia() {
    let detalleAistencia: DetaAsistencia[] = []
    this.listEstudiante.forEach(e => {
      const detalle: DetaAsistencia = {
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
      if (response.codigo ==1){
        alert(response.mensaje)
        this.listProyecto= [];
        this.datasource = new MatTableDataSource(this.listProyecto)
      }
    })

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
    console.log(this.deta);
  }




  openDialog(/*fac:IFactura*/) {

    /* const dialogo=this.dialog.open(DialogVComponent,{
       width:'700px',
      data:fac
     })
     dialogo.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
      // this.animal = result;
     });
   
      }*/

  }

}