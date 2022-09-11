import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/components/Service/admin-service.service';
import { IactualizarDatos } from 'src/app/Interfaces/IActualizarDatos';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

 listRoles:any[]=[]
 idRol!: number
 password!: string

  constructor(private _admin:AdminServiceService, @Inject(MAT_DIALOG_DATA) public list: any,
  private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.cargarRoles();
    this.idRol=this.list.idRol
  }



  cargarRoles(){
    this._admin.getCargarRoles().subscribe(resp=>{
      this.listRoles=resp.data!;
    });
  }





  guardarCambios(){
    if(this.password===undefined){
      this.password="";
    }
    let actualizarDatos:IactualizarDatos={
      idRol:this.idRol,
      idUsuario:this.list.idUsuario,
      password:this.password
    }
    console.log(actualizarDatos);
   this._admin.actualizarDatos(actualizarDatos).subscribe(resp=>{
      if(resp.codigo===1){
        this.mensaje(resp.mensaje);
      }else{
        this.mensaje(resp.mensaje);
      }
    });
  }





  mensaje(mensaje: string) {
    this._snackBar.open(mensaje, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }






}
