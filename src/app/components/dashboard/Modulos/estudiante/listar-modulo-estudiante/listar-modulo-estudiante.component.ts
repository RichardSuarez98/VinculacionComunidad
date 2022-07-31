import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListarModuloEstudianteService } from 'src/app/components/Service/listar-modulo-estudiante.service';

@Component({
  selector: 'app-listar-modulo-estudiante',
  templateUrl: './listar-modulo-estudiante.component.html',
  styleUrls: ['./listar-modulo-estudiante.component.css']
})
export class ListarModuloEstudianteComponent implements OnInit {
  /*
   "idFevaluacionEstudiantil": 6,
      "idUsuario": 2,
      "nombreEstudiante": "Richard Adrian Suarez Jacome",
      "idProyecto": 1,
      "tituloProyecto": "vacunacion",
      "idCarrera": 1,
      "nombreCarrera": "Ingeniería de Sistemas Computacionales",
      "nombreFicha": "Ficha Evaluación Estudiantil"
  */
  displayedColumns: string[] = ['idFevaluacionEstudiantil', 'nombreEstudiante','tituloProyecto','nombreCarrera','nombreFicha','accion'];
  datasource: any

  displayedColumns1: string[] = ['idUsuario', 'nombreEstudiante','nombreCarrera','accion'];
  datasource1: any

  displayedColumns2: string[] = ['idUsuario', 'nombreEstudiante','nombreCarrera','accion'];
  datasource2: any

  displayedColumns3: string[] = ['idUsuario', 'nombreEstudiante','nombreCarrera','accion'];
  datasource3: any


  listEvaluacionEstudiantil: any[] = [];

  constructor(private _fevaestu:ListarModuloEstudianteService) { }

  ngOnInit(): void {
    this.getFichaEvaluacionEstudaintil();
  }


getFichaEvaluacionEstudaintil(){
 this._fevaestu.getFicha(2).subscribe(response =>{
  if(response.codigo==1){
    console.log(response.data);
    this.listEvaluacionEstudiantil = response.data!;
    this.datasource = new MatTableDataSource(this.listEvaluacionEstudiantil);
  }
 })
}



}
