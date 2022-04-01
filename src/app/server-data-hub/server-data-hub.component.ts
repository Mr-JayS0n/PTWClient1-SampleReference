import { Component, OnInit } from '@angular/core';
import { SignalRHubService } from '../Service/signal-rhub.service';
@Component({
  selector: 'app-server-data-hub',
  templateUrl: './server-data-hub.component.html',
  styleUrls: ['./server-data-hub.component.css']
})
export class ServerDataHubComponent implements OnInit {

  constructor(public signalrHubService:SignalRHubService) { }

  ngOnInit(): void {
  }

  setServerData(): void
  {
    
  }

  getServerData(): void
  {

  }


}
