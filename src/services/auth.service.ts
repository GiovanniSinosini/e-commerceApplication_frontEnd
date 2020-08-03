import { Injectable } from "@angular/core";
import { CredentialsDTO } from "../models/credentialsDTO";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient){ 
    }

    authenticate(creds : CredentialsDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',   // get the header of the response
                responseType: 'text'
            })
    }
}