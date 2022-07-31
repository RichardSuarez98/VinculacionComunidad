import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
//import { InicioComponent } from './components/inicio/inicio.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule,//jsPDF
    HttpClientModule,
    //
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
