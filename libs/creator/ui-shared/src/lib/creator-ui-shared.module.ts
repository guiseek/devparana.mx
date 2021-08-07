import { NavigationComponent } from './navigation/navigation.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { HeaderComponent } from './header/header.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { LayoutModule } from '@angular/cdk/layout'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

@NgModule({
  imports: [
    CommonModule,
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
