import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IActividades } from 'src/app/Interfaces/Actividad';
import { AsistenciaServiceService } from '../../Service/asistencia-service.service';
import { ServiceActividad } from '../../Service/service-actividad.service';
import { DetalleADComponent } from './detalle-ad/detalle-ad.component';

@Component({
  selector: 'app-crud-actividades-diarias',
  templateUrl: './crud-actividades-diarias.component.html',
  styleUrls: ['./crud-actividades-diarias.component.css']
})
export class CrudActividadesDiariasComponent implements OnInit {

  displayedColumns: string[] = ['nombreDocente','nombreSupervisor','numeroSemana','totalHoras','estadoDocente','estadoSupervisor','accion'];
  datasource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listActividad: IActividades[] = [];
  listCarrera: any[] = [];
  listAnioLectivo: any[] = [];
  listProyecto: any[] = [];
  form!: FormGroup

  idCarrera = 0;
  idAnioLectivo = 0;
  idProyecto = 0;

  deta: any[] = []

  lstEstados:any[] =[
    {valor:'R',name:'Reprobado'},
    {valor:'A',name:'Aprobado'},
    {valor:'SV',name:'Sin Verificar'},
    ]

    idEstado: any

    onChanges(element:any){
      console.log("hoy es 29 de julio");
      console.log(element);
      console.log(this.idEstado);
    }

/*
isTrue! :boolean;

    onChange(element:any) {
      console.log(element);
      if(element.active===true){
        this.isTrue=true;
      }else{
        this.isTrue=false;
      }
      const usu2 : any={
        userId:element.userId,
        active:this.isTrue,     
      }
     // userId
     // active
      

     this._usuarioService.putUsuario(usu2).subscribe(user =>{
        console.log(user);
    });

    } 
*/

//isChecked :boolean[]=[];
  constructor(private _asistenciaService: AsistenciaServiceService,private _actividadService: ServiceActividad,
    public dialog: MatDialog, private fb: FormBuilder,
   ) {
    this.form = this.fb.group({
      idCarrera: [0],
      idAnioLectivo: [0],
      idProyecto: [0],
      estadoDocente:[0]
      // active:[''],
    })
  }

  ngOnInit(): void {
    this.getCarrera();
    this.getAnioLectivo();
    this.getProyecto();
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(/*fac:IFactura*/) {

        const dialogo=this.dialog.open(DetalleADComponent,{
          width:'50%',
          height:'90%'
          //data:fac
        })
        dialogo.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.animal = result;
        });
   
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



  getActividad() {
    if (this.idProyecto != 0 && this.idCarrera != 0 && this.idAnioLectivo != 0) {
      const solicitud: IActividades = { idAnioLectivo: this.idAnioLectivo, idCarrera: this.idCarrera, idProyecto: this.idProyecto };
      console.log(solicitud);
      this._actividadService.get(solicitud).subscribe(response => {
        /*if(response.data!.estadoDocente === 1){

        }*/
        
        if (response.codigo == 1) {
          this.listActividad = response.data!;
          this.datasource = new MatTableDataSource(this.listActividad);
          this.datasource.paginator = this.paginator;
        }

      })
    }

  }

  cambiarEstadoActividad(actividad:IActividades){
    this._actividadService.putEstadoActividad(actividad).subscribe(response =>{
        if(response.codigo==1){
          console.log(response.mensaje);
          this.getActividad()
        }
    })
    console.log(actividad)
  }


}


