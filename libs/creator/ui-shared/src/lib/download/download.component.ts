import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  constructor(
    readonly ref: MatDialogRef<DownloadComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: Blob[] = []
  ) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.ref.close()
  }
}
