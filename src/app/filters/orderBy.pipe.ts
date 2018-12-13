import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'orderBy'
})

@Injectable()
export class OrderFilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }

        return items.filter(function (el) {
            return el[field] == value;
        });
    }
}