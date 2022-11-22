import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../Service/web3-service.service';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-web3-handling',
  templateUrl: './web3-handling.component.html',
  styleUrls: ['./web3-handling.component.css']
})
export class Web3HandlingComponent implements OnInit {

  public accInfo : any = {
    accounts : [],
    balance : '',
    tBalance : ''
  }
  direction : any
  transferForm !: FormGroup
  response : any

  constructor(private web3: Web3Service,private formBuilder : FormBuilder) {
   }

  ngOnInit(): void {
    this.transferForm = this.formBuilder.group({
      address : ['',Validators.required],
      amount : ['',Validators.required]
    })
  }
  async Connect() {
    await this.web3.connectAccount().then(response => {
      console.log(response);
      this.direction = response;
    }).catch((error: any) => {
      console.error(error);
    });
    this.accInfo = await this.web3.accountInfo()
    await console.log(this.accInfo)
  }

  Disconnect() {
    this.web3.disconnectWallet()
  }

  async tranferToken(){
    if(this.transferForm.valid){
      let res = await this.web3.transferTokenService(this.transferForm.value.address,this.transferForm.value.amount)
      this.response = res
    }
    else{
      this.response = "error: check form values"
    }
  }
}
