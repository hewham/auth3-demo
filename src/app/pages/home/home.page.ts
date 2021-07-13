import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public web3Service: Web3Service
  ) {}

  async ngOnInit() {
    await this.web3Service.init();
  }

  async signin() {
    await this.web3Service.signin();
  }

  async logout() {
    await this.web3Service.logout();
  }

}
