/**
 * Created by amanecer on 16/05/2016.
 */
import {Component,Input,Output,EventEmitter} from '@angular/core';
import {ManagingBodyComponent} from './managing-body/managing-body.component';


@Component({
    selector: 'op-managing-body-list',
    templateUrl: 'app/components/managing-body-list/managing-body-list.component.html',
    styleUrls: ['app/components/managing-body-list/managing-body-list.component.css'],
    providers: [],
    directives: [ManagingBodyComponent],
    pipes: []
})
export class ManagingBodyListComponent {

    constructor() {

    }
    @Input() mangingBodyList : any;

    @Output() notify : EventEmitter<any> = new EventEmitter<any>;


    onNotify(name:string):void{
        this.notify.emit(name);
    }


}



