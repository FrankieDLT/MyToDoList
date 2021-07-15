import { Component } from '@angular/core';
import { ListDataService } from './backend/service/list-data.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyTuduList';

  realList = [] as any;

  count = 1;

  toDoList = [
    {
      title: "Make new notes",
      description: "Fill your Tudu list with new notes!"
    }
  ]

  constructor(private listData: ListDataService) { }

  addNote() {
    this.realList.push({
      title: "Add test: " + this.count++,
      description: "Testing"
    })
    alert("Added");
  }


  ngOnInit(): void {


    this.realList = this.listData.getList().then(
      data => this.realList = data
      ).catch(err => alert("ERROR"))

    if (this.realList === undefined || !(this.realList.length > 0)) {
      this.toDoList.forEach(val => this.realList.push(val));
    }


    console.log(this.realList)
  }

}
