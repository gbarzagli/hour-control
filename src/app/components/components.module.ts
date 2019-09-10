import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { FormPanelComponent } from './form-panel/form-panel.component';
import { CalendarService } from './calendar/calendar.service';
import { FormFieldComponent } from './form-field/form-field.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [
        CalendarComponent, FormPanelComponent,
        FormFieldComponent, ButtonComponent
    ],
    declarations: [
        CalendarComponent, FormPanelComponent, 
        FormFieldComponent, ButtonComponent
    ],
    providers: [CalendarService],
})
export class ComponentsModule { }
