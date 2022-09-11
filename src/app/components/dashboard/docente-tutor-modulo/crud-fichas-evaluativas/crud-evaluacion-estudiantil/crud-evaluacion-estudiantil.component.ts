import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsistenciaServiceService } from 'src/app/components/Service/asistencia-service.service';
import { EvaluacionEstudiantilServiceService } from 'src/app/components/Service/evaluacion-estudiantil-service.service';
import { DetaActividad, IActividades } from 'src/app/Interfaces/Actividad';
import { IAsistenciaQuery, IAsistenciaResponse } from 'src/app/Interfaces/Asistencia';
import { DetaEvaluacionEstudiantil, IEvaluacionEstudiantil } from 'src/app/Interfaces/EvaluacionEstudiantil';
//import { AsistenciaServiceService } from '../../../Service/asistencia-service.service';
//import { EvaluacionEstudiantilServiceService } from '../../../Service/evaluacion-estudiantil-service.service';
//import { ServiceActividad } from '../../../Service/service-actividad.service';

@Component({
  selector: 'app-crud-evaluacion-estudiantil',
  templateUrl: './crud-evaluacion-estudiantil.component.html',
  styleUrls: ['./crud-evaluacion-estudiantil.component.css']
})
export class CrudEvaluacionEstudiantilComponent implements OnInit {
  datasource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  listEstudiante: IAsistenciaResponse[] = [];
  listCarrera: any[] = [];
  listAnioLectivo: any[] = [];
  listProyecto: any[] = [];
  form!: FormGroup

lstValoracion:any[] =[
{valor:'NS',name:'NS'},
{valor:'PS',name:'PS'},
{valor:'S',name:'S'},
{valor:'MS',name:'MS'},
{valor:'E',name:'E'},
]


  constructor(
    private _evaluacionEstudiantil: EvaluacionEstudiantilServiceService,
    private _asistenciaService: AsistenciaServiceService,
    public dialog: MatDialog, private fb: FormBuilder,) {
    this.form = this.fb.group({
      idCarrera: [0],
      idAnioLectivo: [0],
      idProyecto: [0],
      idUsuario:[0],
      calificacion1:[''],
      calificacion2:[''],
      calificacion3:[''],
      calificacion4:[''],
      calificacion5:[''],
      calificacion6:[''],
      calificacion7:[''],
      calificacion8:[''],
      //ns9:[''],ps9:[''],s9: [''],ms9:[''],e9: [''],
      /*
      calificacion1:[''],ps1:[''],s1: [''],ms1:[''],e1: [''],
      calificacion2:[''],ps2:[''],s2: [''],ms2:[''],e2: [''],
      calificacion3:[''],ps3:[''],s3: [''],ms3:[''],e3: [''],
      calificacion4:[''],ps4:[''],s4: [''],ms4:[''],e4: [''],
      calificacion5:[''],ps5:[''],s5: [''],ms5:[''],e5: [''],
      calificacion6:[''],ps6:[''],s6: [''],ms6:[''],e6: [''],
      calificacion7:[''],ps7:[''],s7: [''],ms7:[''],e7: [''],
      calificacion8:[''],ps8:[''],s8: [''],ms8:[''],e8: [''],
      */
      descripcion:['']
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
  calificacion1="";
  calificacion2="";
  calificacion3="";
  calificacion4="";
  calificacion5="";
  calificacion6="";
  calificacion7="";
  calificacion8="";
  //calificacion9="";

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
//#region PUSH DE LAS RESPUESTA DE LAS OPCIONES 8 EN TOTAL
  let detalleEvaluacion: DetaEvaluacionEstudiantil[] = []
    let evaluacion: DetaEvaluacionEstudiantil = {
      calificacion:this.calificacion1
    }
    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion2
    }
    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion3
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion4
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion5
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion6
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion7
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion8
    }

    detalleEvaluacion.push(evaluacion);

    const fevaluacion: IEvaluacionEstudiantil={
    conocimientoHabilidades: this.form.value.descripcion,
    idAnioLectivo: this.idAnioLectivo,
    idProyecto:    this.idProyecto,
    idCarrera:     this.idCarrera,
    idUsuario:     this.idUsuario,
    detaEvaluacionEstudiantil: detalleEvaluacion
    }

      this._evaluacionEstudiantil.post(fevaluacion).subscribe(response =>{
        if(response.codigo==1){
          alert(response.mensaje);
          this.form.reset();
        }else{
          alert(response.mensaje);
        }
      })

  }



}
