import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListDataService {

  constructor(private http: HttpClient) { }


  /**
   * Get the list of notes that are stored in the data file
   * @returns and array containing all the note entries in the file
   */
  getList(): Promise<any> {
    return this.http.get('http://localhost:3000/api/getList').toPromise();
  }

  /**
   * Saves a new entry inthe data file
   * @param item new entry to be written in the file
   * @returns a status code in case of any error
   */
  postList(item: any): Promise<any> {
    return this.http.post('http://localhost:3000/api/postList', item).toPromise().catch((err) => {
      alert("Error: " + JSON.stringify(err.status) + " = " + JSON.stringify(err.statusText) + "\nNote already exist!");
    })
  }

  /**
   * Sends new inforation to overwrite an existing entry
   * @param item array contening a id for the entry to be eddited and a set of data to be written in the file
   * @returns a status code in case of any error
   */
  putInList(item: any) {
    return this.http.put(`http://localhost:3000/api/changeList/${item[0].id}`, item[1]).toPromise().catch((err) => {
      alert("Error: " + JSON.stringify(err.status) + " = " + JSON.stringify(err.statusText) + "\nNote not found!");
    });
  }

  /**
   * Deletes and especific entry in the data file
   * @param item id of the entry to be deleted
   * @returns a status code in case of any error
   */
  deleteFromList(item: any): Promise<any> {
    return this.http.delete(
      `http://localhost:3000/api/deleteFromList/${item}`).toPromise().catch((err) => {
        alert("Error: " + JSON.stringify(err.status) + " = " + JSON.stringify(err.statusText) + "\nNote not found!");
      });

  }

}
