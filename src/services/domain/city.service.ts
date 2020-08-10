import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CityDTO } from "../../models/city.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CityService {

    constructor(public http: HttpClient){
    }

    findAll(state_id : string) : Observable<CityDTO[]> {
        return this.http.get<CityDTO[]>(`${API_CONFIG.baseUrl}/states/${state_id}/cities`);
    }

}