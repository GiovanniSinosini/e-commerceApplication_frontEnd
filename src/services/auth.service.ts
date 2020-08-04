import { Injectable } from "@angular/core";
import { CredentialsDTO } from "../models/credentials.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";


@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();   // extract data from the token


    constructor(public http: HttpClient, public storage: StorageService){ 
    }

    authenticate(creds : CredentialsDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',   // get the header of the response
                responseType: 'text'   // to avoid Json parse error, as the return is empty
            });

    }

    successfulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token : tok,
            email : this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}
