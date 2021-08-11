import { ShellNavigationComponent } from './shell-navigation/shell-navigation.component'
import { CreatorUiSharedModule } from '@devparana/creator/ui-shared'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

@NgModule({
  imports: [
    CommonModule,
    CreatorUiSharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShellNavigationComponent,
        children: [
          {
            path: '',
            redirectTo: 'recorder',
            pathMatch: 'full',
          },
          {
            path: 'recorder',
            loadChildren: () =>
              import('@devparana/creator/feature-recorder').then(
                (m) => m.CreatorFeatureRecorderModule
              ),
          },
          {
            path: 'editor',
            loadChildren: () =>
              import('@devparana/creator/feature-editor').then(
                (module) => module.CreatorFeatureEditorModule
              ),
          },
        ],
      },
    ]),
  ],
  declarations: [ShellNavigationComponent],
})
export class CreatorFeatureShellModule {}
