import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse} from '@angular/common/http';
import { IContact } from '../models/IContact';
import { Observable, catchError, throwError } from 'rxjs';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl = `http://localhost:9000`; //json-server url

  //inject de HttpClient
  constructor(private httpClient: HttpClient){ }


  //Get all contacts
  public getAllContacts():Observable<IContact[]> {
    let dataUrl:string = `${this.serverUrl}/contacts`;

    return this.httpClient.get<IContact[]>(dataUrl).pipe(catchError(this.handleError));
  }

  //Get single contact
  public getSingleContact(contactId:string):Observable<IContact>{
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;

    return this.httpClient.get<IContact>(dataUrl).pipe(catchError(this.handleError));
  }

  /*Create contact*/
  public createContact(contact:IContact):Observable<IContact>{
    let dataUrl:string = `${this.serverUrl}/contacts`;

    return this.httpClient.post<IContact>(dataUrl, contact).pipe(catchError(this.handleError)); 
  }

  /*Update contact*/
  public updateContact(contact:IContact, contactId:string):Observable<IContact>{
    let dataUrl:string = `${this.serverUrl}/contactId`;

    return this.httpClient.put<IContact>(dataUrl, contact).pipe(catchError(this.handleError)); 
  }

  /*Delete contact*/
  public deleteContact(contactId:string):Observable<{}>{
    let dataUrl:string = `${this.serverUrl}/contactId`;

    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError)); 
  }


  /*Get All the Groups*/
  public getAllGroups():Observable<IGroup[]> {
    let dataUrl:string = `${this.serverUrl}/groups`;

    return this.httpClient.get<IGroup[]>(dataUrl).pipe(catchError(this.handleError));
  }

  /*Get a Single Group*/
  public getSingleGroup(contact: IContact):Observable<IGroup>{
    let dataUrl: string = `${this.serverUrl}/groups/${contact.groupId}`;

    return this.httpClient.get<IGroup>(dataUrl).pipe(catchError(this.handleError));
  }



  /*Error Handling*/
  public handleError(error: HttpErrorResponse) {
    let errorMessage:string = '';
    
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage =  `Status: ${error.error.status} \n Message: ${error.error}`;
    }
    // Return an observable with a user-facing error message.
    return throwError(errorMessage);
  }
}
