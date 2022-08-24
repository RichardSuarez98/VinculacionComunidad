import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  nomusu:any

  constructor(private route: Router) { }


  ngOnInit(): void {
    this.nomusu=JSON.parse(localStorage.getItem('usuario')!);
    /*var _finaldata=JSON.parse(localStorage.getItem('usuario')!);
    if(_finaldata.idRol===1){
     // console.log("Tienes acceso de Director de Carrera");

    }else if(_finaldata.idRol===2){
      //console.log("Tienes acceso de Gestor de Vinculación");
      this.route.navigate(['dashboard/gestorVinculacion']);
    }else if(_finaldata.idRol===3){
      //console.log("Tienes acces de Director de Proyecto");
      this.route.navigate(['dashboard/docenteDirector']);
    }
    else if(_finaldata.idRol===4){
     // console.log("Tienes acces de Docente Tutor");
     this.route.navigate(['dashboard/docenteTutor']);
    }else if(_finaldata.idRol===5){
     // console.log("Tienes acces de Supervisor");
     this.route.navigate(['dashboard/docenteTutor']);
    }else if(_finaldata.idRol===6){
      this.route.navigate(['dashboard/estudiante']);
    }*/

    /*
    {path:'docenteDirector', component:DirectorProyectoModuloComponent,canActivate:[RoleGuard]},//,canActivate:[RoleGuard]
    {path:'gestorVinculacion', component:GestorVinculacionmoduloComponent,canActivate:[RoleGuard]},//,canActivate:[RoleGuard]
    {path:'docenteTutor', component:DocenteTutorModuloComponent,canActivate:[RoleGuard]},//,canActivate:[RoleGuard]
    {path:'actividadEvaluar', component:ActividadEstudianteModuloComponent,canActivate:[RoleGuard]},
    {path:'estudiante', component:EstudianteModuloComponent,canActivate:[RoleGuard]},
    */

  }

}


