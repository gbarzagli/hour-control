import { Component, OnInit, HostListener, Output, EventEmitter, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() @HostBinding('class') class;
    
    @Input() @HostBinding('class.disabled') disabled;

    @Output() onClick = new EventEmitter();

    @HostListener('click', ['$event'])
    handleClick(event) {
        if (this.disabled) {
            return;
        }
        this.onClick.emit(event);
    }
}
