import { Component, Input } from '@angular/core'

@Component({
  selector: 'devpr-rec',
  templateUrl: './rec.component.html',
  styleUrls: ['./rec.component.scss'],
})
export class RecComponent {
  @Input() active = false
}
