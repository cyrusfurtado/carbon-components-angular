import {
	Directive,
	Input,
	TemplateRef,
	ElementRef,
	Injector,
	ComponentFactoryResolver,
	ViewContainerRef
} from "@angular/core";
import { DialogDirective } from "./../dialog.directive";
import { Tooltip } from "./tooltip.component";
import { DialogService } from "./../dialog.service";

let tooltipCounter = 0;

@Directive({
	selector: "[nTooltip]",
	exportAs: "nTooltip",
	providers: [
		DialogService
	]
})
export class TooltipDirective extends DialogDirective {
	@Input() nTooltip: string | TemplateRef<any>;
	/** warning and danger apply the relevant classes */
	@Input() type: "warning" | "error" | "" = "";
	tooltipID: string;

	constructor(
		protected _elementRef: ElementRef,
		protected _viewContainerRef: ViewContainerRef,
		protected _dialogService: DialogService
	) {
		super(_elementRef, _viewContainerRef, _dialogService);
		_dialogService.create(Tooltip);
	}

	onDialogInit() {
		tooltipCounter++;
		this.dialogConfig.compID = "tooltip-" + tooltipCounter;
		this.dialogConfig.content = this.nTooltip;
		this.dialogConfig.type = this.type;
		this._elementRef.nativeElement.setAttribute("aria-describedby", this.dialogConfig.compID);
	}
}