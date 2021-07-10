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
        let activeTechnologies : string[] = technologies.filter(t => t.check).map(t => t.name)
        return candidates.filter(c => c.candidatetechnology_set.some(t => activeTechnologies.includes(t.technology_name)))
    }
}
