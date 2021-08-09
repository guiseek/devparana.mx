import { Component, Input } from '@angular/core'

@Component({
  selector: 'devpr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title = ''
}
