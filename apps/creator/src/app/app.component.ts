import { Component } from '@angular/core'
import { Navigation } from '@devparana/creator/ui-shared'

@Component({
  selector: 'devparana-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Navigation]
})
export class AppComponent {
  title = 'DevParaná Creator'

  constructor(readonly navigation: Navigation) {
    console.log(navigation.links$);

  }
}

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./app.worker', import.meta.url))
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`)
  }
  worker.postMessage('hello')
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}