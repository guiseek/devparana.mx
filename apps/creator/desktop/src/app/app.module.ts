import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { NgModule } from '@angular/core'

import { CreatorUiSharedModule } from '@devparana/creator/ui-shared'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    CreatorUiSharedModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@devparana/creator/feature-recorder').then(
              (module) => module.CreatorFeatureRecorderModule
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
