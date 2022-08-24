export interface ICertificacion {
  fechaGeneracion:  Date;
  tituloProyecto:   string;
  nombreCarrera:    string;
  nombreEstudiante: string;
  nombreDocente:    string;
  identificacion:   string;
  nomAnioLectivo:   string;
  totalHoras:       number;
  minFecha:         Date;
  maxFecha:         Date;
}



export interface ICertificacionSupervisor {
  fechaGeneracion?:  Date;
  tituloProyecto?:   string;
  nombreCarrera?:    string;
  nombreEstudiante?: string;
  nombreSupervisor?:    string;
  identificacion?:   string;
  nomAnioLectivo?:   string;
  totalHoras?:       number;
  minFecha?:         Date;
  maxFecha?:         Date;
}
