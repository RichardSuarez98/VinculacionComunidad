import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { CrudActividadesDiariasComponent } from './crud-actividades-diarias/crud-actividades-diarias.component';
import { CrudEvaluacionEstudiantilComponent } from './crud-evaluacion-estudiantil/crud-evaluacion-estudiantil.component';
import { ListarEvaluacionEstudiantilComponent } from './crud-evaluacion-estudiantil/listar-evaluacion-estudiantil/listar-evaluacion-estudiantil.component';
import { CrudEvaluacionRendimientoComponent } from './crud-evaluacion-rendimiento/crud-evaluacion-rendimiento.component';
import { ListarEvaluacionRendimientoComponent } from './crud-evaluacion-rendimiento/listar-evaluacion-rendimiento/listar-evaluacion-rendimiento.component';
import { CrudMonitoreoDocenteComponent } from './crud-monitoreo-docente/crud-monitoreo-docente.component';
import { ListarMonitoreoDocenteComponent } from './crud-monitoreo-docente/listar-monitoreo-docente/listar-monitoreo-docente.component';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { RoleGuard } from '../security/role.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { DirectorProyectoModuloComponent } from './director-proyecto-modulo/director-proyecto-modulo.component';
import { GestorVinculacionmoduloComponent } from './gestor-vinculacionmodulo/gestor-vinculacionmodulo.component';
import { DocenteTutorModuloComponent } from './docente-tutor-modulo/docente-tutor-modulo.component';
import { ActividadEstudianteModuloComponent } from './actividad-estudiante-modulo/actividad-estudiante-modulo.component';
import { EstudianteModuloComponent } from './estudiante-modulo/estudiante-modulo.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,children:[
    {path:'', component:InicioComponent},
   // {path:'asistencia', component:AsistenciaComponent},
    {path:'registroActividadesDiarias', component:CrudActividadesDiariasComponent},
    {path:'registroEvaluacionEstudiantil', component:ListarEvaluacionEstudiantilComponent},
    {path:'registroEvaluacionEstudiantillistado', component:CrudEvaluacionEstudiantilComponent},
    {path:'registroEvaluacionRendimiento', component:ListarEvaluacionRendimientoComponent},
    {path:'registroMonitoreoDocente', component:ListarMonitoreoDocenteComponent},


    // MODULO
    {path:'docenteDirector', component:DirectorProyectoModuloComponent,canActivate:[RoleGuard]},//,canActivate:[RoleGuard]
    {path:'gestorVinculacion', component:GestorVinculacionmoduloComponent,canActivate:[RoleGuard]},//,canActivate:[RoleGuard]
    {path:'docenteTutor', component:DocenteTutorModuloComponent,canActivate:[RoleGuard]},//,canActivate:[RoleGuard]
    {path:'actividadEvaluar', component:ActividadEstudianteModuloComponent,canActivate:[RoleGuard]},
    {path:'estudiante', component:EstudianteModuloComponent},  //,canActivate:[RoleGuard]


    //{path:'cronograma', component:CronogramaComponent},

    {path:'pagenotfound', component:PagenotfoundComponent},

//  {path:'usuarios', component:UsuarioComponent,canActivate:[RoleGuard]},

    /*{path:'docente', component:DocenteComponent,canActivate:[RoleGuard]},
    {path:'estudiante', component:EstudianteComponent,canActivate:[RoleGuard]},
    {path:'supervisor', component:SupervisorComponent,canActivate:[RoleGuard]},
    {path:'administracion', component:AdministracionComponent,canActivate:[RoleGuard]},
    {path:'director', component:DirectorComponent,canActivate:[RoleGuard]},*/

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
