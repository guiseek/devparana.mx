import { Component, Input, OnInit } from '@angular/core'
import { BehaviorSubject, Subscription } from 'rxjs'

@Component({
  selector: 'devpr-timeline-editor',
  templateUrl: './timeline-editor.component.html',
  styleUrls: ['./timeline-editor.component.scss'],
})
export class TimelineEditorComponent implements OnInit {
  @Input()
  private _timeline = new BehaviorSubject<Blob[] | null>(null)
  public timeline$ = this._timeline.asObservable()

  constructor() {}

  ngOnInit(): void {}

  createFrames(frames: BehaviorSubject<Blob>) {
    let sub$: Subscription

    return new ReadableStream<Blob>({
      start(controller) {
        sub$ = frames.subscribe(
          (frame) => controller.enqueue(frame),
          (error) => controller.error(error),
          () => controller.close()
        )
      },
      cancel() {
        sub$.unsubscribe()
      }
    })
  }
}
