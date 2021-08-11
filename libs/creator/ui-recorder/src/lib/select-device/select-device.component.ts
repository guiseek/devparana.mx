import {
  Output,
  Component,
  ViewChild,
  EventEmitter,
  AfterViewInit,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'
import { SelectDeviceDirective } from './select-device.directive'

@Component({
  selector: 'devpr-select-device',
  templateUrl: './select-device.component.html',
  styleUrls: ['./select-device.component.scss'],
})
export class SelectDeviceComponent implements AfterViewInit {
  @ViewChild(SelectDeviceDirective)
  selectDeviceControl!: SelectDeviceDirective

  @Output() readonly valueChange = new EventEmitter<
    Record<MediaDeviceKind, string>
  >()

  deviceForm = new FormGroup({
    audioinput: new FormControl(''),
    videoinput: new FormControl(''),
  })

  private _audioInputList = new BehaviorSubject<MediaDeviceInfo[]>([])
  public audioInputList$ = this._audioInputList.asObservable()

  private _videoInputList = new BehaviorSubject<MediaDeviceInfo[]>([])
  public videoInputList$ = this._videoInputList.asObservable()

  constructor() {}

  ngAfterViewInit(): void {
    console.log(this.selectDeviceControl)
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        switch (device.kind) {
          case 'videoinput': {
            const items = this._videoInputList.value
            this._videoInputList.next([...items, device])
            break
          }
          case 'audioinput': {
            const items = this._audioInputList.value
            this._audioInputList.next([...items, device])
            break
          }
        }
      })

      const getDevicesByKind = (
        devices: MediaDeviceInfo[],
        kind: MediaDeviceKind
      ) => {
        return devices.filter((device) => device.kind === kind)
      }

      const audioInputList = getDevicesByKind(devices, 'audioinput')
      this._audioInputList.next(audioInputList)

      const videoInputList = getDevicesByKind(devices, 'videoinput')
      this._videoInputList.next(videoInputList)
    })
  }
}
