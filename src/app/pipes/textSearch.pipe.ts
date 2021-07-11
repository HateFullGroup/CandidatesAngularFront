import {Pipe, PipeTransform} from "@angular/core";
import {getCandidates} from "../shared/interfaces";

@Pipe({
    name: 'textSearch'
})
export class TextSearchPipe implements PipeTransform {
    public transform(value: any[], key: string, term: string) {

        if (!term || !term.trim()) {
            return value
        }
        return value.filter(item => {
            return item[key].toLowerCase().includes(term.toLowerCase())
        })
    }
}