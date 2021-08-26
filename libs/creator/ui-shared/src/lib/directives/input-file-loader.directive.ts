import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: 'input[file-loader]'
})
export class InputFileLoaderDirective {
  @Output() blobLoaded = new EventEmitter<ArrayBuffer>()

  @HostBinding('type') type = 'file'

  @HostListener('change', ['$event.target'])
  async onChange(target: HTMLInputElement) {
    if (target.files?.length) {
      const file = target.files.item(0)
      if (file) {
        try {
          const buffer = await file.arrayBuffer()
          this.blobLoaded.emit(buffer)
        } catch (err) {

        }
      }
    }
  }
}
