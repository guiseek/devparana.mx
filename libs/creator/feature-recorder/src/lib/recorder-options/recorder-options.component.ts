import { Component } from '@angular/core'

@Component({
  selector: 'devpr-recorder-options',
  templateUrl: './recorder-options.component.html',
  styleUrls: ['./recorder-options.component.scss'],
})
export class RecorderOptionsComponent {
  options = [
    {
      path: '/recorder/screen',
      title: 'Sua área de trabalho',
      subtitle: 'Download disponível em WebM, MP4 ou GIF',
      description:
        'Use gravações de tela para partes técnicas da sua apresentação e evite erros ao vivo',
      image: '/assets/images/display-media-api.svg',
    },
    {
      path: '/recorder/webcam',
      title: 'Você e sua câmera',
      subtitle: 'Download disponível assim que concluir',
      description:
        'Grave conteúdo explicativo, compartilhe conhecimento na comunidade',
      image: '/assets/images/user-media-api.svg',
    },
  ]
}
