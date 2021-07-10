import {Pipe, PipeTransform} from "@angular/core";
import {getCandidates, getTechnologies} from "../shared/interfaces";

@Pipe({
    name: 'techSearch',
    pure: false
})
export class TechSearchPipe implements PipeTransform {



    public transform(candidates: getCandidates[], technologies: getTechnologies[]) {
        const reducer = function(a: any, b: any)
        {
            let bLvl = isNaN(b.knowledge_level) ? 0 : b.knowledge_level
            let aLvl = isNaN(a.knowledge_level) ? 0 : a.knowledge_level
            return {knowledge_level: aLvl + bLvl}// returns object with property x
        }

        if (!candidates) return
        if (!technologies) return candidates;
        let disabledTechnologies : string[] = technologies.filter(t => !t.check).map(t => t.name)
        let newCandidates = JSON.parse(JSON.stringify(candidates))
        // @ts-ignore

        // @ts-ignore
        newCandidates.map(c => {
            // @ts-ignore
            c.candidatetechnology_set = c.candidatetechnology_set.filter(t => !disabledTechnologies.includes(t.technology_name))
            return c
            // @ts-ignore
        })
        //     .sort(function(x, y) {
        //     // @ts-ignore
        //
        //
        //     let xTechsum = x.candidatetechnology_set.reduce(reducer, {knowledge_level: 0}).knowledge_level
        //     // const total = Object.values(x.candidatetechnology_set).reduce((t, {value}) => t + value, 0)
        //     // @ts-ignore
        //     let yTechsum = y.candidatetechnology_set.reduce(reducer, {knowledge_level: 0}).knowledge_level
        //     if (xTechsum < yTechsum) {
        //         return -1;
        //     }
        //     if (xTechsum > yTechsum) {
        //         return 1;
        //     }
        //     return 0;
        // })
        return newCandidates
    }
}
