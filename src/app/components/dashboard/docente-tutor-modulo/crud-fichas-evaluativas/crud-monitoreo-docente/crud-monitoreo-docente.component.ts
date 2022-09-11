import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AsistenciaServiceService } from 'src/app/components/Service/asistencia-service.service';
import { MonitoreoDocenteServiceService } from 'src/app/components/Service/monitoreo-docente-service.service';
import { IAsistenciaQuery, IAsistenciaResponse } from 'src/app/Interfaces/Asistencia';
import { DetaeMonitoreoDocente, IMonitoreoDocente } from 'src/app/Interfaces/MonitoreoDocente';
import swal from 'sweetalert';

@Component({
  selector: 'app-crud-monitoreo-docente',
  templateUrl: './crud-monitoreo-docente.component.html',
  styleUrls: ['./crud-monitoreo-docente.component.css']
})
export class CrudMonitoreoDocenteComponent implements OnInit {

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
    private _monitoreoDocente: MonitoreoDocenteServiceService,
    private _asistenciaService: AsistenciaServiceService,
    public dialog: MatDialog, private fb: FormBuilder,) {
    this.form = this.fb.group({
      idCarrera: [0,Validators.required],
      idAnioLectivo: [0,Validators.required],
      idProyecto: [0,Validators.required],
      idUsuario:[0,Validators.required],
      fecha:['',Validators.required],
      visita:['',Validators.required],
      horaVisita: ['',Validators.required],
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
      descripcion:[''],
      recomendacion:['']
    })
  }

date!: string
  ngOnInit(): void {
    this.getCarrera();
    this.getAnioLectivo();
    this.getProyecto();


   /* let date: Date = new Date();
    this.fecha=date.toLocaleDateString();
    console.log(this.fecha);
    console.log(this.fecha);*/
  }

  idCarrera = 0;
  idAnioLectivo = 0;
  idProyecto = 0;
  idUsuario = 0; /*ES EL ID DEL ESTUDIANTE*/
  visita:number=1;
  fecha!: Date;
  horaVisita!:string;
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
  let detalleEvaluacion: DetaeMonitoreoDocente[] = []
    let evaluacion: DetaeMonitoreoDocente = {
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
   const vhora:string = (this.form.get("horaVisita")?.value)
    const fevaluacionRendimiento: IMonitoreoDocente={
    observacion: this.form.value.descripcion,
    recomendacion: this.form.value.recomendacion,
    idAnioLectivo: this.idAnioLectivo,
    idProyecto:    this.idProyecto,
    idCarrera:     this.idCarrera,
    idUsuario:     this.idUsuario,
    fecha:this.form.get("fecha")?.value,
    visita:this.form.get("visita")?.value,
    horaVisita: vhora ,
    //horaVisita: this.form.get("horaVisita")?.value,
    detaeMonitoreoDocente: detalleEvaluacion
    }
console.log(fevaluacionRendimiento);
      this._monitoreoDocente.post(fevaluacionRendimiento).subscribe(response =>{
        if(response.codigo==1){
          swal("Buen trabajo!", response.mensaje, "success");
          this.form.reset();
        }else{
          swal("Oops..!",  response.mensaje, "warning");
        }
      })

  }

}
