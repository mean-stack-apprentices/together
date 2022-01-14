import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFullName'
})
export class UserFullNamePipe implements PipeTransform {

  transform(value: {firstName: string, lastName: string}, ...args: unknown[]): unknown {
    return value.firstName + ' ' + value.lastName;
  }

}
