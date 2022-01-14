import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(value: number[], ...args: unknown[]): unknown {
    return value.reduce((acc: number, cur: number) => acc + cur, 0).toFixed(2);
  }

}
