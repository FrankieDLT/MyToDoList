import { Component } from '@angular/core';
import { ListDataService } from './backend/service/list-data.service'
import {FormGroup, FormBuilder,Validators} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form!: FormGroup;
  form2!: FormGroup;
  title = 'MyTuduList';

  realList = [] as any;

  count = 1;

  toDoList = [
    {
      title: "Make new notes",
      description: "Fill your Tudu list with new notes!"
    }
  ]
  isVisible!: boolean;
  isVisible2!: boolean;

  constructor(private listData: ListDataService,private formB:FormBuilder) { }

  closeModal() {
    this.isVisible = false;
    this.isVisible2 = false;
  }

  showAddModal() {
    this.isVisible = true;
  }

  showEditModal(item: any) {
    this.form2.patchValue({"newtitle":item.title,"newdescription":item.description})
    this.isVisible2 = true;
  }
  
  submiAdd(){
    if(this.form.valid) {
      //console.log(this.form.value)
      this.addNote(this.form.value);
      this.closeModal();
    } else {
      alert("Do not leave blank spaces");
    }
    
  }

  submiEdit(){
    if(this.form2.valid) {
      console.log(this.form2.value)
      this.closeModal();
    } else {
      alert("Do not leave blank spaces on edit");
    }
    
  }

  addNote(item:any) {
   this.listData.postList(item);
  }

  editNote(item: any){
      console.log("This item will be modifyed" + JSON.stringify(item));
  }

  removeNote(item: any){
    console.log("This item will be removed" + JSON.stringify(item.title));
    this.listData.deleteFromList(item.title);
  }

  ngOnInit(): void {

    this.form = this.formB.group({
      title: ['',Validators.required],
      description: ['',Validators.required]
    });

    this.form2 = this.formB.group({
      newtitle: ['',Validators.required],
      newdescription: ['',Validators.required]
    });

    this.realList = this.listData.getList().then(
      data => this.realList = data
      ).catch(err => alert("ERROR"))

    if (this.realList === undefined || !(this.realList.length > 0)) {
      this.toDoList.forEach(val => this.realList.push(val));
    }


    console.log(this.realList)
  }

  

}
