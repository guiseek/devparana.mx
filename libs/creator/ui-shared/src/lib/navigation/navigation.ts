import { BehaviorSubject } from 'rxjs'

export class Link {
  constructor(
    public path: string | string[],
    public label: string,
    public icon?: string
  ) {}
}

export class Navigation {
  private _links = new BehaviorSubject<Link[]>([])
  public links$ = this._links.asObservable()

  addLink(link: Link) {
    this._links.next([...this._links.value, link])
  }

  setLinkS(links: Link[]) {
    this._links.next(links)
  }
}
