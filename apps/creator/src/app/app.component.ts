import { Navigation } from '@devparana/creator/ui-shared'
import { Component } from '@angular/core'

@Component({
  selector: 'devparana-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Creator'

  constructor(readonly navigation: Navigation) { }
}
