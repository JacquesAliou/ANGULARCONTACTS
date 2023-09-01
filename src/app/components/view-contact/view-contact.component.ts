import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact; // {} = Empty Object
  public errorMessage: string | null = null;
  public group: IGroup = {} as IGroup;

  /*To Get any parameter data(like the contactId) ->inject ActivatedRoute*/
  constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService) {}

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((param) => {
        this.contactId = param.get('contactId');
      });
      /*If contactId is available */
      if (this.contactId) {
        this.loading = true;
        this.contactService.getSingleContact(this.contactId).subscribe((data) =>{
          this.contact = data;
          this.contactService.getSingleGroup(data).subscribe((data) =>{
            this.group = data;
          });
          this.loading = false;
        }, (error) => {
          this.errorMessage = error;
          this.loading = false;
        });
      }
  }

  /*Checking if contact or group data object is not empty/not null*/
  public isNotEmpty(){
    return Object.keys(this.contact).length > 0 &&
    Object.keys(this.group).length > 0;
  }
}
