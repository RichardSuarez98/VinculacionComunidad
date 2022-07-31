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
    idAsistenciaDe?: number;
    idEstudiante?:    number;
    idAsistencia?:    number;
    asistencia?:      boolean;
}

export interface IAsistenciaResponse {
    idEstudiante:     number;
    nombreEstudiante: string;
    cedula:           string;
    asistencia:       boolean;
}
