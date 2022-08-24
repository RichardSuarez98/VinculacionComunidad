import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IEstudianteLista, IEstudianteQuery, IFichaActividadDiaria } from 'src/app/Interfaces/Estudiante';
import { ICertificacion, ICertificacionSupervisor } from 'src/app/Interfaces/ICertificacion';
import { EstudianteService } from '../../Service/estudiante.service';
import { CertificadoSupervisorComponent } from '../ProcesoFinal_pdf/certificado-supervisor/certificado-supervisor.component';
import { CertificadoTutorComponent } from '../ProcesoFinal_pdf/certificado-tutor/certificado-tutor.component';
import { FichaActividadesDiariasComponent } from '../ProcesoFinal_pdf/ficha-actividades-diarias/ficha-actividades-diarias.component';
import { FichaEvaluacionEstudiantilComponent } from '../ProcesoFinal_pdf/ficha-evaluacion-estudiantil/ficha-evaluacion-estudiantil.component';
import { FichaEvaluacionRendimientoEstudianteComponent } from '../ProcesoFinal_pdf/ficha-evaluacion-rendimiento-estudiante/ficha-evaluacion-rendimiento-estudiante.component';

@Component({
  selector: 'app-estudiante-modulo',
  templateUrl: './estudiante-modulo.component.html',
  styleUrls: ['./estudiante-modulo.component.css']
})
export class EstudianteModuloComponent implements OnInit {
  displayedColumns: string[] = ['idActividadesDiarias','nombreEstudiante','nombreDocente'];
  datasource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  panelOpenState = false;

  listActividad: IEstudianteLista[]=[]
  listFichaActividadDiaria: IFichaActividadDiaria[]=[]
  listFichaEvaluacionEstudiantil: IFichaActividadDiaria[]=[]
  listFichaEvaluacionRendimiento: IFichaActividadDiaria[]=[]



  nombreDocente!: string;
  nombreSupervisor!: string;
  porcentaje!:     number;

  lstEstados:any[] =[
    {valor:'NO',name:'Reprobado',colorbox:'red'},
    {valor:'SI',name:'Aprobado',colorbox:'green'},
    {valor:'SV',name:'Sin Verificar',colorbox:'black'},
    ]

  form!: FormGroup
   constructor(private _estudianteService: EstudianteService,
    public dialog: MatDialog, private fb: FormBuilder,private _snackBar: MatSnackBar,
   ) {
    this.form = this.fb.group({
      idCarrera: [0],
      idAnioLectivo: [0],
      idProyecto: [0],
      estadoDocente:[0],

     /* evidenciaActividad:[''],
      asistenciaInicio:[''],
      asistenciaFin:['']*/

      // active:[''],
    })
  }

  ngOnInit(): void {
    var _finaldata=JSON.parse(localStorage.getItem('usuario')!);
    this.getActividadesDiarias(_finaldata.idUsuario);
    this.listarFichaActividadDiaria(_finaldata.idUsuario);
    this.listarFichaEvaluacionEstudiantil(_finaldata.idUsuario);
    this.listarFichaEvaluacionRendimiento(_finaldata.idUsuario);
    this.listarCertificadoTutor(_finaldata.idUsuario);
    this.listarCertificacionSupervisor(_finaldata.idUsuario)
  }

  /*applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listActividad.filter = filterValue.trim().toLowerCase();
  }*/

  getActividadesDiarias(idEstudiante:number){
    const solicitud : IEstudianteQuery={
      idEstudiante:idEstudiante
    }
    this._estudianteService.getActividades(solicitud).subscribe(resp=>{
        if(resp.codigo==1){
          console.log(resp.data);
          this.listActividad=resp.data!;
          this.nombreDocente=this.listActividad[0].nombreDocente!;
          this.nombreSupervisor=this.listActividad[0].nombreSupervisor!;
          this.porcentaje=this.listActividad[0].porcentaje!;

         // this.listActividad.paginator = this.paginator;
          console.log(this.listActividad);
        }
    })
  }




  alert0(){
    alert("bien hecho");
  }

