import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Contestant} from './contestant.model';

@Injectable()
export class ContestantService {
    apiUrl="localhost/contestant/Contestant/";
    
    constructor(private http: Http) {}

    addContestant(obj: Contestant): Observable<Contestant> {
        let formData: FormData = new FormData();
        formData.append('firstname', obj.firstname);
        formData.append('lastname', obj.lastname);
        formData.append('dob',obj.dob);
        formData.append('is_active', obj.is_active);
        formData.append('district', obj.district_id);
        formData.append('gender', obj.gender);
        formData.append('address', obj.address);
        formData.append('photo', obj.photo);
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http
            .post('http://localhost/contestant/index.php/apis/contestant/contestant/', formData, options)
            .map((response: Response) => <Contestant>response.json().Contestants)
    }


    getContestants(): Observable<any> {
        let headers = new Headers();
        return this.http
            .get('http://localhost/contestant/index.php/apis/contestant', { headers })
            .map((response: Response) => <any>response.json().Contestant)
    }

    updateContestant(obj: Contestant):Observable<Contestant>{
        let formData: FormData = new FormData();
        formData.append('id',obj.contestant_id);
        formData.append('firstname', obj.firstname);
        formData.append('lastname', obj.lastname);
        formData.append('dob',obj.dob);
        formData.append('is_active', obj.is_active);
        formData.append('district', obj.district_id);
        formData.append('gender', obj.gender);
        formData.append('photo_url', obj.photo_url);
        formData.append('address', obj.address);
        formData.append('photo', obj.photo);
        let headers = new Headers();
        headers.append('Accept', 'application/json');

        let options = new RequestOptions({ headers: headers });
        return this.http
            .post('http://localhost/contestant/index.php/apis/contestant/contestant/'+obj.contestant_id, formData, options)
            .map((response: Response) => <Contestant>response.json().Contestant);
    }

    // updateVideo(obj: Contestant): Observable<Contestant> {
    //     let formData: FormData = new FormData();
      
    //     formData.append('id', obj.id);
    //     formData.append('firstname', obj.firstname);
    //     formData.append('lastname', obj.lastname);
    //     formData.append('dob',obj.dob);
    //     formData.append('is_active', obj.is_active);
    //     formData.append('district_id', obj.district_id);
    //     formData.append('gender', obj.gender)
    //     formData.append('photo_url', obj.photo_url)
    //     formData.append('address', obj.address)
    //     let headers = new Headers();
    //     headers.append('Accept', 'application/json');

    //     let options = new RequestOptions({ headers: headers });
    //     return this.http
    //         .post('localhost/contestant/Contestant/contestant/'+obj.id, formData, options)
    //         .map((response: Response) => <Contestant>response.json().Contestant);
    // }


    
}
