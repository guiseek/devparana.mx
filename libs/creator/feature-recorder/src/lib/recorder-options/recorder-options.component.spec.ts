import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutModule } from '@angular/cdk/layout'
import { RouterTestingModule } from '@angular/router/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'

import { RecorderOptionsComponent } from './recorder-options.component'

describe('RecorderOptionsComponent', () => {
  let component: RecorderOptionsComponent
  let fixture: ComponentFixture<RecorderOptionsComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RecorderOptionsComponent],
        imports: [
          NoopAnimationsModule,
          RouterTestingModule,
          LayoutModule,
          MatButtonModule,
          MatCardModule,
          MatGridListModule,
          MatIconModule,
          MatMenuModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(RecorderOptionsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should compile', () => {
    expect(component).toBeTruthy()
  })
})
