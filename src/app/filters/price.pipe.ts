import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'price'
})

@Injectable()
export class PriceFilterPipe implements PipeTransform {
    transform(items: any[], field: string, min: number, max: number): any[] {
        if (!items) {
            return [];
        }
        if (!min && !max) {
            return items;
        } else if (min && !max) {
            return items.filter(function (el) {
                // el[field]= parseInt(el[field]);
                return el[field] >= min
            });
        } else if (!min && max) {
            return items.filter(function (el) {
                // el[field]= parseInt(el[field]);
                return el[field] <= max;
            });
        } else {
            return items.filter(function (el) {
                // el[field]= parseInt(el[field]);
                return el[field] >= min && el[field] <= max;
            });
        }


    }
}