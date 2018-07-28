import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[dynamicRequired]',
  providers: [{provide: NG_VALIDATORS, useExisting: DynamicRequiredDirective, multi: true}]
})
export class DynamicRequiredDirective implements Validator {

  @Input() isRequired: boolean;
  @Input() errorMsg: string;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} {
    if (this.isRequired && !control.value) {
      return {"required": this.errorMsg ? this.errorMsg : "不能为空!"}
    }
    return null;
  }

}
