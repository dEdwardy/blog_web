import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    　　　　return value&&value>1000?value/1000+'kg':value+'g';
    　　}

}
