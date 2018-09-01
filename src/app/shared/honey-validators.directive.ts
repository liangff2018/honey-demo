import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, Validator, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { OrganizationService } from '../services/sys/organization.service';
import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

export function orgNameRepeat(orgService: OrganizationService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (control == null || control.parent == null || !control.value || !control.parent.get("parent").value) {
      return null;
    }
    
    return orgService.checkNameRepeat(control.parent.get("parent").value, control.value).pipe(
      map((flag: boolean) => {
        console.log("flag----"+flag);
        return flag ? {name: "名字不允许重复."} : null;
      }),
      debounceTime(10)
    );
  };
}

@Directive({
  selector: '[appHoneyValidators]'
})
export class HoneyValidatorsDirective implements Validator {

  constructor(private orgService: OrganizationService) { }

  validate(control: AbstractControl): ValidationErrors {
    return {name: this.orgService.checkNameRepeat(control.parent.get("parent").value, control.value)};
  }
  
}
