import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyTuduList';

  realList = [] as  any;

  count = 1;

  toDoList = [
    {
      title: "Breathe",
      description: "I mean, you need it"
    },
    {
      title: "Think",
      description: "I mean, you have to"
    },
    {
      title: "Carry on",
      description: "Nothing its permanent"
    },
  ]

  
  addNote(){
    this.realList.push({
      title: "Add test: " + this.count++,
    description: "Testing"})
    alert("Added");
  }


  ngOnInit(): void{
    if(!(this.realList.length>0)){
      this.toDoList.forEach(val => this.realList.push(val));
    }

    console.log(this.realList)
  }

}
