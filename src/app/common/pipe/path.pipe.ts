import { Pipe, PipeTransform } from '@angular/core';
import { pathHead } from '../../config'
@Pipe({
  name: 'path'
})
export class PathPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return pathHead+value;
    return pathHead+value
  }

}
