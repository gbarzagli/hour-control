import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'app-form-field',
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => FormFieldComponent),
          multi: true
        }
    ],
})
export class FormFieldComponent implements ControlValueAccessor {
    @Input() label: string;
    @Input() type: string;
    @Input() pattern: string;
    @Input() value: any;
    @Input() required: boolean;
    @Input() email: boolean;
    @Input() disabled: boolean;

    @Output() valueChange = new EventEmitter();
    @Output() onChange: (...args) => {};
    onTouched: () => {};

    @ViewChild('input') input: ElementRef;

    @HostListener('keyup')
    onKeyPress() {
        this.valueChange.emit(this.value);
        this.onChange(this.value);
        this.onTouched();
    }

    hasValue(): boolean {
        return !isNullOrUndefined(this.value) && this.value !== '';
    }

    focusField() {
        this.input.nativeElement.focus();
    }

    writeValue(obj: any): void {
        if (obj) {
            this.value = obj;
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}