import { Component, Injector, Input, OnInit, SimpleChanges } from '@angular/core';
import {FormGroup, FormBuilder,Validators} from '@angular/forms'
import { Item } from 'src/classes/item';
import { ListDataService } from '../backend/service/list-data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() display: boolean = false;
  @Input() isPost: boolean = false;
  @Input() auxItem!: Item;

  title = ""
  form!: FormGroup;
  isVisible: boolean = this.display;

  /**
   * This function checks if there has been a change in order to
   * make the adjustements in the form
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    this.isVisible = true; 
    
    if(!this.isPost) {
      this.title = "Edit note";
      this.form.patchValue({"title":this.auxItem.title,"oldtitle":this.auxItem.title,"description":this.auxItem.description})
    } else {
      this.form.patchValue({"oldtitle":"N/A"})
      this.title = "New note";
    }
    
  }
 
  

  constructor(private listData: ListDataService,private formB:FormBuilder) { }

  /**
   * Show the modal for adding new notes
   */
  showAddModal() {
    this.isVisible = false;
  }

  /**
   * Show the modal for edditing notes and passes the information of the especific
   * note to the input boxes while saving the original id.
   * @param item object containing the information of the note to be eddited
   */
  showEditModal(item: Item) {
    this.form.patchValue({"title":item.title,"oldtitle":item.title,"description":item.description,"isDone":item.isDone})
    this.isVisible = true;
  }

  /**
   * Closes all the modals, making them invisible
   */
  closeModal() {
    this.isVisible = false;
    this.display = false;
  }

  /**
   * This method checks whether the submition is a post or a put
   */
  submit(){
    if(this.isPost) {
      this.submiAdd();
    } else {
      this.submiEdit();
    }

  }

  /**
   * Sends the values of the new note to be saved
   */
  submiAdd(){
    if(this.form.valid) {
       this.addNote(this.form.value);
      this.closeModal();
    } else {
      alert("Do not leave blank spaces");
    }
    
  }

  /**
   * Sends the new values and the id of the object to be altered,
   * they are sent together as an array
  */
  submiEdit(){
    if(this.form.valid) {

      var edit_array = [{"id":this.form.value.oldtitle.trim()},{title: this.form.value.title.trim(),
      description: this.form.value.description}]
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
  addNote(item:Item) {
    //this.listData.postList(item);
    const injectorAdd = 
    Injector.create({providers: [
      {provide: 'addItem', useValue: this.listData.postList(item)}
    ]});
    injectorAdd.get('addItem')
   }

  /**
   * "A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive"
   */
  ngOnInit(): void {
    this.isVisible = false;
    this.form = this.formB.group({
      title: ['',Validators.required],
      oldtitle: ['',Validators.required],
      description: ['',Validators.required],
      isDone: [false]
    });

  }

}
