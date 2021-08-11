import { Component, Input } from '@angular/core'

@Component({
  selector: 'devpr-recorded-size',
  template: `
    <h3 class="mat-subheading">
      {{ total | readableSize }}
    </h3>
  `
})
export class RecordedSizeComponent {
  @Input() blobs: Blob[] = []

  get total() {
    return this.blobs.reduce((prev, curr) => {
      return prev + curr.size
    }, 0)
  }
}
