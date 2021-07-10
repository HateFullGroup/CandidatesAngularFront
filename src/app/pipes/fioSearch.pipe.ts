import {Pipe, PipeTransform} from "@angular/core";
import {getCandidates} from "../shared/interfaces";

@Pipe({
    name: 'fioSearch'
})
export class fioSearchPipe implements PipeTransform {
    public transform(candidates: getCandidates[], query: string) {
        if (!query) return candidates;
        const regex = new RegExp(query, 'gi');
        return (candidates || []).filter(c => {
            return regex.test(c['f_i_o']);
        });
    }
}