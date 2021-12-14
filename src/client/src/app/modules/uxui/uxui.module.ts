import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [InputComponent]
})
export class UxuiModule { }
