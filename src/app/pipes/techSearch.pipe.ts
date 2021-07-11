import {Pipe, PipeTransform} from "@angular/core";
import {getCandidates, getTechnologies} from "../shared/interfaces";

@Pipe({
    name: 'techSearch',
    pure: false
})
export class TechSearchPipe implements PipeTransform {



    public transform(candidatetechnologSet: any[], disabledTechnologies: string[]) {

        if (!disabledTechnologies) return candidatetechnologSet;

        let newCandidatetechnologySet = JSON.parse(JSON.stringify(candidatetechnologSet))
        // @ts-ignore

        // @ts-ignore
        newCandidatetechnologySet = newCandidatetechnologySet.filter(t => !disabledTechnologies.includes(t.technology_name))
        return newCandidatetechnologySet
    }
}
