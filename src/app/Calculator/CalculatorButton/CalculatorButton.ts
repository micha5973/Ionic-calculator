import { Component, Input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  templateUrl: 'CalculatorButton.html',
  styleUrls: ['CalculatorButton.scss'],
})
export class CalculatorButton {
    @Input() clickFunction!: () => void;
    @Input() caption: string = "?";
    @Input() theme: string = "";
    @Input() disabled: boolean = false;
}