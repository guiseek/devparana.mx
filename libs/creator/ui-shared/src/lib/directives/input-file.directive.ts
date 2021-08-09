import {
  Output,
  Directive,
  HostBinding,
  EventEmitter,
  HostListener,
} from '@angular/core'

@Directive({
  selector: 'input[file]',
})
export class InputFileDirective {
  @Output() fileChange = new EventEmitter<File>()

  @HostBinding('type') type = 'file'

  @HostListener('change', ['$event.target'])
  onChange(target: HTMLInputElement) {
    if (target.files?.length) {
      const file = target.files.item(0)
      if (file) this.fileChange.emit(file)
    }
  }
}
