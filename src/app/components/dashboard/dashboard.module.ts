import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DialogEliminarComponent } from './dialog-eliminar/dialog-eliminar.component';
import { FichaEvaluacionRendimientoEstudianteComponent } from './ProcesoFinal_pdf/ficha-evaluacion-rendimiento-estudiante/ficha-evaluacion-rendimiento-estudiante.component';
import { FichaEvaluacionEstudiantilComponent } from './ProcesoFinal_pdf/ficha-evaluacion-estudiantil/ficha-evaluacion-estudiantil.component';
import { FichaDatosGeneralesComponent } from './ProcesoFinal_pdf/ficha-datos-generales/ficha-datos-generales.component';
import { FichaMonitoreoDocenteComponent } from './ProcesoFinal_pdf/ficha-monitoreo-docente/ficha-monitoreo-docente.component';
import { CertificadoTutorComponent } from './ProcesoFinal_pdf/certificado-tutor/certificado-tutor.component';
import { CertificadoSupervisorComponent } from './ProcesoFinal_pdf/certificado-supervisor/certificado-supervisor.component';
import { AsistenciaEstudianteComponent } from './ProcesoFinal_pdf/asistencia-estudiante/asistencia-estudiante.component';
import { FichaActividadesDiariasComponent } from './ProcesoFinal_pdf/ficha-actividades-diarias/ficha-actividades-diarias.component';
import { EvidenciasComponent } from './ProcesoFinal_pdf/evidencias/evidencias.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { CrudActividadesDiariasComponent } from './crud-actividades-diarias/crud-actividades-diarias.component';
import { DetalleADComponent } from './crud-actividades-diarias/detalle-ad/detalle-ad.component';
import { CrudEvaluacionEstudiantilComponent } from './crud-evaluacion-estudiantil/crud-evaluacion-estudiantil.component';
import { ListarEvaluacionEstudiantilComponent } from './crud-evaluacion-estudiantil/listar-evaluacion-estudiantil/listar-evaluacion-estudiantil.component';
import { CrudEvaluacionRendimientoComponent } from './crud-evaluacion-rendimiento/crud-evaluacion-rendimiento.component';
import { ListarEvaluacionRendimientoComponent } from './crud-evaluacion-rendimiento/listar-evaluacion-rendimiento/listar-evaluacion-rendimiento.component';
import { CrudMonitoreoDocenteComponent } from './crud-monitoreo-docente/crud-monitoreo-docente.component';
import { ListarMonitoreoDocenteComponent } from './crud-monitoreo-docente/listar-monitoreo-docente/listar-monitoreo-docente.component';

import { SupervisorComponent } from './Modulos/supervisor/supervisor.component';
import { EstudianteComponent } from './Modulos/estudiante/estudiante.component';
import { DocenteComponent } from './Modulos/docente/docente.component';
import { DirectorComponent } from './Modulos/director/director.component';
import { AdministracionComponent } from './Modulos/administracion/administracion.component';
import { ListarModuloEstudianteComponent } from './Modulos/estudiante/listar-modulo-estudiante/listar-modulo-estudiante.component';
//import { FichaEvaluacionRendimientoEstudianteComponent } from './FichasTecnicas/ficha-evaluacion-rendimiento-estudiante/ficha-evaluacion-rendimiento-estudiante.component';
//import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    DialogEliminarComponent,
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
    CrudActividadesDiariasComponent,
    DetalleADComponent,
    CrudEvaluacionEstudiantilComponent,
    ListarEvaluacionEstudiantilComponent,
    CrudEvaluacionRendimientoComponent,
    ListarEvaluacionRendimientoComponent,
    CrudMonitoreoDocenteComponent,
    ListarMonitoreoDocenteComponent,
    DocenteComponent,
    EstudianteComponent,
    SupervisorComponent,
    DirectorComponent,
    AdministracionComponent,
    ListarModuloEstudianteComponent,
    //NavbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    
  ]
})
export class DashboardModule { }