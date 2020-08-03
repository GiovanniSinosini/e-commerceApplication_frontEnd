import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredentialsDTO } from '../../models/credentialsDTO';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredentialsDTO = {
    email : "",
    password : ""
  };

  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {
  }

  public ionViewWillEnter(){
    this.menu.swipeEnable(false)
  }

  public ionViewDidLeave(){
    this.menu.swipeEnable(true)
  }

  public login(){
    this.auth.authenticate(this.creds).subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriesPage');
    },
    error => {});
  }
}
