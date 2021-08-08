import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { NgModule } from '@angular/core'

import { CreatorUiSharedModule } from '@devparana/creator/ui-shared'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    BrowserAnimationsModule,
    CreatorUiSharedModule,
    RouterModule.forRoot(
      [
        // {
        //   path: '',
        //   loadChildren: () =>
        //     import('@devparana/creator/feature-recorder').then(
        //       (module) => module.CreatorFeatureRecorderModule
        //     ),
        // },
        {
          path: '',
          loadChildren: () =>
            import('@devparana/creator/feature-shell').then(
              (module) => module.CreatorFeatureShellModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
