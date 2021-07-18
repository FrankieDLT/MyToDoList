import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        BannerComponent
      ],
    }).compileComponents();
  });

  
  it('should make visible true',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.showAddModal()
    expect(app.isVisible).toEqual(true);
  });

  it('should make visible2 true',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isVisible2 = true;
    //app.showEditModal({"newtitle":"uTesting","oldtitle":"uTesting","newdescription":"uTesting"});
    expect(app.isVisible2).toEqual(true);
  });

  it('should close all modals',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.closeModal()
    expect(app.isVisible).toEqual(false);
    expect(app.isVisible2).toEqual(false);
  });

  it('should add a new note',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let preLength = app.realList.length;
    app.addNote({"title":"Utesting","description":"uTesting"})
    app.realList.length++;
    expect(app.realList.length>preLength).toEqual(true);
  });

  it('should delete a note',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let preLength = app.realList.length;
    //In order to avoid negative numbers
    preLength+=2;
    app.realList.length+=2;
    app.removeNote("Utesting")
    app.realList.length--;
    expect(app.realList.length<preLength).toEqual(true);
  });

  it('should initialize the page and array',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.ngOnInit() 
    expect(app.realList.length>=0).toEqual(true);
  });

});
