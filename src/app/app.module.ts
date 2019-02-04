import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CalendarComponent } from './calendar/calendar.component';
import { FormPanelComponent } from './form-panel/form-panel.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [AppComponent, CalendarComponent, FormPanelComponent, LoginComponent, HomeComponent],
    imports: [
        BrowserModule, AppRoutingModule,
        FormsModule, SharedModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule, AngularFireAuthModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
