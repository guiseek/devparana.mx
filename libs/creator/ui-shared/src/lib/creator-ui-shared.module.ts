import { NavigationComponent } from './navigation/navigation.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { HeaderComponent } from './header/header.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { LayoutModule } from '@angular/cdk/layout'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  declarations: [HeaderComponent, NavigationComponent],
  exports: [HeaderComponent, NavigationComponent],
})
export class CreatorUiSharedModule {}

export { HeaderComponent } from './header/header.component'
export { NavigationComponent } from './navigation/navigation.component'
export { Navigation } from './navigation/navigation'
