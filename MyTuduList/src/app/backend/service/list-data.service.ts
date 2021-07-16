import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

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
  }

  postList(item: any):Promise<any>{
    return this.http.post('http://localhost:3000/api/postList',item).toPromise().catch((err) =>{
      alert("Error: "+JSON.stringify(err.status)+" = "+JSON.stringify(err.statusText)+"\nNote already exist!");
    })
  }

  putInList(item:any){
    return this.http.put(`http://localhost:3000/api/changeList/${item[0].id}`,item[1]).toPromise().catch((err) =>{
      alert("Error: "+JSON.stringify(err.status)+" = "+JSON.stringify(err.statusText)+"\nNote not found!");
    });
  }

  deleteFromList(item:any):Promise<any>{
   return this.http.delete(
      `http://localhost:3000/api/deleteFromList/${item}`).toPromise() 

  }

}
