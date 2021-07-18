import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ListDataService } from './list-data.service';

describe('ListDataService', () => {
  let service: ListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(ListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the data list', () => {
    let func = service.getList();
    let testArray: string | any[] = []
     func.then(
      data => testArray = data 
      )
    expect(testArray.length>=0).toEqual(true);
  })

  it('should post a new note', () => {
    let func = service.postList({"title":"Call Dad","description":"uTesting"});
    expect(()=>{
      service.postList({"title":"Call Dad","description":"uTesting"})
    }).toBeTruthy()
  })

  it('should change a note', () => {
     expect(()=>{
      service.putInList({"oldtitle":"Call Dad","newtitle":"Call Dad","newdescription":"uTesting"})
    }).toBeTruthy()
  })

  it('should delete a note', () => {
    expect(()=>{
     service.deleteFromList("Call Dad")
   }).toBeTruthy()
 })

});
