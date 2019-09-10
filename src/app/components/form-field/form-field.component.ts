import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'app-form-field',
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {

    @Input() label: string;
    @Input() type: string;
    @Input() pattern: string;
    @Input() value: string;
    @Input() required: boolean;
    @Input() email: boolean;

    @Output() valueChange = new EventEmitter();
    @Output() onChange = new EventEmitter();

    @ViewChild('input') input: ElementRef;

    @HostListener('keyup')
    onKeyPress() {
        this.valueChange.emit(this.value);
        this.onChange.emit(this.value);
    }

    @HostListener('blur')
    onBlur() {
        
    }

    hasValue(): boolean {
        return !isNullOrUndefined(this.value) && this.value !== '';
    }

    focusField() {
        this.input.nativeElement.focus();
    }
}