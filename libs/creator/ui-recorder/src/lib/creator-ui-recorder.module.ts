import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatSliderModule } from '@angular/material/slider'
import { RecordedSizeComponent } from './recorded-size/recorded-size.component'
import { ReadableSizePipe } from './pipes/readable-size.pipe'
import { UserVideoComponent } from './user-video/user-video.component'
import { SelectDeviceComponent } from './select-device/select-device.component'
import { SelectDeviceDirective } from './select-device/select-device.directive'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RangeControlComponent } from './range-control/range-control.component'

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    RecordedSizeComponent,
    ReadableSizePipe,
    UserVideoComponent,
    SelectDeviceComponent,
    SelectDeviceDirective,
    RangeControlComponent,
  ],
  exports: [
    RecordedSizeComponent,
    ReadableSizePipe,
    UserVideoComponent,
    SelectDeviceComponent,
    SelectDeviceDirective,
    RangeControlComponent,
  ],
})
export class CreatorUiRecorderModule {}

export { RecordedSizeComponent } from './recorded-size/recorded-size.component'
export { ReadableSizePipe } from './pipes/readable-size.pipe'
export { UserVideoComponent } from './user-video/user-video.component'
export { SelectDeviceComponent } from './select-device/select-device.component'
export { SelectDeviceDirective } from './select-device/select-device.directive'
export { RangeControlComponent } from './range-control/range-control.component'
