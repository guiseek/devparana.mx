import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NavigationComponent } from './navigation/navigation.component'
import { InputFileDirective } from './directives/input-file.directive'
import { DropFileDirective } from './directives/drop-file.directive'
import { WormholeComponent } from './wormhole/wormhole.component'
import { DownloadComponent } from './download/download.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDialogModule } from '@angular/material/dialog'
import { HeaderComponent } from './header/header.component'
import { MatButtonModule } from '@angular/material/button'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { LayoutModule } from '@angular/cdk/layout'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { RecComponent } from './rec/rec.component';
import { DisplayMediaComponent } from './display-media/display-media.component'
import { UserMediaComponent } from './user-media/user-media.component';
import { CountdownComponent } from './countdown/countdown.component';
import { ControlsComponent } from './controls/controls.component';
import { TimelineComponent } from './timeline/timeline.component';
import { CanvasDirective } from './directives/canvas.directive';
import { InputFileLoaderDirective } from './directives/input-file-loader.directive';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    RouterModule,
    LayoutModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    HeaderComponent,
    NavigationComponent,
    InputFileDirective,
    DropFileDirective,
    WormholeComponent,
    DownloadComponent,
    RecComponent,
    CanvasDirective,
    TimelineComponent,
    ControlsComponent,
    CountdownComponent,
    UserMediaComponent,
    DisplayMediaComponent,
    InputFileLoaderDirective,
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    InputFileDirective,
    DropFileDirective,
    WormholeComponent,
    DownloadComponent,
    RecComponent,
    CanvasDirective,
    TimelineComponent,
    ControlsComponent,
    CountdownComponent,
    UserMediaComponent,
    DisplayMediaComponent,
    InputFileLoaderDirective,
  ],
})
export class CreatorUiSharedModule {}

export { ControlsComponent } from './controls/controls.component'
export { CountdownComponent } from './countdown/countdown.component'
export { DropFileDirective } from './directives/drop-file.directive'
export { InputFileDirective } from './directives/input-file.directive'
export { InputFileLoaderDirective } from './directives/input-file-loader.directive';
export { NavigationComponent } from './navigation/navigation.component'
export { DisplayMediaComponent } from './display-media/display-media.component'
export { UserMediaComponent } from './user-media/user-media.component';
export { TimelineComponent } from './timeline/timeline.component'
export { WormholeComponent } from './wormhole/wormhole.component'
export { DownloadComponent } from './download/download.component'
export { CanvasDirective } from './directives/canvas.directive'
export { HeaderComponent } from './header/header.component'
export { RecComponent } from './rec/rec.component'
export { RecorderBase } from './base/recorder-base'
export { Navigation } from './navigation/navigation'
