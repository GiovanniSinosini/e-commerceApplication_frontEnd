import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CityService } from '../../services/domain/city.service';
import { StateService } from '../../services/domain/state.service';
import { StateDTO } from '../../models/state.dto';
import { CityDTO } from '../../models/city.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  states: StateDTO[];
  cities: CityDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cityService: CityService,
    public stateService: StateService) {
    
      this.formGroup = this.formBuilder.group({
        name: ['TestName', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['test@gmail.com', [Validators.required, Validators.email]],
        type : ['1', [Validators.required]],
        nif : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        password : ['123', [Validators.required]],
        address : ['Test Street', [Validators.required]],
        number : ['25', [Validators.required]],
        complement : ['Apart 3', []],
        district : ['PortoTest', []],
        cod : ['0425027', [Validators.required]],
        phone1 : ['123456789', [Validators.required]],
        phone2 : ['', []],
        phone3 : ['', []],
        stateId : [null, [Validators.required]],
        cityId : [null, [Validators.required]]   
      })           
  }

  ionViewDidLoad(){
    this.stateService.findAll()
      .subscribe(response => {
        this.states = response;
        this.formGroup.controls.stateId.setValue(this.states[0].id);
        this.updateCities();
      },
      error => {});
  }

  updateCities(){
    let state_id = this.formGroup.value.stateId;
    this.cityService.findAll(state_id)  // back-end search 
      .subscribe(response => {
        this.cities = response;
        this.formGroup.controls.cityId.setValue(null);
      },
      error => {});
  }

  signupUser(){
    console.log('Submitted the form');
  }
}
