import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable, identity } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
    public identity;
    public token;
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.apiRestUrl;
    }

    // El parametro getHash se iguala a nulo para decir que es opcional
    login(user, getHash = null){
        if(getHash){
            user.gethash = getHash;
        }
        let json = JSON.stringify(user);
        let params = json;

        let headers = new Headers({'Content-Type':'application/json'});

        // Para poder ocupar el metodo map(), se debe ocupar dentro de .pipe()
        return this._http.post(this.url + 'login', params,{headers: headers}).pipe(map(res => res.json()));
    }

    getIdentity(){
        let indentity = JSON.parse(localStorage.getItem('identity'));

        if(indentity && indentity != null){
            this.identity = identity;
        } else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token && token != null){
            this.token = token;
        } else{
            this.token = null;
        }
        return this.token;
    }
}