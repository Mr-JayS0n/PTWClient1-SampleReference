import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerDataHubComponent } from './server-data-hub.component';

describe('ServerDataHubComponent', () => {
  let component: ServerDataHubComponent;
  let fixture: ComponentFixture<ServerDataHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerDataHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerDataHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
