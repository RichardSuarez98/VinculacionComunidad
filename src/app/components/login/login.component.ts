import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private router: Router,
    /*private service: LoginServicesService*/) {
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
 
    const usuario = this.form.value.NombreUsuario;
    const password= this.form.value.password;
    console.log(usuario);
    console.log(password);
    if(usuario==="richard" && password === "123"){
      console.log(usuario);
      console.log(password);
        this.router.navigate(['dashboard']);
    }else{
      this.error();
      this.form.reset();
    }
   /* this.service.login(this.form.value).subscribe(user => {
        (user);


      if (user.exito === 1) {
        //redireccionamos al dashboard
        this.router.navigate(['dashboard/venta']);

        (user);

       // this.fakeloading();

      }
      else {
        //mostramos el error
        this.error();
      }
    })
*/
    
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
      this.router.navigate(['dashboard']);
      //lo redireccionamos al dashboard
      // this.loading=false; 
    }, 1500);
  }


}
