import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() title:string = ""; // the data will come from the parent that's why we used @Input()
  @Input() data:any[] = [];
  @Output() selectedValue = new EventEmitter();// send data from child to parent

  constructor(){}

  ngOnInit(): void {
      
  }

  detectChanges(event:any){
     this.selectedValue.emit(event);
  }
}
