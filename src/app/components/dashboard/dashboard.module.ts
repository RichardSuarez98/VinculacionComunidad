import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FichaEvaluacionRendimientoEstudianteComponent } from './ProcesoFinal_pdf/ficha-evaluacion-rendimiento-estudiante/ficha-evaluacion-rendimiento-estudiante.component';
import { FichaEvaluacionEstudiantilComponent } from './ProcesoFinal_pdf/ficha-evaluacion-estudiantil/ficha-evaluacion-estudiantil.component';
import { FichaDatosGeneralesComponent } from './ProcesoFinal_pdf/ficha-datos-generales/ficha-datos-generales.component';
import { FichaMonitoreoDocenteComponent } from './ProcesoFinal_pdf/ficha-monitoreo-docente/ficha-monitoreo-docente.component';
import { CertificadoTutorComponent } from './ProcesoFinal_pdf/certificado-tutor/certificado-tutor.component';
import { CertificadoSupervisorComponent } from './ProcesoFinal_pdf/certificado-supervisor/certificado-supervisor.component';
import { AsistenciaEstudianteComponent } from './ProcesoFinal_pdf/asistencia-estudiante/asistencia-estudiante.component';
import { FichaActividadesDiariasComponent } from './ProcesoFinal_pdf/ficha-actividades-diarias/ficha-actividades-diarias.component';
import { EvidenciasComponent } from './ProcesoFinal_pdf/evidencias/evidencias.component';
import { AsistenciaComponent } from './docente-tutor-modulo/asistencia/asistencia.component';
import { DetalleADComponent } from './director-proyecto-modulo/detalle-ad/detalle-ad.component';
import { CrudEvaluacionEstudiantilComponent } from './docente-tutor-modulo/crud-fichas-evaluativas/crud-evaluacion-estudiantil/crud-evaluacion-estudiantil.component';
import { CrudEvaluacionRendimientoComponent } from './docente-tutor-modulo/crud-fichas-evaluativas/crud-evaluacion-rendimiento/crud-evaluacion-rendimiento.component';
import { CrudMonitoreoDocenteComponent } from './docente-tutor-modulo/crud-fichas-evaluativas/crud-monitoreo-docente/crud-monitoreo-docente.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DirectorProyectoModuloComponent } from './director-proyecto-modulo/director-proyecto-modulo.component';
//import { GestorVinculacionmoduloComponent } from './gestor-vinculacionmodulo/gestor-vinculacionmodulo.component';
import { DocenteTutorModuloComponent } from './docente-tutor-modulo/docente-tutor-modulo.component';
import { ActividadEstudianteModuloComponent } from './docente-tutor-modulo/actividad-estudiante-modulo/actividad-estudiante-modulo.component';
import { EstudianteModuloComponent } from './estudiante-modulo/estudiante-modulo.component';
import { VerAsistenciaComponent } from './estudiante-modulo/ver-asistencia/ver-asistencia.component';
import { ActualizarDetaActividadComponent } from './director-proyecto-modulo/actualizar-deta-actividad/actualizar-deta-actividad.component';
import { ReportesComponent } from './reportes/reportes.component';
import { FichaAsistenciaEstudianteComponent } from './ProcesoFinal_pdf/ficha-asistencia-estudiante/ficha-asistencia-estudiante.component';
import { AdminRolComponent } from './admin-rol/admin-rol.component';
import { EditarUsuarioComponent } from './admin-rol/editar-usuario/editar-usuario.component';
//import { EditarUsuarioComponent } from './adminRol/editar-usuario/editar-usuario.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    FichaEvaluacionRendimientoEstudianteComponent,
    FichaEvaluacionEstudiantilComponent,
    FichaDatosGeneralesComponent,
    FichaMonitoreoDocenteComponent,
    CertificadoTutorComponent,
    CertificadoSupervisorComponent,
    AsistenciaEstudianteComponent,
    FichaActividadesDiariasComponent,
    EvidenciasComponent,
    AsistenciaComponent,
    DetalleADComponent,
    CrudEvaluacionEstudiantilComponent,
    CrudEvaluacionRendimientoComponent,
    CrudMonitoreoDocenteComponent,
    PagenotfoundComponent,
         DirectorProyectoModuloComponent,
         //GestorVinculacionmoduloComponent,
         DocenteTutorModuloComponent,
         ActividadEstudianteModuloComponent,
         EstudianteModuloComponent,
         VerAsistenciaComponent,
         ActualizarDetaActividadComponent,
         ReportesComponent,
         FichaAsistenciaEstudianteComponent,
         AdminRolComponent,
         EditarUsuarioComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,

  ]
})
export class DashboardModule { }
