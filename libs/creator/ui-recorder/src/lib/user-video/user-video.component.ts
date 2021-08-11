import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'devpr-user-video',
  templateUrl: './user-video.component.html',
  styleUrls: ['./user-video.component.scss']
})
export class UserVideoComponent implements OnInit {
  @Input() stream!: MediaStream

  private _recorded: Blob[] = []

  @Output() dataavailable = new EventEmitter<Blob[]>()

  constructor() { }

  ngOnInit(): void {
  }

}
