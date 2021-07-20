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
  isVisible!: boolean;
  isVisible2!: boolean;
  isDone= false;


  constructor(private listData: ListDataService,private formB:FormBuilder) { }
  
  /**
   * Show the modal for adding new notes
   */
  showAddModal() {
    this.isVisible = true;
  }

  /**
   * Show the modal for edditing notes and passes the information of the especific
   * note to the input boxes while saving the original id.
   * @param item object containing the information of the note to be eddited
   */
  showEditModal(item: any) {
    this.form2.patchValue({"newtitle":item.title,"oldtitle":item.title,"newdescription":item.description})
    this.isVisible2 = true;
  }

  /**
   * Closes all the modals, making them invisible
   */
  closeModal() {
    this.isVisible = false;
    this.isVisible2 = false;
  }

  taskDone(item: any){
    this.isDone = item.isDone;
      item.isDone = !item.isDone;
  }
  
  /**
   * Sends the values of the new note to be saved
   */
  submiAdd(){
    if(this.form.valid) {
      this.addNote(this.form.value);
      this.closeModal();
    } else {
      alert("Do not leave blank spaces when taking notes");
    }
    
  }

  /**
   * Sends the new values and the id of the object to be altered,
   * they are sent together as an array
   */
  submiEdit(){
    if(this.form2.valid) {
      var edit_array = [{"id":this.form2.value.oldtitle},{title: this.form2.value.newtitle,
      description: this.form2.value.newdescription}]
      this.listData.putInList(edit_array);
      this.closeModal();
    } else {
      alert("Do not leave blank spaces on edit");
    }
    
  }

  /**
   * The post method its used to send the information of the new note
   * @param item object containing the data of the new note
   */
  addNote(item:any) {
   this.listData.postList(item);
  }

  /**
   * The delete method its called to remove the entry with the id provided
   * @param item id of the entry to be deleted
   */
  removeNote(item: any){
    this.listData.deleteFromList(item.title);
  }

  /**
   * "A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive"
   */
  async ngOnInit(): Promise<void> {

    this.form = this.formB.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      isDone: [false]
    });

    this.form2 = this.formB.group({
      newtitle: ['',Validators.required],
      oldtitle: ['',Validators.required],
      newdescription: ['',Validators.required]
    });

    /**
     * The GET method its called to retrieve the list of notes
     */
    this.realList = await this.listData.getList().then(
      data => this.realList = data
      ).catch(err => alert("Error, could not get list"))


  }

  

}
