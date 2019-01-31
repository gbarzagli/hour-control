import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CalendarComponent } from './calendar/calendar.component';
import { FormPanelComponent } from './form-panel/form-panel.component';

@NgModule({
    declarations: [AppComponent, CalendarComponent, FormPanelComponent],
    imports: [
        BrowserModule, AppRoutingModule,
        FormsModule, SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
