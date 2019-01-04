import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strLength'
})
export class StrLengthPipe implements PipeTransform {

  transform(value: any, number: Number=20): any {
    return (value&&value.length>number)?value.substring(-1,number)+'......':value;
  }
}
