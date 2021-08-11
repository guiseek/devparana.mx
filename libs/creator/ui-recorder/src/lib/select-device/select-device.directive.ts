import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[devprSelectDevice]'
})
export class SelectDeviceDirective {

  constructor(private ngControl: NgControl) {
    console.log(this.ngControl);

  }

}
