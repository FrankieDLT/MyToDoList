import { Component, EventEmitter, Output } from '@angular/core';
import { ListDataService } from './backend/service/list-data.service'
import {FormGroup, FormBuilder,Validators} from '@angular/forms'
import { Item } from 'src/classes/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  constructor() { }

  ngOnInit(): void {
  }

}
