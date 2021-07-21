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
  @Output() showMod = new EventEmitter<boolean>();

  form!: FormGroup;
  form2!: FormGroup;
  title = 'MyTuduList';
  realList: Array<Item> = [];
 // isVisible!: boolean;
  isVisible2!: boolean;
  isDone= false;
  display = false;
  isPost = false;
  auxItem!: Item;

  constructor(private listData: ListDataService,private formB:FormBuilder) { }
  
  
  /**
   * Show the modal for adding new notes
   */
  showAddModal() {
   this.display = !this.display;
   this.isPost = true;
  }

  /**
   * Show the modal for edditing notes and passes the information of the especific
   * note to the input boxes while saving the original id.
   * @param item object containing the information of the note to be eddited
   */
  showEditModal(item: Item) {
    this.auxItem = {"title":item.title,"oldtitle":item.title,"description":item.description};
    this.isPost = false;
    this.isVisible2 = true;
  }

  
  /**
   * Saves the status of a specific note
   * @param item note whos status is updated
   */
  taskDone(item: Item){
    item.isDone = !item.isDone;
    this.listData.putInList([{"id":item.title},{title: item.title,
      description: item.description,isDone:item.isDone}]);
  }
  

  /**
   * The delete method its called to remove the entry with the id provided
   * @param item id of the entry to be deleted
   */
  removeNote(item: Item){
    this.listData.deleteFromList(item.title);
  }

  /**
   * "A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive"
   */
  async ngOnInit(): Promise<void> {
    
    /**
     * The GET method its called to retrieve the list of notes
     */
    this.realList = await this.listData.getList().then(
      data => this.realList = data
      ).catch(err => alert("Error, could not get list"))


  }

  

}
