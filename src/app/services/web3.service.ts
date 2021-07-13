import {Injectable, EventEmitter, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ApiService } from './api.service';
import { DialogService } from './dialog.service';
import { environment } from '../../environments/environment';
// import * as web3 from 'web3';
import { WEB3 } from '../web3';
import Web3 from 'web3';
const AUTH_URL = environment.auth_url;

@Injectable({
    providedIn: 'root'
})
export class Web3Service {

  address: any = '';
  JWT: any = null;
  decodedJWT: any = {};
  expiresAt: any = null;
  isExpired: any = null;

  constructor(
      @Inject(WEB3) private web3: Web3,
      private jwtHelper: JwtHelperService,
      private api: ApiService,
      private dialogService: DialogService
    ) {}


  async init() {
    let jwt: any = await localStorage.getItem("session_token");
    if(jwt) {
      this.saveInfo(jwt);
    }
  }

  signin() {
    this.checkForWallet();
    // const publicAddress = this.getAddress();
    // console.log("web3: ", publicAddress)
  }

  async logout() {
    this.JWT = null;
    this.decodedJWT = {};
    await localStorage.setItem("session_token", null);
  }
  
  async checkForWallet() {
    // let res = await this.api.get(`/metadata`);
    // console.log("res: ", res);

    // if ('enable' in this.web3.eth) {
    //   await this.web3.eth.enable();
    // }
    // await window.ethereum.enable();
    // this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/6bf7dc7935364c718b0ce1c682d5cbb0'))

    if((window as any).ethereum) {
      try {
        await (window as any).ethereum.enable()
        // console.log("accounts2: ", this.web3.eth.accounts)
        let accounts = await this.web3.eth.getAccounts();
        let account = accounts[0];
        // console.log("account: ", account);
        if(account) {
          this.address = account;
          this.authenticate(account);
        }
      } catch (err) {
        this.dialogService.toast(err.message);
      }

    } else {
      console.log("You need to install metamask!")
      this.dialogService.error("You need to install MetaMask", "No Wallet");
    }
  }

  async authenticate(address) {
    console.log("creating new account for address: ", address);
    try {
      let res: any = await this.fetchNonce(address);
      const nonce = res.nonce;
      const prefix = res.prefix;
      console.log("nonce: ", nonce);
      const signature = await this.signMessage(address, nonce, prefix);
      let jwt: any = await this.verifySignature(address, signature);
      this.saveInfo(jwt);
    } catch (err) {
      this.dialogService.toast(err.message);
    }
  }

  async saveInfo(jwt) {
    try {
      if(!this.jwtHelper.isTokenExpired(jwt)) {
        this.JWT = jwt;
        this.decodedJWT = this.jwtHelper.decodeToken(this.JWT);
        this.decodedJWT.expiresAt = this.jwtHelper.getTokenExpirationDate(this.JWT);
        this.decodedJWT.isExpired = this.jwtHelper.isTokenExpired(this.JWT);
        // this.JWTstuff();
        await localStorage.setItem("session_token", jwt);
      }
    } catch (e) {
      // do nothing
    }

  }

  // JWTstuff() {
  //   let decoded = this.jwtHelper.decodeToken(this.JWT);
  //   console.log("decoded: ", decoded);
  //   let isExp = this.jwtHelper.isTokenExpired(this.JWT);
  //   console.log("isExp: ", isExp);
  //   let exp = this.jwtHelper.getTokenExpirationDate(this.JWT);
  //   console.log("exp: ", exp);
  // }

  signMessage(address, nonce, prefix) {
    const msg = `${prefix}${nonce}`
    return new Promise((resolve, reject) =>
      this.web3.eth.personal.sign(
        msg,
        address,
        '', //MetaMask will ignore the password argument here
        (err, signature) => {
          if (err) {
            this.dialogService.toast(err.message);
            return reject(err);
          } else {
            return resolve(signature);
          }
        }
      )
    );
  };

  async fetchNonce(address) {
    try {
      let res: any = await this.api.post("/auth/nonce", { address }, '/v1', AUTH_URL);
      return res;
    } catch (err) {
      this.dialogService.toast(err.message);
    }
  }

  async verifySignature(address, signature) {
    try {
      let res = await this.api.post("/auth/verify", { address, signature }, '/v1', AUTH_URL);
      return res;
    } catch (err) {
      this.dialogService.error(err.message);
    }
  }

}
