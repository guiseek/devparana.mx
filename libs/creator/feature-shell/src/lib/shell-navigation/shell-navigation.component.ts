import { Component } from '@angular/core'
import { Navigation } from '@devparana/creator/ui-shared'

@Component({
  selector: 'devpr-shell-navigation',
  templateUrl: './shell-navigation.component.html',
})
export class ShellNavigationComponent {
  constructor(readonly navigation: Navigation) {
    this.navigation.addLink({
      icon: 'video_library',
      path: '/recorder',
      label: 'Opções de gravação',
    })
    this.navigation.addLink({
      icon: 'video_camera_front',
      path: '/recorder/webcam',
      label: 'Usar minha webcam',
    })
    this.navigation.addLink({
      icon: 'screen_share',
      path: '/recorder/screen',
      label: 'Gravação de tela',
    })
    this.navigation.addLink({
      icon: 'timelapse',
      path: '/recorder/video',
      label: 'Converter vídeos',
    })
  }
}
