import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { IAsistenciaQuery, IAsistenciaResponse } from 'src/app/Interfaces/Asistencia';
import { DetaevaRendimiento, IEvaluacionRendimientoEstudiantil } from 'src/app/Interfaces/EvaluacionRendimientoEstudiantil';
import { AsistenciaServiceService } from '../../Service/asistencia-service.service';
import { EvaluacionRendimientoServiceService } from '../../Service/evaluacion-rendimiento-service.service';

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
      idCarrera: [0],
      idAnioLectivo: [0],
      idProyecto: [0],
      idUsuario:[0],
      ns1:[''],ps1:[''],s1: [''],ms1:[''],e1: [''],
      ns2:[''],ps2:[''],s2: [''],ms2:[''],e2: [''],
      ns3:[''],ps3:[''],s3: [''],ms3:[''],e3: [''],
      ns4:[''],ps4:[''],s4: [''],ms4:[''],e4: [''],
      ns5:[''],ps5:[''],s5: [''],ms5:[''],e5: [''],
      ns6:[''],ps6:[''],s6: [''],ms6:[''],e6: [''],
      ns7:[''],ps7:[''],s7: [''],ms7:[''],e7: [''],
      ns8:[''],ps8:[''],s8: [''],ms8:[''],e8: [''],
      ns9:[''],ps9:[''],s9: [''],ms9:[''],e9: [''],
      ns10:[''],ps10:[''],s10: [''],ms10:[''],e10: [''],
      ns11:[''],ps11:[''],s11: [''],ms11:[''],e11: [''],
      ns12:[''],ps12:[''],s12: [''],ms12:[''],e12: [''],
      ns13:[''],ps13:[''],s13: [''],ms13:[''],e13: [''],
      ns14:[''],ps14:[''],s14: [''],ms14:[''],e14: [''],
      ns15:[''],ps15:[''],s15: [''],ms15:[''],e15: [''],
      ns16:[''],ps16:[''],s16: [''],ms16:[''],e16: [''],
      ns17:[''],ps17:[''],s17: [''],ms17:[''],e17: [''],
      ns18:[''],ps18:[''],s18: [''],ms18:[''],e18: [''],
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
   respuesta1="";respuesta2=""; respuesta3="";respuesta4="";
   respuesta5="";respuesta6=""; respuesta7="";respuesta8="";
   respuesta9="";respuesta10="";respuesta11="";respuesta12="";
   respuesta13="";respuesta14=""; respuesta15="";respuesta16="";
   respuesta17="";respuesta18="";

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
    if(this.respuesta1==='NS'){
      this.form.value.ns1='NS';
    }else if(this.respuesta1==='PS'){
      this.form.value.ps1='PS';
    }else if (this.respuesta1==='S'){
      this.form.value.s1='S';
    }else if(this.respuesta1==='MS'){
      this.form.value.ms1='MS';
    }else if(this.respuesta1=='E'){
      this.form.value.e1='E';
    }
    let evaluacion: DetaevaRendimiento = {
      ns:this.form.value.ns1,
       ps:this.form.value.ps1,
       s:this.form.value.s1,
       ms:this.form.value.ms1,
       e:this.form.value.e1
    }

    detalleEvaluacion.push(evaluacion);

    if(this.respuesta2==='NS'){
      this.form.value.ns2='NS';
    }else if(this.respuesta2==='PS'){
      this.form.value.ps2='PS';
    }else if (this.respuesta2==='S'){
      this.form.value.s2='S';
    }else if(this.respuesta2==='MS'){
      this.form.value.ms2='MS';
    }else if(this.respuesta2=='E'){
      this.form.value.e2='E';
    }

    evaluacion = {
      ns:this.form.value.ns2,
       ps:this.form.value.ps2,
       s:this.form.value.s2,
       ms:this.form.value.ms2,
       e:this.form.value.e2
    }

    detalleEvaluacion.push(evaluacion);

    
    if(this.respuesta3==='NS'){
      this.form.value.ns3='NS';
    }else if(this.respuesta3==='PS'){
      this.form.value.ps3='PS';
    }else if (this.respuesta3==='S'){
      this.form.value.s3='S';
    }else if(this.respuesta3==='MS'){
      this.form.value.ms3='MS';
    }else if(this.respuesta3=='E'){
      this.form.value.e3='E';
    }

    evaluacion = {
      ns:this.form.value.ns3,
       ps:this.form.value.ps3,
       s:this.form.value.s3,
       ms:this.form.value.ms3,
       e:this.form.value.e3
    }

    detalleEvaluacion.push(evaluacion);

    if(this.respuesta4==='NS'){
      this.form.value.ns4='NS';
    }else if(this.respuesta4==='PS'){
      this.form.value.ps4='PS';
    }else if (this.respuesta4==='S'){
      this.form.value.s4='S';
    }else if(this.respuesta4==='MS'){
      this.form.value.ms4='MS';
    }else if(this.respuesta4=='E'){
      this.form.value.e4='E';
    }

    evaluacion = {
      ns:this.form.value.ns4,
       ps:this.form.value.ps4,
       s:this.form.value.s4,
       ms:this.form.value.ms4,
       e:this.form.value.e4
    }

    detalleEvaluacion.push(evaluacion);

    if(this.respuesta5==='NS'){
      this.form.value.ns5='NS';
    }else if(this.respuesta5==='PS'){
      this.form.value.ps5='PS';
    }else if (this.respuesta5==='S'){
      this.form.value.s5='S';
    }else if(this.respuesta5==='MS'){
      this.form.value.ms5='MS';
    }else if(this.respuesta5=='E'){
      this.form.value.e5='E';
    }

    evaluacion = {
      ns:this.form.value.ns5,
       ps:this.form.value.ps5,
       s:this.form.value.s5,
       ms:this.form.value.ms5,
       e:this.form.value.e5
    }

    detalleEvaluacion.push(evaluacion);
    
    if(this.respuesta6==='NS'){
      this.form.value.ns6='NS';
    }else if(this.respuesta6==='PS'){
      this.form.value.ps6='PS';
    }else if (this.respuesta6==='S'){
      this.form.value.s6='S';
    }else if(this.respuesta6==='MS'){
      this.form.value.ms6='MS';
    }else if(this.respuesta6=='E'){
      this.form.value.e6='E';
    }

    evaluacion = {
       ns:this.form.value.ns6,
       ps:this.form.value.ps6,
       s:this.form.value.s6,
       ms:this.form.value.ms6,
       e:this.form.value.e6
    }

    detalleEvaluacion.push(evaluacion);

    if(this.respuesta7==='NS'){
      this.form.value.ns7='NS';
    }else if(this.respuesta7==='PS'){
      this.form.value.ps7='PS';
    }else if (this.respuesta7==='S'){
      this.form.value.s7='S';
    }else if(this.respuesta7==='MS'){
      this.form.value.ms7='MS';
    }else if(this.respuesta7=='E'){
      this.form.value.e7='E';
    }

    evaluacion = {
      ns:this.form.value.ns7,
       ps:this.form.value.ps7,
       s:this.form.value.s7,
       ms:this.form.value.ms7,
       e:this.form.value.e7
    }

    detalleEvaluacion.push(evaluacion);
    
    if(this.respuesta8==='NS'){
      this.form.value.ns8='NS';
    }else if(this.respuesta8==='PS'){
      this.form.value.ps8='PS';
    }else if (this.respuesta8==='S'){
      this.form.value.s8='S';
    }else if(this.respuesta8==='MS'){
      this.form.value.ms8='MS';
    }else if(this.respuesta8=='E'){
      this.form.value.e8='E';
    }

    evaluacion = {
      ns:this.form.value.ns8,
       ps:this.form.value.ps8,
       s:this.form.value.s8,
       ms:this.form.value.ms8,
       e:this.form.value.e8
    }

    detalleEvaluacion.push(evaluacion);
    
    if(this.respuesta9==='NS'){
      this.form.value.ns9='NS';
    }else if(this.respuesta9==='PS'){
      this.form.value.ps9='PS';
    }else if (this.respuesta9==='S'){
      this.form.value.s9='S';
    }else if(this.respuesta9==='MS'){
      this.form.value.ms9='MS';
    }else if(this.respuesta9=='E'){
      this.form.value.e9='E';
    }

    evaluacion = {
      ns:this.form.value.ns9,
       ps:this.form.value.ps9,
       s:this.form.value.s9,
       ms:this.form.value.ms9,
       e:this.form.value.e9
    }

    detalleEvaluacion.push(evaluacion);

    if(this.respuesta10==='NS'){
      this.form.value.ns10='NS';
    }else if(this.respuesta10==='PS'){
      this.form.value.ps10='PS';
    }else if (this.respuesta10==='S'){
      this.form.value.s10='S';
    }else if(this.respuesta10==='MS'){
      this.form.value.ms10='MS';
    }else if(this.respuesta10=='E'){
      this.form.value.e10='E';
    }

    evaluacion = {
      ns:this.form.value.ns10,
       ps:this.form.value.ps10,
       s:this.form.value.s10,
       ms:this.form.value.ms10,
       e:this.form.value.e10
    }

    detalleEvaluacion.push(evaluacion);

    if(this.respuesta11==='NS'){
      this.form.value.ns11='NS';
    }else if(this.respuesta11==='PS'){
      this.form.value.ps11='PS';
    }else if (this.respuesta11==='S'){
      this.form.value.s11='S';
    }else if(this.respuesta11==='MS'){
      this.form.value.ms11='MS';
    }else if(this.respuesta11=='E'){
      this.form.value.e11='E';
    }

    evaluacion = {
      ns:this.form.value.ns11,
       ps:this.form.value.ps11,
       s:this.form.value.s11,
       ms:this.form.value.ms11,
       e:this.form.value.e11
    }

    detalleEvaluacion.push(evaluacion);

    if(this.respuesta12==='NS'){
      this.form.value.ns12='NS';
    }else if(this.respuesta12==='PS'){
      this.form.value.ps12='PS';
    }else if (this.respuesta12==='S'){
      this.form.value.s12='S';
    }else if(this.respuesta12==='MS'){
      this.form.value.ms12='MS';
    }else if(this.respuesta12=='E'){
      this.form.value.e12='E';
    }

    evaluacion = {
      ns:this.form.value.ns12,
       ps:this.form.value.ps12,
       s:this.form.value.s12,
       ms:this.form.value.ms12,
       e:this.form.value.e12
    }

    detalleEvaluacion.push(evaluacion);

    if(this.respuesta13==='NS'){
      this.form.value.ns13='NS';
    }else if(this.respuesta13==='PS'){
      this.form.value.ps13='PS';
    }else if (this.respuesta13==='S'){
      this.form.value.s13='S';
    }else if(this.respuesta13==='MS'){
      this.form.value.ms13='MS';
    }else if(this.respuesta13=='E'){
      this.form.value.e13='E';
    }

    evaluacion = {
      ns:this.form.value.ns13,
       ps:this.form.value.ps13,
       s:this.form.value.s13,
       ms:this.form.value.ms13,
       e:this.form.value.e13
    }

    detalleEvaluacion.push(evaluacion);


    if(this.respuesta14==='NS'){
      this.form.value.ns14='NS';
    }else if(this.respuesta14==='PS'){
      this.form.value.ps14='PS';
    }else if (this.respuesta14==='S'){
      this.form.value.s14='S';
    }else if(this.respuesta14==='MS'){
      this.form.value.ms14='MS';
    }else if(this.respuesta14=='E'){
      this.form.value.e14='E';
    }

    evaluacion = {
      ns:this.form.value.ns14,
       ps:this.form.value.ps14,
       s:this.form.value.s14,
       ms:this.form.value.ms14,
       e:this.form.value.e14
    }

    detalleEvaluacion.push(evaluacion);

    if(this.respuesta15==='NS'){
      this.form.value.ns15='NS';
    }else if(this.respuesta15==='PS'){
      this.form.value.ps15='PS';
    }else if (this.respuesta15==='S'){
      this.form.value.s15='S';
    }else if(this.respuesta15==='MS'){
      this.form.value.ms15='MS';
    }else if(this.respuesta15=='E'){
      this.form.value.e15='E';
    }

    evaluacion = {
      ns:this.form.value.ns15,
       ps:this.form.value.ps15,
       s:this.form.value.s15,
       ms:this.form.value.ms15,
       e:this.form.value.e15
    }

    detalleEvaluacion.push(evaluacion);
    
    if(this.respuesta16==='NS'){
      this.form.value.ns16='NS';
    }else if(this.respuesta16==='PS'){
      this.form.value.ps16='PS';
    }else if (this.respuesta16==='S'){
      this.form.value.s16='S';
    }else if(this.respuesta16==='MS'){
      this.form.value.ms16='MS';
    }else if(this.respuesta16=='E'){
      this.form.value.e16='E';
    }

    evaluacion = {
      ns:this.form.value.ns16,
       ps:this.form.value.ps16,
       s:this.form.value.s16,
       ms:this.form.value.ms16,
       e:this.form.value.e16
    }

    detalleEvaluacion.push(evaluacion);

    if(this.respuesta17==='NS'){
      this.form.value.ns17='NS';
    }else if(this.respuesta17==='PS'){
      this.form.value.ps17='PS';
    }else if (this.respuesta17==='S'){
      this.form.value.s17='S';
    }else if(this.respuesta17==='MS'){
      this.form.value.ms17='MS';
    }else if(this.respuesta17=='E'){
      this.form.value.e17='E';
    }

    evaluacion = {
      ns:this.form.value.ns17,
       ps:this.form.value.ps17,
       s:this.form.value.s17,
       ms:this.form.value.ms17,
       e:this.form.value.e17
    }

    detalleEvaluacion.push(evaluacion);
    
    if(this.respuesta18==='NS'){
      this.form.value.ns18='NS';
    }else if(this.respuesta18==='PS'){
      this.form.value.ps18='PS';
    }else if (this.respuesta18==='S'){
      this.form.value.s18='S';
    }else if(this.respuesta18==='MS'){
      this.form.value.ms18='MS';
    }else if(this.respuesta18=='E'){
      this.form.value.e18='E';
    }

    evaluacion = {
      ns:this.form.value.ns18,
       ps:this.form.value.ps18,
       s:this.form.value.s18,
       ms:this.form.value.ms18,
       e:this.form.value.e18
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
          alert(response.mensaje);
          this.form.reset();
        }else{
          alert(response.mensaje);
        }
      })

  }

}
