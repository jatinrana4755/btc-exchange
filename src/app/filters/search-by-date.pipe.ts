import { Pipe, PipeTransform } from '@angular/core';
import { UserBuy } from '../shared/userbuy';
@Pipe({
  name: 'searchByDate'
})
export class SearchByDatePipe implements PipeTransform {

  transform(values: UserBuy[], args?: any): any[] {
   // return null;
    if(!values) return [];
    if(!args) return values;
    return values.filter( it => {
      return it.created.includes(args);
    });
  }


}

