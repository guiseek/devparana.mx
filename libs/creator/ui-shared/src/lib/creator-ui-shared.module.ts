import { NavigationComponent } from './navigation/navigation.component'
import { InputFileDirective } from './directives/input-file.directive'
import { DropFileDirective } from './directives/drop-file.directive'
import { WormholeComponent } from './wormhole/wormhole.component'
import { DownloadComponent } from './download/download.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
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
  ],
  declarations: [
    HeaderComponent,
    NavigationComponent,
    InputFileDirective,
    DropFileDirective,
    WormholeComponent,
    DownloadComponent,
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    InputFileDirective,
    DropFileDirective,
    WormholeComponent,
    DownloadComponent,
  ],
})
export class CreatorUiSharedModule {}

export { HeaderComponent } from './header/header.component'
export { DownloadComponent } from './download/download.component'
export { NavigationComponent } from './navigation/navigation.component'
export { Navigation } from './navigation/navigation'
