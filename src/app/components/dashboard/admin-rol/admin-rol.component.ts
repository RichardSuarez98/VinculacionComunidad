import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { IFichaActividadDiaria } from 'src/app/Interfaces/Estudiante';
import { AdminServiceService, fichaAdmin } from '../../Service/admin-service.service';
import { AsistenciaEstudianteComponent } from '../ProcesoFinal_pdf/asistencia-estudiante/asistencia-estudiante.component';
import { CertificadoSupervisorComponent } from '../ProcesoFinal_pdf/certificado-supervisor/certificado-supervisor.component';
import { CertificadoTutorComponent } from '../ProcesoFinal_pdf/certificado-tutor/certificado-tutor.component';
import { FichaActividadesDiariasComponent } from '../ProcesoFinal_pdf/ficha-actividades-diarias/ficha-actividades-diarias.component';
import { FichaEvaluacionEstudiantilComponent } from '../ProcesoFinal_pdf/ficha-evaluacion-estudiantil/ficha-evaluacion-estudiantil.component';
import { FichaEvaluacionRendimientoEstudianteComponent } from '../ProcesoFinal_pdf/ficha-evaluacion-rendimiento-estudiante/ficha-evaluacion-rendimiento-estudiante.component';
import { FichaMonitoreoDocenteComponent } from '../ProcesoFinal_pdf/ficha-monitoreo-docente/ficha-monitoreo-docente.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';


export interface lstEstudia {
  idUsuario: string;
  nombreEstudiante: string;
 // population: string;
}


@Component({
  selector: 'app-admin-rol',
  templateUrl: './admin-rol.component.html',
  styleUrls: ['./admin-rol.component.css']
})
export class AdminRolComponent implements OnInit {
  displayedColumns: string[] = ['idUsuario','nombreUsuario','cedula','celular','correo','carrera','insitucion','rol','accion'];
  displayedColumns2: string[] = ['id','date','logs'];
  displayedColumns3: string[] = ['id','fecha','accion'];

  listEstudiantes: lstEstudia[]=[]
  idEstudiante!: number;
  idListFicha!: number;

  mostrarFichasEstudiante: IFichaActividadDiaria[]=[]
 // states: State[] = []
  listFicha:any []=[
    {valor:0,nombre:"Ficha de actividades diarias"},
    {valor:1,nombre:"Ficha de Evaluación Estudiantil"},
    {valor:2,nombre:"Ficha de Evaluación y Rendimiento"},
    {valor:3,nombre:"Certificado Tutor"},
    {valor:4,nombre:"Certificado Supervisor"},
    {valor:5,nombre:"Ficha de Monitoreo Docente"},
    {valor:6,nombre:"Ficha de Asistencia"},
  ]

  datasource: any
  datasource3: any
  datasourceLog: any

  listLog: any[]=[]
  listUsuarioTotales:any[]=[]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _log: AdminServiceService,public dialog: MatDialog,) {
   }


  ngOnInit(): void {
    this.mostrarLog();
    this.mostrarUsuarioTotales();
    this.MostrarEstudiantes();


    // this.mostrarFichasTecnicas();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasourceLog.filter = filterValue.trim().toLowerCase();
  }



  mostrarLog(){
    this._log.getLog().subscribe(resp=>{
      this.listLog=resp.data!;
      this.datasourceLog = new MatTableDataSource(this.listLog);
      this.datasourceLog.paginator = this.paginator;
    });
  }

  mostrarUsuarioTotales(){
    this._log.getUsuarioTotales().subscribe(resp=>{
      this.listUsuarioTotales=resp.data!;
      this.datasource = new MatTableDataSource(this.listUsuarioTotales);
      this.datasource.paginator = this.paginator;
    })
  }






  configurarUsuario(element:any){
    const dialogo=this.dialog.open(EditarUsuarioComponent,{
      width:'50%',
      height:'30%',
      data:element
    })
    dialogo.afterClosed().subscribe(result => {
      this.mostrarUsuarioTotales();
    });
  }



  MostrarEstudiantes(){
    //listEstudiantes
    this._log.getCargarEstudiantes().subscribe(resp=>{
      if(resp.codigo===1){
        this.listEstudiantes=resp.data!;
      }else{

      }
    });
  }


mostrarFichasTecnicas(){
let responseFicha: fichaAdmin={
idEstudiante:this.idEstudiante,
tipoFicha:this.idListFicha
};
  this._log.getFichaEstudiantil(responseFicha).subscribe(resp=>{
    console.log(resp.data);
    console.log(resp);

     this.mostrarFichasEstudiante=resp.data!;
     this.datasource3 = new MatTableDataSource(this.mostrarFichasEstudiante);

    /*if(resp.codigo===1){
      this.MostrarFichasEstudiante=resp.data!;
      console.log(this.MostrarFichasEstudiante);
      console.log(resp.data);
    }*/
  });
}



openDialogGeneral(element:any){

  switch (this.idListFicha) {
    case 0: //ficha actividades diarias
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
        break;
    case 1: //Ficha de Evaluación Estudiantil
    const dialogo1=this.dialog.open(FichaEvaluacionEstudiantilComponent,{
      width:'50%',
      height:'90%',
      data:element
    })
    dialogo1.afterClosed().subscribe(result => {
    });
        break;
    case 2: //Ficha de Evaluación y Rendimiento
          const dialogo2=this.dialog.open(FichaEvaluacionRendimientoEstudianteComponent,{
            width:'50%',
            height:'90%',
            data:element
          })
          dialogo2.afterClosed().subscribe(result => {
          });
        break;
        case 3: //Certificado Tutor
        const dialogo3=this.dialog.open(CertificadoTutorComponent,{
          width:'50%',
          height:'90%',
          data:element
        })
        dialogo3.afterClosed().subscribe(result => {
        });
          break;
          case 4: //Certificado Supervisor
          const dialogo4=this.dialog.open(CertificadoSupervisorComponent,{
            width:'50%',
            height:'90%',
            data:element
          })
          dialogo4.afterClosed().subscribe(result => {
          });
            break;
            case 5: //Ficha de Monitoreo Docente
            const dialogo5=this.dialog.open(FichaMonitoreoDocenteComponent,{
              width:'50%',
              height:'90%',
              data:element
            })
            dialogo5.afterClosed().subscribe(result => {
            });
              break;
              case 6: //Ficha de Asistencia
              const dialogo6=this.dialog.open(AsistenciaEstudianteComponent,{
                width:'50%',
                height:'90%',
                data:element
              })
              dialogo6.afterClosed().subscribe(result => {
              });
              break;
    default:
        //
        break;
 }

}











}











export interface IListFich {
  idEstudiante?:             number;
  idFevaluacionEstudiantil?: number;
  fechaGeneracion?:          Date;
}
