import { RecorderOptionsComponent } from './recorder-options/recorder-options.component'
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
    RouterModule.forChild([
      {
        path: '',
        component: RecorderOptionsComponent
      }
    ]),
  ],
  declarations: [
    RecorderOptionsComponent
  ]
})
export class CreatorFeatureRecorderModule {}
