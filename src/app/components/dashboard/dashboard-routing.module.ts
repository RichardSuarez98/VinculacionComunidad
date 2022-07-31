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
import { DocenteComponent } from './Modulos/docente/docente.component';
import { InicioComponent } from './inicio/inicio.component';
import { EstudianteComponent } from './Modulos/estudiante/estudiante.component';
import { SupervisorComponent } from './Modulos/supervisor/supervisor.component';
import { AdministracionComponent } from './Modulos/administracion/administracion.component';
import { DirectorComponent } from './Modulos/director/director.component';
import { ListarModuloEstudianteComponent } from './Modulos/estudiante/listar-modulo-estudiante/listar-modulo-estudiante.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,children:[
    {path:'', component:InicioComponent},
    {path:'asistencia', component:AsistenciaComponent},
    {path:'registroActividadesDiarias', component:CrudActividadesDiariasComponent},
    {path:'registroEvaluacionEstudiantil', component:ListarEvaluacionEstudiantilComponent},
    {path:'registroEvaluacionEstudiantillistado', component:CrudEvaluacionEstudiantilComponent},
    {path:'registroEvaluacionRendimiento', component:ListarEvaluacionRendimientoComponent},
    {path:'registroMonitoreoDocente', component:ListarMonitoreoDocenteComponent},


    {path:'docente', component:DocenteComponent},
    {path:'estudiante', component:EstudianteComponent},
    {path:'supervisor', component:SupervisorComponent},
    {path:'administracion', component:AdministracionComponent},
    {path:'director', component:DirectorComponent},



    {path:'consultaFichaEstudiantil',component:ListarModuloEstudianteComponent}
    //  {path:'registrarusuario', component:RegistrarUsuarioComponent},
   // {path:'registrarusuario/:id', component:RegistrarUsuarioComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
