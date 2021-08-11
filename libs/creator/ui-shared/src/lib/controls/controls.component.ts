import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'devpr-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  @Input() stream = new MediaStream
  @Input() recorder?: MediaRecorder

  @Output() start = new EventEmitter<void>()
  @Output() toggle = new EventEmitter<void>()
  @Output() stop = new EventEmitter<void>()
  @Output() retry = new EventEmitter<void>()

  get disableToggle() {
    const state = this.recorder?.state ?? ''
    return !state || state === 'inactive'
  }
}
