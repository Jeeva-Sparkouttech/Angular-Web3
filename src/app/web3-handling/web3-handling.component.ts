import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../Service/web3-service.service';

@Component({
  selector: 'app-web3-handling',
  templateUrl: './web3-handling.component.html',
  styleUrls: ['./web3-handling.component.css']
})
export class Web3HandlingComponent implements OnInit {

  public account : any
  public balance : any

  direction: string[] | undefined;
  constructor(private web3: Web3Service) { }

  ngOnInit(): void {
  }

  Connect() {
    this.web3.connectAccount().then(response => {
      console.log(response);
      this.direction = response;
    }).catch((error: any) => {
      console.error(error);
    });
  }

  async Info() {
   this.account =  await this.web3.accountsList()
   await console.log(this.account)
    this.balance = await this.web3.accountInfo(this.account[0])
  }

  Disconnect(){
    this.web3.disconnectWallet()
  }
}
