import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Platform } from '@ionic/angular';
const version = require("../../../package.json").version;
const BACKEND_URL = environment.auth_url;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private platform: Platform
  ) {}

  logResponse(res) {
    if(false) {
      console.log("HTTP RESPONSE: ", res);
    }
  }

  attachStatusToBody(res) {
    res.body.status = res.status;
    res.body.statusText = res.statusText;
    res.body.ok = res.ok;
    res.body.type = res.type;
    this.logResponse(res.body);
    return res.body;
  }

  getVersion() {
    return version;
  }

  addParams(params) {
    // req_src comes first
    params.req_src = "demo";
    params.req_version = this.getVersion();
    return params;
  }

  async get(endpoint: string, params: any = {}, api = '', url = BACKEND_URL) {
    const URL = url + api + endpoint;
    params = this.addParams(params);

    return await new Promise((resolve, reject) => {
      this.http
        .get(URL, {params, observe: 'response'})
        .subscribe((res)=>{
          resolve(this.attachStatusToBody(res));
        }, error => {
          reject(error)
        });
    })
  }

  async post(endpoint: string, body = null, params: any = {}, api = '', url = BACKEND_URL) {
    const URL = url + api + endpoint;
    params = this.addParams(params);

    return await new Promise((resolve, reject) => {
      this.http
        .post(URL, body, {params, observe: 'response'})
        .subscribe(res =>{
          resolve(this.attachStatusToBody(res));
        }, error => {
          reject(error);
        });
    })
  }

  async put(endpoint: string, body = null, params: any = {}, api = '', url = BACKEND_URL) {
    const URL = url + api + endpoint;
    params = this.addParams(params);

    return await new Promise((resolve, reject) => {
      this.http
        .put(URL, body, {params, observe: 'response'})
        .subscribe(res =>{
          resolve(this.attachStatusToBody(res));
        }, error => {
          reject(error);
        });
    })
  }

  async delete(endpoint: string, params: any = {}, api = '', url = BACKEND_URL) {
    const URL = url + api + endpoint;
    params = this.addParams(params);

    return await new Promise((resolve, reject) => {
      this.http
        .delete(URL, {params, observe: 'response'})
        .subscribe((res)=>{
          resolve(this.attachStatusToBody(res));
        }, error => {
          reject(error)
        });
    })
  }

}
