import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClientDTO } from '../../models/client.dto';
import { ClientService } from '../../services/domain/client.service';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  client : ClientDTO;
  picture : string;
  cameraOn : boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService,
    public camera: Camera,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email){
      this.clientService.findByEmail(localUser.email)
      .subscribe(response => {
        this.client = response as ClientDTO;
        this.getImageIfExists();
      },
      error => {
        if (error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      }); 
    }
    else{
      this.navCtrl.setRoot('HomePage');
    }
  }

    getImageIfExists() {
      this.clientService.getImageFromBucket(this.client.id)
      .subscribe(response => {
        this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}cp${this.client.id}.jpg`;
      },
      error => {});
    }

    getCameraPicture(){

      this.cameraOn = true;

      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
       this.picture = 'data:image/png;base64,' + imageData;
       this.cameraOn = false;
      }, (err) => {
        this.cameraOn = false;
      });
    }

    getGalleryPicture(){

      this.cameraOn = true;

      const options: CameraOptions = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
      }, (err) => {
        this.cameraOn = false;
      });
    }

    sendPicture(){
      let loader = this.presentLoading();
      this.clientService.uploadPicture(this.picture)
        .subscribe(response => {
          this.picture = null;
          this.loadData();
          loader.dismiss();
        },
        error =>{   
        loader.dismiss();
        });
    }

    cancelPicture(){
      this.picture = null;
    }

    doRefresh(refresher) {
      this.loadData();
      setTimeout(() => {
        refresher.complete();
      }, 1000);
    }

    presentLoading() {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      return loader;
    }

}

