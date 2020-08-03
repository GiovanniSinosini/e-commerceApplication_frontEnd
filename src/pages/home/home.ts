import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredentialsDTO } from '../../models/credentialsDTO';

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

  constructor(public navCtrl: NavController, public menu: MenuController) {
  }

  public ionViewWillEnter(){
    this.menu.swipeEnable(false)
  }

  public ionViewDidLeave(){
    this.menu.swipeEnable(true)
  }

  public login(){
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriesPage')
  }

}
