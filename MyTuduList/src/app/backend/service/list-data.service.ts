import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ListDataService {

  list = [
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

  constructor(private http:HttpClient) { }

  

  getList():Promise<any>{
   return this.http.get('http://localhost:3000/api/getList').toPromise();
   /*return new Promise((resolve,reject) =>{
     setTimeout(() => {
       resolve(this.list);
     }, 2000);
   })*/
 
  }
}
