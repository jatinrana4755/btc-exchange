import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'sort'
})
@Injectable()
export class SortPipe  implements PipeTransform {
  transform(array: any[], field: string, order: boolean): any[] {
      if(array !== undefined && field !== undefined) {
        // if(order){
        //     array.sort((a: any, b: any) => {
        //     if (a[field] < b[field]) {
        //         return -1;
        //     } else if (a[field] > b[field]) {
        //         return 1;
        //     } else {
        //         return 0;
        //     }
        //     });
        // } else {
            array.sort((a: any, b: any) => {
            if (a[field] < b[field]) {
                return 1;
            } else if (a[field] > b[field]) {
                return -1;
            } else {
                return 0;
            }
            });
        // }
  }
    return array;
  }
}
