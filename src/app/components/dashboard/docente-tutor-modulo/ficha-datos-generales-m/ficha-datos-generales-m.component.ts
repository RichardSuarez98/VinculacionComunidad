import { Component, OnInit } from '@angular/core';
import { AsistenciaServiceService } from 'src/app/components/Service/asistencia-service.service';
import { EstudianteService } from 'src/app/components/Service/estudiante.service';
import { ServiceActividad } from 'src/app/components/Service/service-actividad.service';
import { guardarDatosGeneralResponse } from 'src/app/Interfaces/IFichaDatosGenerales';
//import swal from 'sweetalert';

@Component({
  selector: 'app-ficha-datos-generales-m',
  templateUrl: './ficha-datos-generales-m.component.html',
  styleUrls: ['./ficha-datos-generales-m.component.css']
})
export class FichaDatosGeneralesMComponent implements OnInit {
  idCarrera = 0;
  idAnioLectivo = 0;
  idProyecto = 0;

  fechaInicio!: Date;
  fechaProgramada!:  Date;
  fechaFinReal!:    Date;
  diasSema!: string;
  horario!: string;
  jornada!: string


  listCarrera: any[] = [];
  listAnioLectivo: any[] = [];
  listProyecto: any[] = [];

  constructor(private _asistenciaService: AsistenciaServiceService,private _actividadService: ServiceActividad,private _ficha: EstudianteService) { }

  ngOnInit(): void {
    this.getCarrera();
    this.getAnioLectivo();
    this.getProyecto();
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



  guardarFicha(){

    let solici : guardarDatosGeneralResponse={
      idAnioLectivo:this.idAnioLectivo,
      idCarrera:this.idCarrera,
      idProyecto:this.idProyecto,
      fechaInicio:this.fechaInicio,
      fechaProgramada:this.fechaProgramada,
      fechaFinalReal:this.fechaFinReal,
      diasSemanas:this.diasSema,
      horario:this.horario,
      jornadaPractica:this.jornada
    }

   this._ficha.guardarFichaDatosGenerales(solici).subscribe(resp=>{
      if(resp.codigo===1){
      //  swal("Buen trabajo!", resp.mensaje, "success");
      }else if(resp.codigo===0){
      //  swal("Oops..!",  resp.mensaje, "warning");
      }
    });
  }



}
