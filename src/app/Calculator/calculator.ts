import { Component } from '@angular/core';


@Component({
    selector: 'calculator',
    templateUrl: 'Calculator.html',
    styleUrls: ['Calculator.scss']
})
export class Calculator {
    public rows = [
        [
            {caption: "CE", styleClass: "tertiary", clickFunction: () => { this.clear(); }},
            {caption: "C", styleClass: "tertiary", clickFunction: () => { this.clearAll(); }},
            {caption: "&larr;", styleClass: "tertiary", clickFunction: () => { this.deleteLast(); }},
            {caption: "÷", styleClass: "secondary", clickFunction: () => { this.setOperator("÷"); }}
        ], [
            {caption: "7", styleClass: "primary", clickFunction: () => { this.addDigit("7"); }},
            {caption: "8", styleClass: "primary", clickFunction: () => { this.addDigit("8"); }},
            {caption: "9", styleClass: "primary", clickFunction: () => { this.addDigit("9"); }},
            {caption: "x", styleClass: "secondary", clickFunction: () => { this.setOperator("x"); }}
        ],[
            {caption: "4", styleClass: "primary", clickFunction: () => { this.addDigit("4"); }},
            {caption: "5", styleClass: "primary", clickFunction: () => { this.addDigit("5"); }},
            {caption: "6", styleClass: "primary", clickFunction: () => { this.addDigit("6"); }},
            {caption: "-", styleClass: "secondary", clickFunction: () => { this.setOperator("-"); }}
        ],[
            {caption: "1", styleClass: "primary", clickFunction: () => { this.addDigit("1"); }},
            {caption: "2", styleClass: "primary", clickFunction: () => { this.addDigit("2"); }},
            {caption: "3", styleClass: "primary", clickFunction: () => { this.addDigit("3"); }},
            {caption: "+", styleClass: "secondary", clickFunction: () => { this.setOperator("+"); }}
        ],[
            {caption: "&#177;", styleClass: "primary", clickFunction: () => { this.swapSign(); }},
            {caption: "0", styleClass: "primary", clickFunction: () => { this.addDigit("0"); }},
            {caption: ",", styleClass: "primary", clickFunction: () => { this.addComma(); }},
            {caption: "=", styleClass: "secondary", clickFunction: () => { this.equalSignClicked(); }}
        ]
    ];

    num1: string = "0";
    num2: string = "0";
    previousNum2: string = "0";

    public get displayedValue() {
        return this.getCurrentNumberString();
    }
    public get getCalculation() {
        if (this.operator != "")
            return this.num1 + " " + this.operator;
        if (this.previousOperator != "")
            return this.num1 + " " + this.previousOperator + " " + this.previousNum2;
        return "&nbsp;";
    }
    public get getErrorMessage() {
        if (this.errorMessage != "")
            return this.errorMessage;
        return "&nbsp;";
    }

    operator: string = "";
    previousOperator: string = "";
    errorMessage: string = "";

    getCurrentNumberString(): string {
        if (this.operator != "")
            return this.num2;
        else
            return this.num1;
    }
    setCurrentNumberString(newString: string) {
        if (this.operator != "")
            this.num2 = newString;
        else
            this.num1 = newString;
    }

    addDigit(digit: string) {
        var currentNumber = this.getCurrentNumberString();
        if (currentNumber == "0")
            currentNumber = digit;
        else if (currentNumber == "-0")
            currentNumber = "-" + digit;
        else 
            currentNumber += digit;
        this.setCurrentNumberString(currentNumber);
    }

    setOperator(newOperator: string) {
        if (this.operator == "")
            this.num1 = this.trimComma(this.num1);
        else
            this.calculate()
        this.operator = newOperator;
        this.previousOperator = "";
        this.num2 = "0";
    }

    addComma() {
        var currentString = this.getCurrentNumberString();
        if (currentString.includes(","))
            return;
        currentString += ","
        this.setCurrentNumberString(currentString);
    }

    clearAll() {
        this.num1 = "0";
        this.num2 = "0";
        this.operator = "";
        this.previousOperator = "";
        this.errorMessage = "";
        this.previousNum2 = "0";
    }

    clear() {
        if (this.operator != "") {
            this.num2 = "0"
        } else {
            this.num1 = "0";
            this.operator = "";
        }
    }

    deleteLast() {
        var currentNumber = this.getCurrentNumberString();
        currentNumber = currentNumber.slice(0, -1);
        if (currentNumber == "" || currentNumber == "-")
            currentNumber += "0"
        this.setCurrentNumberString(currentNumber);
    }

    equalSignClicked() {
        if (this.operator == "") {
            this.operator = this.previousOperator;
            this.num2 = this.previousNum2;
        }
        this.calculate();
    }

    calculate() {
        if (this.operator == "")
            return;
        var n1 = this.parseNumber(this.num1);
        this.num2 = this.trimComma(this.num2);
        let n2 = this.parseNumber(this.num2);
        switch (this.operator) {
            case "+": n1 += n2; break;
            case "-": n1 -= n2; break;
            case "x": n1 *= n2; break;
            case "÷": 
                if (n2 == 0) {
                    this.errorMessage = "Man kann nicht durch 0 teilen!"
                    return;
                }
                n1 /= n2; 
                break;
        }
        this.previousOperator = this.operator;
        this.previousNum2 = this.num2;
        this.operator = "";
        this.num1 = n1.toString().replace(".", ",");
    }

    parseNumber(numberString: string): number {
        return parseFloat(numberString.replace(",", "."));
    }

    trimComma(numberString: string): string {
        if (numberString.endsWith(","))
            return numberString.slice(0, -1);
        return numberString;
    }
    
    swapSign() {
        var currentNumber = this.getCurrentNumberString();
        if (currentNumber.charAt(0) != "-")
            currentNumber = "-" + currentNumber;
        else
            currentNumber = currentNumber.substring(1);
        this.setCurrentNumberString(currentNumber);
    }
}