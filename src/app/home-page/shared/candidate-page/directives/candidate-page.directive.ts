import {Directive, ElementRef} from "@angular/core";
import {CandidateComponent} from "../candidate/candidate.component";
import {CandidatePageComponent} from "../candidate-page.component";


@Directive({
    selector: '[cand-styles]'
})

export class CandidatePageDirective {

    private el!: ElementRef

    constructor(el: ElementRef, params: CandidatePageComponent) {
        this.el = el
        let inter = setInterval(() => {
            if (params.widthLoading > 0) {
                params.widthLoading -= 2
                el.nativeElement.style.width = params.widthLoading + "%"
            } else {
                clearInterval(inter)
            }
        }, 50)

    }
}