import {Pipe, PipeTransform} from "@angular/core";
import {getCandidates} from "../shared/interfaces";
import {FormGroup} from "@angular/forms";

@Pipe({
    name: 'dateRangeSearch'
})
export class DateRangeSearchPipe implements PipeTransform {
    public transform(candidates: getCandidates[], dateRange: FormGroup) {
        if (!candidates) return
        if (!dateRange) return candidates
        let start: any = dateRange.value.daterange.start
        let end: any = dateRange.value.daterange.end
        if (!start || !end) return candidates
        start = Date.parse(start)
        end = Date.parse(end)
        return candidates.filter(c => {
            let addedAt: number = Date.parse(c.added_at)
            return (addedAt >= start) && (addedAt <= end)
        })
    }
}