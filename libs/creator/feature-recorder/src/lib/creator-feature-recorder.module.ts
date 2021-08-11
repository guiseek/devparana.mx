import { RecorderOptionsComponent } from './recorder-options/recorder-options.component'
import { WebcamRecorderComponent } from './webcam-recorder/webcam-recorder.component'
import { ScreenRecorderComponent } from './screen-recorder/screen-recorder.component'
import { VideoTranscoderComponent } from './video-transcoder/video-transcoder.component'
import { Timeline, Transcoder } from '@devparana/creator/util-recorder'
import { CreatorUiRecorderModule } from '@devparana/creator/ui-recorder'
import { CreatorUiSharedModule } from '@devparana/creator/ui-shared'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { LayoutModule } from '@angular/cdk/layout'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatTooltipModule,
    MatExpansionModule,
    CreatorUiSharedModule,
    CreatorUiRecorderModule,
    RouterModule.forChild([
      {
        path: '',
        component: RecorderOptionsComponent,
      },
      {
        path: 'webcam',
        component: WebcamRecorderComponent,
      },
      {
        path: 'screen',
        component: ScreenRecorderComponent,
      },
      {
        path: 'video',
        component: VideoTranscoderComponent,
      },
    ]),
  ],
  declarations: [
    RecorderOptionsComponent,
    WebcamRecorderComponent,
    ScreenRecorderComponent,
    VideoTranscoderComponent,
  ],
  providers: [Transcoder, Timeline],
})
export class CreatorFeatureRecorderModule { }

export { WebcamRecorderComponent } from './webcam-recorder/webcam-recorder.component'
export { ScreenRecorderComponent } from './screen-recorder/screen-recorder.component'
