import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CalculatorButton } from "./CalculatorButton";

@NgModule({
    declarations: [CalculatorButton],
    imports: [IonicModule, CommonModule],
    bootstrap: [CalculatorButton],
    exports: [CalculatorButton]
})
export class CalculatorButtonModule {}