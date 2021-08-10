import { Component, Input } from '@angular/core';

@Component({
  selector: 'devpr-play-pause',
  template: `
    <input type="checkbox" value="None" id="playpause" name="check" />
    <label for="playpause" tabindex="1"></label>
  `,
  styleUrls: ['./play-pause.component.scss']
})
export class PlayPauseComponent {
  @Input() state: boolean = false
}
