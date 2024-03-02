import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingService } from './core/services/loading.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthModule } from './layouts/auth/auth.module';
import { DashboardRoutingModule } from './layouts/dashboard/dashboard-routing.module';
import { AuthRoutingModule } from './layouts/auth/auth-routing.module';
import { UsuariosRoutingModule } from './layouts/dashboard/pages/usuarios/usuarios-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './core/store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent,
   
    
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    MatDialogModule,
    AuthModule,
    MatProgressSpinnerModule,
    AuthRoutingModule,
    DashboardRoutingModule,
    UsuariosRoutingModule,
    MatIconModule,
    SharedModule, 
    HttpClientModule, 
    StoreModule.forRoot(appReducers, {}), 
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }), EffectsModule.forRoot([])
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
