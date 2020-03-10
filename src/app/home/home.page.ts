import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Contact} from '../providers/contact';
import { HttpClient } from '@angular/common/http';




class Post {
  constructor(public userId: number, public id: string, public nom: string, public prenom: string) {}
}

    
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //users : any = Contact.contact_array;
  public users : [];
  
  public baseurl = 'http://localhost:3000/contact/';



  constructor(private route: Router,private http: HttpClient) {}
  ngOnInit() {
    this.LoadData();
    }

    ionViewDidEnter(){
      this.LoadData();
    }

  /*
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Accept':'application/json'
    })
  }
*/

  LoadData(){

   const promise = new Promise((resolve, reject) => {
    const apiURL = this.baseurl;
    this.http.get<Post[]>(apiURL).toPromise().then(
        (res: any) => {
            // Success
            this.users = res.map((res: any) => {
                return new Post(res.userId, res.id, res.nom, res.prenom);
            });
            resolve();
        },
        (err) => {
            // Error
            reject(err);
        }
    );
});
return promise;

  
}

    
  


 

  
  goToPage(){
    console.log("button clicked")
    this.route.navigate(['/add-contact']);
  }




  removeItem(index){

  this.users.splice(index, 1);

  const promise = new Promise((resolve, reject) => {
    const apiURL = this.baseurl;
    this.http.delete<Post[]>(apiURL+"/"+index).subscribe(res => {     
      resolve(res);
      console.log(res)
  }, err => {               
      resolve(err);
  });
});
return promise;


}


async updateItem(index){
  
  this.route.navigate(['/update-contact'],{ state: { position: index} });
  
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