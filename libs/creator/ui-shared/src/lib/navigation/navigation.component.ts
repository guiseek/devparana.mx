import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav'
import { Component, ViewChild } from '@angular/core'
import { map, shareReplay } from 'rxjs/operators'
import { Navigation } from './navigation'
import { Observable } from 'rxjs'

@Component({
  exportAs: 'navigation',
  selector: 'devpr-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @ViewChild(MatSidenav)
  drawer!: MatSidenav

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    )

  constructor(
    private breakpointObserver: BreakpointObserver,
    readonly navigation: Navigation
  ) {}
}
