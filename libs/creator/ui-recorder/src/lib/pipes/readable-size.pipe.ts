import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'readableSize',
})
export class ReadableSizePipe implements PipeTransform {
  private _units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  transform(value: number): string {
    // value = typeof value === 'number' ? value : parseInt(value, 10)

    let l = 0
    let n = value || 0

    while (n >= 1024 && ++l) n = n / 1024

    const total = n.toFixed(n < 10 && l > 0 ? 1 : 0)
    const unit = this._units[l]

    return `${total} ${unit}`
  }
}
