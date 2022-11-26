import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Calculator } from "./Calculator";
import { CalculatorButtonModule } from "./CalculatorButton/CalculatorButton.module";


@NgModule({
    declarations: [Calculator],
    imports: [CalculatorButtonModule, IonicModule, CommonModule],
    bootstrap: [Calculator],
    exports: [Calculator]
})
export class CalculatorModule {}
