import { Component, EventEmitter, Output } from '@angular/core'
import { finalize, map, take } from 'rxjs/operators'
import { interval, Subject } from 'rxjs'

@Component({
  selector: 'devpr-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent {
  @Output() record = new EventEmitter<void>()

  protected _countdown = new Subject<number>()
  public countdown$ = this._countdown.asObservable()

  start() {
    interval(1000)
      .pipe(
        take(4),
        map((v) => 3 - v),
        finalize(() => this.record.emit())
      )
      .subscribe((v) => this._countdown.next(v))
  }
}
