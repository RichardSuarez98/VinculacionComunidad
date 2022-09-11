
export interface IActividades {
    idActividadesDiarias?: number;
    numeroSemana?:         number;
    totalHoras?:           number;
    idEstudiante?:         number;
    idAnioLectivo?:        number;
    idProyecto?:           number;
    idCarrera?:            number;
    idDocente?:            number;
    idSupervisor?:         number;
    estadoDocente?:        string;
    estadoSupervisor?:     string;
    detaActividad?:        DetaActividad[];
}

export interface DetaActividad {
  idActividadDiDeta?:    number;
  idActividadesDiarias?: number;
  fecha?:                string;
  descripcionActividad?: string;
  horas?:                number;
  estadoDocente?:        string;
  estadoSupervisor?:     string;
  observacion?:          string;
  estadoActividad?:       boolean;
}


export interface IActividadesDetallePrueba {
  idActividadesDiarias: number;
  idCarrera:            number;
  idAnioLectivo:        number;
  idProyecto:           number;
  idDocente:            number;
  idEstudiante:         number;
  idSupervisor:         number;
  idActividadDiDeta:    number;
  fecha:                Date;
  descripcionActividad: string;
  horas:                number;
}




export interface IActividadConsulta {
  descripcionActividad:    string;
  fecha:                   Date;
  idActividadesDiarias:    number;
  idEstudiante:            number;
  nombreEstudiante:        string;
  idDocente:               number;
  nombreDocente:           string;
  idSupervisor:            number;
  nombreSupervisor:        string;
  estadoGestorVinculacion: string;
  porcentaje:              number;
  horas:                   number;
  estadoDocente:           string;
  idActividadDiDeta?:      number;
}
