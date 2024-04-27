import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLabelDirective } from './directives/custom-label.directive';



@NgModule({
  declarations: [
    CustomLabelDirective
  ],
  imports: [
    CommonModule
  ],
  // Exportamos para poder usar la directiva en otros módulos
  exports: [
    CustomLabelDirective
  ]
})
export class SharedModule { }