  Guardarevidenciar(item:IEstudianteLista){
    let evidencia: IEstudianteQuery={
      idActividadDiDeta:item.idActividadDiDeta,
      evidenciaActividad:item.evidenciaActividad,
      asistenciaInicio:item.asistenciaInicio,
      asistenciaFin:item.asistenciaFin
    }
    this._estudianteService.putGuardarEvidencia(evidencia).subscribe(resp=>{
      if(resp.codigo==1){
        this.mensaje(resp.mensaje);
      }else if(resp.codigo==1){
        this.mensaje(resp.mensaje);
      }
    })
    console.log(item);
  }



  openDialog(element:any) {

    const dialogo=this.dialog.open(FichaActividadesDiariasComponent,{
      width:'50%',
      height:'90%',
      data:element
      //data:element    //IFichaActividadDiaria
    })
    dialogo.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });

  }

  listarFichaActividadDiaria(idEstudiante:number){
    let numeroEstudiante: IEstudianteQuery={
        idEstudiante:idEstudiante
    }
    this._estudianteService.fichaActividadDiaria(numeroEstudiante).subscribe(resp=>{
      if(resp.codigo==1){
        this.listFichaActividadDiaria=resp.data!;
        console.log(resp.data);
      }
    })
  }



  listarFichaEvaluacionEstudiantil(idEstudiante:number){
    let numeroEstudiante: IEstudianteQuery={
      idEstudiante:idEstudiante
  }
  this._estudianteService.fichaEvaluacionEstudiantil(numeroEstudiante).subscribe(resp=>{
    if(resp.codigo==1){
      this.listFichaEvaluacionEstudiantil=resp.data!;
      console.log(resp.data);
    }
  })
  }

  openDialogFichaEvaluacionEstudiantil(element:any) {

    const dialogo=this.dialog.open(FichaEvaluacionEstudiantilComponent,{
      width:'50%',
      height:'90%',
      data:element
    })
    dialogo.afterClosed().subscribe(result => {
    });
  }

//listFichaEvaluacionRendimiento
  listarFichaEvaluacionRendimiento(idEstudiante:number){
    let numeroEstudiante: IEstudianteQuery={
      idEstudiante:idEstudiante
  }
  this._estudianteService.fichaEvaluacionRendimiento(numeroEstudiante).subscribe(resp=>{
    if(resp.codigo==1){
      this.listFichaEvaluacionRendimiento=resp.data!;
      console.log(resp.data);
    }
  })
  }

  openDialogFichaEvaluacionRendimiento(element:any) {

    const dialogo=this.dialog.open(FichaEvaluacionRendimientoEstudianteComponent,{
      width:'50%',
      height:'90%',
      data:element
    })
    dialogo.afterClosed().subscribe(result => {
    });
  }




  listCertificadoTutor: ICertificacion[]=[]
  listarCertificadoTutor(idEstudiante:number){
    let numeroEstudiante: IEstudianteQuery={
      idEstudiante:idEstudiante
  }
  this._estudianteService.DescargarCertificacionTutor(numeroEstudiante).subscribe(resp=>{
    if(resp.codigo==1){
      this.listCertificadoTutor=resp.data!;
      console.log(resp.data);
    }
  })
  }

  openDialogCertificadoTutor(element:any) {

    const dialogo=this.dialog.open(CertificadoTutorComponent,{
      width:'50%',
      height:'90%',
      data:element
    })
    dialogo.afterClosed().subscribe(result => {
    });
  }

/*
ICertificacionSupervisor
*/


listCertificacionSupervisor: ICertificacionSupervisor[]=[]
listarCertificacionSupervisor(idEstudiante:number){
  let numeroEstudiante: IEstudianteQuery={
    idEstudiante:idEstudiante
}
this._estudianteService.DescargarCertificacionSupervisor(numeroEstudiante).subscribe(resp=>{
  if(resp.codigo==1){
    this.listCertificacionSupervisor=resp.data!;
    console.log(resp.data);
  }
})
}

openDialogCertificacionSupervisor(element:any) {

  const dialogo=this.dialog.open(CertificadoSupervisorComponent,{
    width:'50%',
    height:'90%',
    data:element
  })
  dialogo.afterClosed().subscribe(result => {
  });
}













  mensaje(mensaje:string){
    this._snackBar.open(mensaje, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }



}
