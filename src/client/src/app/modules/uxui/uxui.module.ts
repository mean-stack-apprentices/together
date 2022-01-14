import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { SharedModule } from '../shared/shared.module';
import { HighlightDirective } from './directives/highlight.directive';
import { UserFullNamePipe } from './pipes/user-full-name.pipe';
import { SumPipe } from './pipes/sum.pipe';



@NgModule({
  declarations: [
    InputComponent,
    HighlightDirective,
    UserFullNamePipe,
    SumPipe,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [InputComponent]
})
export class UxuiModule { }
