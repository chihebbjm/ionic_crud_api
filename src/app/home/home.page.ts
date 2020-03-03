import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Contact} from '../providers/contact';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users : any = Contact.contact_array;
 

  constructor(private route: Router) {
   // console.log(Contact.contact_array);

  }

 
  
  goToPage(){
    console.log("button clicked")
    this.route.navigate(['/add-contact']);
  }

  removeItem(index){
    this.users.splice(index, 1);
}


async updateItem(index){
  
  this.route.navigate(['/update-contact'],{ state: { position: index } });
  
}
}

/*
this.users.push(
  { 
  nom: Frist_name,
  prenom: Last_name,
  profession: Profession_value
  });
  */