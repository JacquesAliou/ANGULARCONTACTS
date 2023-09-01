import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  /*Fetching real data */
  public loading:boolean = false;
  public contacts: IContact[] = [];
  public errorMessage:string | null = null;
  
  /*Injecting ContactService */
  constructor(private contactService: ContactService) {}

  /*When the page loads: What to do */
  ngOnInit(): void {
    this.loading = true; //starting the spinner
    this.contactService.getAllContacts().subscribe((data) => {
      this.contacts = data;
      this.loading = false; //stop the spinner
    }, (error) => { 
      this.errorMessage = error;
      this.loading = false;
    });
  }

}
