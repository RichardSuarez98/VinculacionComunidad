export interface IAsistenciaQuery {
    idAsistencia?:   number;
    idAnioLectivo?:  number;
    idProyecto?:     number;
    fecha?:          string;
    tipoAsistencia?: string;
    idCarrera?:      number;
    detaAsistencia?: DetaAsistencia[];
}

export interface DetaAsistencia {
    //IdAsistenciaDet?:        number;
    idAsistenciaDet?:  number;
    idEstudiante?:    number;
    idAsistencia?:    number;
    asistencia?:      boolean;
}

export interface IAsistenciaResponse {
    idAsistenciaDet?:        number;
    idEstudiante:     number;
    nombreEstudiante: string;
    cedula:           string;
    asistencia:       boolean;
}



export interface IAsistenciaEvidencia {
  idAsistenciaDet?:  number;
  idEstudiante?:     number;
  nombreEstudiante?: string;
  cedula?:           string;
  asistencia?:       boolean;
  evidenciaInicio?:  string;
  evidenciaFin?:     string;
}
