import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryService } from '../../services/domain/category.service';
import { CategoryDTO } from '../../models/category.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items: CategoryDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoryService: CategoryService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    this.categoryService.findAll()
      .subscribe(response => {this.items = response; // callback fuction
    },
      error => {}
    );
  }

  showProducts(category_id : string){
    this.navCtrl.push('ProductsPage', {category_id : category_id});
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
