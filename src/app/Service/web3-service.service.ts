import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider"; // this profile wallet handler 
import { provider } from 'web3-core'; 
import {abi,contract_address} from "../Helper/contract-abi"

@Injectable({
  providedIn: 'root'
})

export class Web3Service {
  web3Modal: any;
  //web3:  any;
  provider: provider | any;
  contract : any 
  public info : any = {
    accounts : [],
    balance : '',
    tBalance : ''
  }

  constructor() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, 
         options: {
          infuraId: "ba1fba8f482642f2a4734ab1d9c7112f",
          qrcodeModalOptions: {
            mobileLinks: [
              'rainbow',
              'metamask',
              'argent',
              'trust',
              'imtoken',
              'pillar'
            ]
          }
        }
          },
      injected: {
        display: {
          logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
          name: 'metamask',
          description: "Connect with the provider in your Browser"
        },
        package: null
      },
    };

    this.web3Modal = new Web3Modal({
     // network: "testnet", // optional change this with the net you want to use like rinkeby etc | puedes cambiar a una red de pruebas o etc
      cacheProvider: true, // optional
      providerOptions, // required
    })
  }

  async ngOnInit(){
    
  }

  async connectAccount() {
     this.provider =await this.web3Modal.connect();
    console.log('====================================');
    console.log("provider",this.provider);
    console.log('====================================');
    return true
  }

   async accountInfo(){
    this.provider =await this.web3Modal.connect();
    const web3 = new  Web3( this.provider)
    this.contract =await new web3.eth.Contract(abi,contract_address)
    this.info.accounts =  await web3.eth.getAccounts();
    let initialvalue : any =  await web3.eth.getBalance(this.info.accounts[0]);
    this.info.balance = await web3.utils.fromWei(initialvalue , 'ether');
    this.info.tBalance = await this.contract.methods.balanceOf(this.info.accounts[0]).call()
    return this.info
  }

async disconnectWallet() {
    await this.web3Modal.clearCachedProvider();
}

async transferTokenService(address : string , amount : number){
  this.provider =await this.web3Modal.connect();
  const web3 = new  Web3( this.provider)
  console.log('====================================');
  console.log("owner : ",this.info.accounts[0]);
  console.log('====================================');
  this.contract =await new web3.eth.Contract(abi,contract_address)
  await this.contract.methods.transfer(address,amount).send({from :this.info.accounts[0]}).then((res:any)=>{
    return res
  }).catch((err:any)=>{
    return err
  })
}
}