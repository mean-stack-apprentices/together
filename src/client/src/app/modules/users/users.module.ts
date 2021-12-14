import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInputComponent } from 'src/app/components/user-input/user-input.component';
import { UsersListComponent } from 'src/app/components/users-list/users-list.component';
import { PageLoginComponent } from 'src/app/pages/page-login/page-login.component';
import { PageUsersComponent } from 'src/app/pages/page-users/page-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UxuiModule } from '../uxui/uxui.module';



@NgModule({
  declarations: [
    UsersListComponent,
    UserInputComponent,
    PageUsersComponent,
    PageLoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UxuiModule
  ],
  exports: [
    UsersListComponent,
    UserInputComponent,
    PageUsersComponent,
    PageLoginComponent,
  ]
})
export class UsersModule { }
