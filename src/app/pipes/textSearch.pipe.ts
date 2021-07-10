import {Pipe, PipeTransform} from "@angular/core";
import {getCandidates} from "../shared/interfaces";

@Pipe({
    name: 'textSearch'
})
export class TextSearchPipe implements PipeTransform {
    public transform(value: any[], key: string, term: string) {

        if (!term) return value;
        const regex = new RegExp(term, 'gi');
        return (value || []).filter(item => {
            // @ts-ignore
            return item.hasOwnProperty(key) && regex.test(item[key]);
        });
    }
}