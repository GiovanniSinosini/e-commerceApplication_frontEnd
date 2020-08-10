import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { StateService } from '../../services/domain/state.service';
import { CityService } from '../../services/domain/city.service';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers: [
    CityService,
    StateService
  ]
})
export class SignupPageModule {}
