import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EstudianteService } from 'src/app/components/Service/estudiante.service';
import { asistenciaEstudianteList, IEstudianteQuery } from 'src/app/Interfaces/Estudiante';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.component.html',
  styleUrls: ['./ver-asistencia.component.css']
})
export class VerAsistenciaComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'asistencia'];
  datasource: any
  listAsistencia: asistenciaEstudianteList[]=[]

  nombre: any

  constructor(private _serviceEstudiante:EstudianteService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    var _finaldata=JSON.parse(localStorage.getItem('usuario')!);
    this.getVerAsistencia(_finaldata.idUsuario);

  }

  getVerAsistencia(idEstudiante:number){
    const solicitud : IEstudianteQuery={
      idEstudiante:idEstudiante
    }
    this._serviceEstudiante.getVerAsistenciaEstudiante(solicitud).subscribe(response=>{
      if(response.codigo==1){
        this.listAsistencia=response.data!;
        this.datasource = new MatTableDataSource(this.listAsistencia);
        this.datasource.paginator = this.paginator;

      }
    })

  }




}
