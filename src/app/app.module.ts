import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    PagesModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
