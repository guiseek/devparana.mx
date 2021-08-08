import { Component } from '@angular/core';
import { Navigation } from '@devparana/creator/ui-shared';

@Component({
  selector: 'devpr-shell-navigation',
  templateUrl: './shell-navigation.component.html'
})
export class ShellNavigationComponent {

  constructor(
    readonly navigation: Navigation
  ) {
    this.navigation.addLink({ path: '/recorder', label: 'Opções de gravação' })
    this.navigation.addLink({ path: '/recorder/webcam', label: 'Usar minha webcam' })
    this.navigation.addLink({ path: '/recorder/screen', label: 'Gravação de tela' })
  }
}
