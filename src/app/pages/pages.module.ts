import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, ComponentsModule, ReactiveFormsModule],
    exports: [CallbackComponent, HomeComponent, LoginComponent],
    declarations: [CallbackComponent, HomeComponent, LoginComponent],
})
export class PagesModule { }
