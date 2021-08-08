import { ShellNavigationComponent } from './shell-navigation/shell-navigation.component'
import { CreatorUiSharedModule } from '@devparana/creator/ui-shared'
// import { MatButtonModule } from '@angular/material/button'
// import { MatCardModule } from '@angular/material/card'
// import { MatMenuModule } from '@angular/material/menu'
// import { MatIconModule } from '@angular/material/icon'
// import { LayoutModule } from '@angular/cdk/layout'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

@NgModule({
  imports: [
    CommonModule,
    // LayoutModule,
    // MatCardModule,
    // MatMenuModule,
    // MatIconModule,
    // MatButtonModule,
    CreatorUiSharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShellNavigationComponent,
        children: [
          {
            path: '',
            redirectTo: 'recorder',
            pathMatch: 'full'
          },
          {
            path: 'recorder',
            loadChildren: () =>
              import('@devparana/creator/feature-recorder').then(
                (m) => m.CreatorFeatureRecorderModule
              ),
          },
        ]
      }
    ]),
  ],
  declarations: [ShellNavigationComponent],
})
export class CreatorFeatureShellModule {}
