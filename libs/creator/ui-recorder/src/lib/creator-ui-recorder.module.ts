import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { RecordedSizeComponent } from './recorded-size/recorded-size.component'
import { ReadableSizePipe } from './pipes/readable-size.pipe'
import { UserVideoComponent } from './user-video/user-video.component'
import { SelectDeviceComponent } from './select-device/select-device.component'
import { SelectDeviceDirective } from './select-device/select-device.directive'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  declarations: [
    RecordedSizeComponent,
    ReadableSizePipe,
    UserVideoComponent,
    SelectDeviceComponent,
    SelectDeviceDirective,
  ],
  exports: [
    RecordedSizeComponent,
    ReadableSizePipe,
    UserVideoComponent,
    SelectDeviceComponent,
    SelectDeviceDirective,
  ],
})
export class CreatorUiRecorderModule {}

export { RecordedSizeComponent } from './recorded-size/recorded-size.component'
export { ReadableSizePipe } from './pipes/readable-size.pipe'
export { UserVideoComponent } from './user-video/user-video.component'
export { SelectDeviceComponent } from './select-device/select-device.component'
export { SelectDeviceDirective } from './select-device/select-device.directive'
