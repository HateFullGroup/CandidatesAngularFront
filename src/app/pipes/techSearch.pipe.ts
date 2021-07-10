import {Pipe, PipeTransform} from "@angular/core";
import {getCandidates, getTechnologies} from "../shared/interfaces";

@Pipe({
    name: 'techSearch',
    pure: false
})
export class TechSearchPipe implements PipeTransform {
    public transform(candidates: getCandidates[], technologies: getTechnologies[]) {

        if (!candidates) return
        if (!technologies) return candidates;
        let disabledTechnologies : string[] = technologies.filter(t => !t.check).map(t => t.name)
        let newCandidates = candidates.map(c => {
            c.candidatetechnology_set = c.candidatetechnology_set.filter(t => !disabledTechnologies.includes(t.technology_name))
            return c
        })
        return newCandidates.filter(c => c.candidatetechnology_set.length)
    }
}
