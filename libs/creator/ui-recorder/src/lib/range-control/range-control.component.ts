import {
  Self,
  Input,
  Optional,
  Component,
  ElementRef,
  forwardRef,
  Renderer2,
} from '@angular/core'
import {
  NgControl,
  AbstractControl,
  NG_VALUE_ACCESSOR,
  DefaultValueAccessor,
} from '@angular/forms'
import { MatSlider } from '@angular/material/slider'

const RangeControlProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatSlider),
  multi: true,
}

@Component({
  selector: 'devpr-range-control',
  templateUrl: './range-control.component.html',
  styleUrls: ['./range-control.component.scss'],
  providers: [MatSlider, RangeControlProvider],
})
export class RangeControlComponent extends DefaultValueAccessor {
  @Input() formControl?: AbstractControl
  @Input() formControlName = ''

  @Input() label = ''

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    @Optional() @Self() public ngControl: NgControl
  ) {
    super(renderer, elementRef, true)
  }
}
