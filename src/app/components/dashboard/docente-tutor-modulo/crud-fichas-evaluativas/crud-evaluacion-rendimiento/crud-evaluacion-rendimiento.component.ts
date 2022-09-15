import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AsistenciaServiceService } from 'src/app/components/Service/asistencia-service.service';
import { EvaluacionRendimientoServiceService } from 'src/app/components/Service/evaluacion-rendimiento-service.service';
import { IAsistenciaQuery, IAsistenciaResponse } from 'src/app/Interfaces/Asistencia';
import { DetaevaRendimiento, IEvaluacionRendimientoEstudiantil } from 'src/app/Interfaces/EvaluacionRendimientoEstudiantil';
//import swal from 'sweetalert';
//import { AsistenciaServiceService } from '../../Service/asistencia-service.service';
//import { EvaluacionRendimientoServiceService } from '../../Service/evaluacion-rendimiento-service.service';

@Component({
  selector: 'app-crud-evaluacion-rendimiento',
  templateUrl: './crud-evaluacion-rendimiento.component.html',
  styleUrls: ['./crud-evaluacion-rendimiento.component.css']
})
export class CrudEvaluacionRendimientoComponent implements OnInit {
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
    private _evaluacionRendimiento: EvaluacionRendimientoServiceService,
    private _asistenciaService: AsistenciaServiceService,
    public dialog: MatDialog, private fb: FormBuilder,) {
    this.form = this.fb.group({
      idCarrera: [0,Validators.required],
      idAnioLectivo: [0,Validators.required],
      idProyecto: [0,Validators.required],
      idUsuario:[0,Validators.required],
      calificacion1:['',Validators.required],
      calificacion2:['',Validators.required],
      calificacion3:['',Validators.required],
      calificacion4:['',Validators.required],
      calificacion5:['',Validators.required],
      calificacion6:['',Validators.required],
      calificacion7:['',Validators.required],
      calificacion8:['',Validators.required],
      calificacion9:['',Validators.required],
      calificacion10:['',Validators.required],
      calificacion11:['',Validators.required],
      calificacion12:['',Validators.required],
      calificacion13:['',Validators.required],
      calificacion14:['',Validators.required],
      calificacion15:['',Validators.required],
      calificacion16:['',Validators.required],
      calificacion17:['',Validators.required],
      calificacion18:['',Validators.required],
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
  calificacion9="";
  calificacion10="";
  calificacion11="";
  calificacion12="";
  calificacion13="";
  calificacion14="";
  calificacion15="";
  calificacion16="";
  calificacion17="";
  calificacion18="";

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



GuardarEvaluacionRendimiento() {
//#region PUSH DE LAS RESPUESTA DE LAS OPCIONES 8 EN TOTAL
  let detalleEvaluacion: DetaevaRendimiento[] = []

    let evaluacion: DetaevaRendimiento = {
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

    evaluacion = {
      calificacion:this.calificacion9
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion10
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion11
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion12
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion13
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion14
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion15
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion16
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion17
    }

    detalleEvaluacion.push(evaluacion);

    evaluacion = {
      calificacion:this.calificacion18
    }

    detalleEvaluacion.push(evaluacion);


    console.log(detalleEvaluacion);
   //#endregion

    const fevaluacionRendimiento: IEvaluacionRendimientoEstudiantil={
    observacion: this.form.value.descripcion,
    idAnioLectivo: this.idAnioLectivo,
    idProyecto:    this.idProyecto,
    idCarrera:     this.idCarrera,
    idUsuario:     this.idUsuario,
    detaevaRendimiento: detalleEvaluacion
    }

      this._evaluacionRendimiento.post(fevaluacionRendimiento).subscribe(response =>{
        if(response.codigo==1){
        //  swal("Buen trabajo!", response.mensaje, "success");
        }else{
         // swal("Oops..!",  response.mensaje, "warning");
        }
      })

  }

}
