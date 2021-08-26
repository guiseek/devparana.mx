import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { CreatorUiSharedModule } from '@devparana/creator/ui-shared';
import { CreatorUiRecorderModule } from '@devparana/creator/ui-recorder';
import { TimelineEditorComponent } from './timeline-editor/timeline-editor.component';
import { CanvasEditorComponent } from './canvas-editor/canvas-editor.component';
import { EditorShellComponent } from './editor-shell/editor-shell.component'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    CreatorUiRecorderModule,
    CreatorUiSharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditorShellComponent,
        children: [
          {
            path: '',
            component: CanvasEditorComponent,
            outlet: 'canvas'
          },
          {
            path: '',
            component: TimelineEditorComponent,
            outlet: 'timeline'
          },
        ]
      }
    ]),
  ],
  declarations: [
    TimelineEditorComponent,
    CanvasEditorComponent,
    EditorShellComponent
  ],
})
export class CreatorFeatureEditorModule { }
