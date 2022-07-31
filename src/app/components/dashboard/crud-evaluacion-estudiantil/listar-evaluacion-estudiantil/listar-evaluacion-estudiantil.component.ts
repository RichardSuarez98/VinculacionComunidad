import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsistenciaServiceService } from 'src/app/components/Service/asistencia-service.service';
import { EvaluacionEstudiantilServiceService } from 'src/app/components/Service/evaluacion-estudiantil-service.service';
import { IEvaluacionEstudiantil } from 'src/app/Interfaces/EvaluacionEstudiantil';
import { DetalleADComponent } from '../../crud-actividades-diarias/detalle-ad/detalle-ad.component';
import { CrudEvaluacionEstudiantilComponent } from '../crud-evaluacion-estudiantil.component';

@Component({
  selector: 'app-listar-evaluacion-estudiantil',
  templateUrl: './listar-evaluacion-estudiantil.component.html',
  styleUrls: ['./listar-evaluacion-estudiantil.component.css']
})
export class ListarEvaluacionEstudiantilComponent implements OnInit {

  displayedColumns: string[] = ['idUsuario', 'nombreEstudiante','nombreCarrera','accion'];
  datasource: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listEvaluacionEstudiantil: IEvaluacionEstudiantil[] = [];
  listCarrera: any[] = [];
  listAnioLectivo: any[] = [];
  listProyecto: any[] = [];
  form!: FormGroup

  idCarrera = 0;
  idAnioLectivo = 0;
  idProyecto = 0;

  deta: any[] = []
  constructor(private _asistenciaService: AsistenciaServiceService,private _fevaEstudiantil: EvaluacionEstudiantilServiceService,
    public dialog: MatDialog, private fb: FormBuilder,) {
    this.form = this.fb.group({
      idCarrera: [0],
      idAnioLectivo: [0],
      idProyecto: [0],
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
        const dialogo=this.dialog.open(CrudEvaluacionEstudiantilComponent,{
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
    
    
    
      getEvaluacionEstudiantil() {
        if (this.idProyecto != 0 && this.idCarrera != 0 && this.idAnioLectivo != 0) {
          const solicitud: IEvaluacionEstudiantil = { idAnioLectivo: this.idAnioLectivo, idCarrera: this.idCarrera, idProyecto: this.idProyecto };
          console.log(solicitud);
          this._fevaEstudiantil.get(solicitud).subscribe(response => {
            console.log(response);
            if (response.codigo == 1) {
    
              this.listEvaluacionEstudiantil = response.data!;
              this.datasource = new MatTableDataSource(this.listEvaluacionEstudiantil);
              this.datasource.paginator = this.paginator;
            }    
          })
        }
      }






}
