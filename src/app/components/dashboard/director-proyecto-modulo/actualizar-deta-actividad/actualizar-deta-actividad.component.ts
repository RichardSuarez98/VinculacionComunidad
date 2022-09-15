import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceActividad } from 'src/app/components/Service/service-actividad.service';
import { DetaActividad } from 'src/app/Interfaces/Actividad';
//import swal from 'sweetalert';
@Component({
  selector: 'app-actualizar-deta-actividad',
  templateUrl: './actualizar-deta-actividad.component.html',
  styleUrls: ['./actualizar-deta-actividad.component.css']
})
export class ActualizarDetaActividadComponent implements OnInit {
  form!: FormGroup

  fecha!: Date
  horas!: number
  descripcionActividad!: string
  idActividadDiDeta!: number
  idActividadesDiarias!: number

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public list: any,    public dialogo: MatDialogRef<ActualizarDetaActividadComponent>,
  private _snackBar: MatSnackBar, private _serviceActividad: ServiceActividad) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      horas: [1, Validators.required],
      descripcionActividad: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    console.log(this.list);
    this.cargarDatos();
  }


  cargarDatos(){
    this.descripcionActividad=this.list.descripcionActividad
    this.fecha=this.list.fecha.replace("T00:00:00", "");
    this.horas=this.list.horas
    this.idActividadDiDeta=this.list.idActividadDiDeta
    this.idActividadesDiarias=this.list.idActividadesDiarias
  }

  guardarCambios(){
    console.log("hola que tal");

    let solicitud : DetaActividad={
      descripcionActividad:this.form.value.descripcionActividad,
      fecha:this.form.value.fecha,
      horas:this.form.value.horas,
      idActividadDiDeta:this.list.idActividadDiDeta,
      idActividadesDiarias:this.list.idActividadesDiarias
    }
   // console.log(solicitud);
    this._serviceActividad.putActualizarDetalleActividad(solicitud).subscribe(resp=>{
      if(resp.codigo===1){
      //  swal("Buen Trabajo!", resp.mensaje, "success");
        this.dialogo.close(false);
      }else{
      //  swal("Oops..!",  resp.mensaje, "warning");
      }
    })
  }



  mensaje(mensaje:string){
    this._snackBar.open(mensaje, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }


}
