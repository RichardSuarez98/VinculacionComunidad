import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { IAsistenciaQuery, IAsistenciaResponse } from 'src/app/Interfaces/Asistencia';
import {  ICronograma } from 'src/app/Interfaces/Cronograma';
import { AsistenciaServiceService } from '../../Service/asistencia-service.service';
import { CronogramaService } from '../../Service/cronograma.service';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listEstudiante: IAsistenciaResponse[] = [];
  listCarrera: any[] = [];
  listAnioLectivo: any[] = [];
  listProyecto: any[] = [];

  listDocente: any[]=[];


  form!: FormGroup

  idCarrera = 0;
  idAnioLectivo = 0;
  idProyecto = 0;

  deta: any[] = []
  nombreBoton: any
  ocultarBoton!: boolean

  constructor(private _asistenciaService: AsistenciaServiceService, private _cronogramaService: CronogramaService,
    public dialog: MatDialog, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      idCarrera: [0],
      idAnioLectivo: [0],
      idProyecto: [0, Validators.required],
    })
  }

  ngOnInit(): void {
    this.getCarrera();
    this.getAnioLectivo();
    this.getProyecto();
    this.getDocente();
    this.nombreBoton = "Guardar"
    this.ocultarBoton=false;
  }

  getCronograma() {
    if (this.idProyecto != 0 && this.idCarrera != 0 && this.idAnioLectivo != 0) {
      const solicitud: ICronograma = { idAnioLectivo: this.idAnioLectivo, idCarrera: this.idCarrera, idProyecto: this.idProyecto };

      this._cronogramaService.get(solicitud).subscribe(response => {
        if (response.codigo == 1) {
          this.ocultarBoton=true;
          this.listEstudiante = response.data!;
        }else if (response.codigo == 0) {
          console.log(response.mensaje);
          this.ocultarBoton=true;
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


  getDocente(){
     let obj =JSON.parse(localStorage.getItem('usuario')!);
     let objEnviar:ICronograma;
     objEnviar={
      idCarrera:obj.idCarrera
     }
     console.log(obj);
     console.log(objEnviar);
      //idCarrera
     this._cronogramaService.getConsultaDocente(1).subscribe(doc => {
      console.log(doc.data);
        console.log(this.listDocente);
      if(doc.codigo==1){
        this.listDocente=doc.data!
        console.log(doc.data);
        console.log(this.listDocente);
      }
     
    })
  }





}
