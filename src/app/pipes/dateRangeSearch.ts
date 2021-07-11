import {Pipe, PipeTransform} from "@angular/core";
import {getCandidates} from "../shared/interfaces";

@Pipe({
    name: 'dateRangeSearch'
})
export class DateRangeSearchPipe implements PipeTransform {
    public transform(candidates: getCandidates[], dateRange: any) {
        if (!dateRange) return candidates;
        return candidates
    }
}