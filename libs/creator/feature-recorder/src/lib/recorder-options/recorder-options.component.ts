import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'devpr-recorder-options',
  templateUrl: './recorder-options.component.html',
  styleUrls: ['./recorder-options.component.scss']
})
export class RecorderOptionsComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Para gravação de tela', cols: 1, rows: 1, image: '/assets/images/display-media-api.svg' },
          { title: 'Para gravar com webcam', cols: 1, rows: 1, image: '/assets/images/user-media-api.svg' },
          { title: 'Para gravações de áudio', cols: 1, rows: 1, image: '/assets/images/web-audio-api.svg' }
        ];
      }

      return [
        { title: 'Para gravação de tela', cols: 1, rows: 1, image: '/assets/images/display-media-api.svg' },
        { title: 'Para gravar com webcam', cols: 1, rows: 2, image: '/assets/images/user-media-api.svg' },
        { title: 'Para gravações de áudio', cols: 1, rows: 1, image: '/assets/images/web-audio-api.svg' }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
