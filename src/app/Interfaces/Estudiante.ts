export interface IEstudianteQuery {
  idProyecto?:     number;
  idEstudiante?:   number;
  idActividadDiDeta?:  number;
  asistenciaInicio?:   string;
  asistenciaFin?:      string;
  evidenciaActividad?: string;
}



export interface IEstudianteLista {
  fecha?:                Date;
  descripcionActividad?: string;
  horas?:                number;
  estadoDocente?:        string;
  estadoSupervisor?:     string;
  observacion?:          string;
  fechaReal?:            Date;
  idActividadDiDeta?:    number;
  idDocente?:            number;
  nombreDocente?:        string;
  nombreSupervisor?:     string;
  porcentaje?:           number;
  evidenciaActividad?:   string;
  asistenciaInicio?:     string;
  asistenciaFin?:        string;
}


export interface IFichaActividadDiaria {
  nombreCarrera?:        string;
  nombreEstudiante?:     string;
  nombreDocente?:        string;
  nombreSupervisor?:     string;
  cedulaSupervisor?:     string;
  fecha?:                Date;
  horas?:                number;
  descripcionActividad?: string;
  totalHoras?:           number;
  fechaGeneracion?:       Date;
}




export interface IFichaEvaluacionEstudiantil {
  fechaGeneracion?:   Date;
  nombreInstitucion?: string;
  nombreCarrera?:     string;
  cedEstudiante?:     string;
  nombreEstudiante?:  string;
  nombreDocente?:     string;
  nombreSupervisor?:  string;
  areaDepartamento?:  string;
  cedulaSupervisor?:  string;
  calificacion?:      string;
 /* ns?:                string;
  ps?:                string;
  s?:                 string;
  ms?:                string;
  e?:                 string;*/
}
