import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { RoleGuard } from '../security/role.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DirectorProyectoModuloComponent } from './director-proyecto-modulo/director-proyecto-modulo.component';
//import { GestorVinculacionmoduloComponent } from './gestor-vinculacionmodulo/gestor-vinculacionmodulo.component';
import { DocenteTutorModuloComponent } from './docente-tutor-modulo/docente-tutor-modulo.component';
import { ActividadEstudianteModuloComponent } from './docente-tutor-modulo/actividad-estudiante-modulo/actividad-estudiante-modulo.component';
import { EstudianteModuloComponent } from './estudiante-modulo/estudiante-modulo.component';
import { ReportesComponent } from './reportes/reportes.component';
import { AsistenciaEstudianteComponent } from './ProcesoFinal_pdf/asistencia-estudiante/asistencia-estudiante.component';
import { AdminRolComponent } from './admin-rol/admin-rol.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,children:[
    {path:'', component:InicioComponent},
    // MODULO
    {path:'docenteDirector', component:DirectorProyectoModuloComponent,canActivate:[RoleGuard]},//,canActivate:[RoleGuard]
    //{path:'gestorVinculacion', component:GestorVinculacionmoduloComponent,canActivate:[RoleGuard]},//,canActivate:[RoleGuard]
    {path:'docenteTutor', component:DocenteTutorModuloComponent,canActivate:[RoleGuard]},//,canActivate:[RoleGuard]
    //{path:'actividadEvaluar', component:ActividadEstudianteModuloComponent,canActivate:[RoleGuard]},
    {path:'estudiante', component:EstudianteModuloComponent},  //,canActivate:[RoleGuard]
    {path:'pagenotfound', component:PagenotfoundComponent},
    {path:'admin', component:AdminRolComponent},

    //{path:'reportes', component:ReportesComponent},

    //{path:'asistenciaFicha', component:AsistenciaEstudianteComponent},



  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
