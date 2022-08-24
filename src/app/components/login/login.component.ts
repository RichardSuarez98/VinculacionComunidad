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
 /* var myModal = document.getElementById('myModal');
  var myInput = document.getElementById('myInput');*/
  hide = true;


  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: Router,
    private service: LoginService) {
    this.form = this.fb.group({
      NombreUsuario: ['', /*Validators.required*/],
      password: ['', /*Validators.required*/]
    })
    /*if(this.service.usuarioData){
      this.router.navigate(['/']);
    }*/


  }

  ngOnInit(): void {
  }
 cerrarcesion(){
  //this.service.logout();
 }


  ingresar() {
    console.log(this.form.value);
    this.service.login(this.form.value).subscribe(user => {
        (user);
        console.log(user);

      if (user.codigo == 1) {
        var _finaldata=JSON.parse(localStorage.getItem('usuario')!);
        if(_finaldata.idRol===1){
         // console.log("Tienes acceso de Director de Carrera");

        }else if(_finaldata.idRol===2){
          //console.log("Tienes acceso de Gestor de Vinculación");
          this.route.navigate(['dashboard/gestorVinculacion']);
        }else if(_finaldata.idRol===3){
          //console.log("Tienes acces de Director de Proyecto");
          this.route.navigate(['dashboard/docenteDirector']);
        }
        else if(_finaldata.idRol===4){
         // console.log("Tienes acces de Docente Tutor");
         this.route.navigate(['dashboard/docenteTutor']);
        }else if(_finaldata.idRol===5){
         // console.log("Tienes acces de Supervisor");
         this.route.navigate(['dashboard/docenteTutor']);
        }else if(_finaldata.idRol===6){
          this.route.navigate(['dashboard/estudiante']);
        }

      }
      else {
        //mostramos el error
        this.error();
      }
    })


  }



  error() {
    this._snackBar.open('Usuario o contraseña invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  fakeloading() {
    setTimeout(() => {
      this.route.navigate(['dashboard']);
      //lo redireccionamos al dashboard
      // this.loading=false;
    }, 1500);
  }


}
