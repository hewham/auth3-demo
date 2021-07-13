import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment'
const BACKEND_URL = environment.auth_url;

@Injectable({
    providedIn: 'root'
})
export class ApiService {

  constructor(
    public httpService: HttpService,
  ) {}

  async get(endpoint, params = {}, api = '/v1', url = BACKEND_URL) {
    return await new Promise(async (resolve, reject) => {
      try {
        let res: any = await this.httpService.get(endpoint, params, api, url);
        if (res.status === 200 || res.status === 201 || res.status === 204) {
          resolve(res.data);
        }
      } catch (err) {
        reject(err.error);
      }
    });
  }

  async post(endpoint, body, api = '/v1', url = BACKEND_URL) {
    return await new Promise(async (resolve, reject) => {
      try {
        let res: any = await this.httpService.post(endpoint, body, {}, api, url);
        if (res.status === 200 || res.status === 201 || res.status === 204) {
          resolve(res.data);
        }
      } catch (err) {
        reject(err.error);
      }
    });
  }

  async put(endpoint, body, api = '/v1', url = BACKEND_URL) {
    return await new Promise(async (resolve, reject) => {
      try {
        let res: any = await this.httpService.put(endpoint, body, {}, api, url);
        if (res.status === 200 || res.status === 201 || res.status === 204) {
          resolve(res.data);
        }
      } catch (err) {
        reject(err.error);
      }
    });
  }

  async delete(endpoint, api = '/v1', url = BACKEND_URL) {
    return await new Promise(async (resolve, reject) => {
      try {
        let res: any = await this.httpService.delete(endpoint, {}, api, url);
        if (res.status === 200 || res.status === 201 || res.status === 204) {
          resolve(res.data);
        }
      } catch (err) {
        reject(err.error);
      }
    });
  }

  delay(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, ms)
    })
  }
}
