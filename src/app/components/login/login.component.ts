import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../Service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: Router,
    private service: LoginService) {
    this.form = this.fb.group({
      NombreUsuario: ['', Validators.required],
      password: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ingresar() {
    this.service.login(this.form.value).subscribe(user => {
      if (user.codigo == 1) {
        this.mensaje(user.mensaje);
        var _finaldata=JSON.parse(localStorage.getItem('usuario')!);
        if(_finaldata.idRol===1){// console.log("Tienes acceso de Director de Carrera");
          this.route.navigate(['dashboard/docenteDirector']);
        }else if(_finaldata.idRol===2){//console.log("Tienes acceso de Gestor de Vinculación");
          this.route.navigate(['dashboard/docenteDirector']);
        }else if(_finaldata.idRol===3){//console.log("Tienes acces de Director de Proyecto");
          this.route.navigate(['dashboard/docenteDirector']);
        }
        else if(_finaldata.idRol===4){// console.log("Tienes acces de Docente Tutor");
         this.route.navigate(['dashboard/docenteTutor']);
        }else if(_finaldata.idRol===5){// console.log("Tienes acces de Supervisor");
         this.route.navigate(['dashboard/docenteTutor']);
        }else if(_finaldata.idRol===6){
          this.route.navigate(['dashboard/estudiante']);// estudiante
        }else if(_finaldata.idRol===7){
          this.route.navigate(['dashboard/admin']);// asistente administrativo
        }


     /*
      }
      else if(user.codigo===0){
        this.mensaje(user.mensaje);
     */
        this.mensaje(user.mensaje);
      }
      else{
        this.mensaje(user.mensaje);
      }
    })


  }



  mensaje(mensaje:string) {
    this._snackBar.open(mensaje, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }





}
