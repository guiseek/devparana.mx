import { Directive, EventEmitter, HostListener, Output } from '@angular/core'

@Directive({
  selector: '[drop-file]',
})
export class DropFileDirective {
  @Output() dropped = new EventEmitter<File>()
  @Output() hovered = new EventEmitter<boolean>()

  @HostListener('drop', ['$event'])
  onDrop(evt: DragEvent) {
    evt.preventDefault()
    const file = this.getFile(evt.dataTransfer)

    if (file) this.dropped.emit(file)
    this.hovered.emit(false)
  }

  getFile(data: DataTransfer | null) {
    return data?.files && data?.files.item(0)
  }

  @HostListener('dragover', ['$event'])
  onDragOver(evt: DragEvent) {
    console.log(evt);
    evt.preventDefault()
    this.hovered.emit(true)
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(evt: DragEvent) {
    evt.preventDefault()
    this.hovered.emit(false)
  }
}
