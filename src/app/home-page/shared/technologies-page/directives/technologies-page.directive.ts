import {Directive, ElementRef} from "@angular/core";
import {TechnologiesPageComponent} from "../technologies-page.component";

@Directive({
    selector: '[tech-styles]'
})

export class TechnologiesPageDirective {

    private el!: ElementRef

    constructor(el: ElementRef, params: TechnologiesPageComponent) {
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