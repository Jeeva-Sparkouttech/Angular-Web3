import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Web3HandlingComponent } from './web3-handling.component';

describe('Web3HandlingComponent', () => {
  let component: Web3HandlingComponent;
  let fixture: ComponentFixture<Web3HandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Web3HandlingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Web3HandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
