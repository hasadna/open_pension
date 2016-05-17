import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'op-managing-body',
  templateUrl: 'app/components/managing-body/managing-body.component.html',
  styleUrls: ['app/components/managing-body/managing-body.component.css'],
  providers: [],
  directives: [],
  pipes: []
})

export class ManagingBodyComponent {
  @Input() mangingBodyData: Object;
  @Output() notify : EventEmitter<string> = new EventEmitter();
  
  constructor() {}
  
  onClick(){
    this.notify.emit(${this.mangingBodyData.title});
  }
}
