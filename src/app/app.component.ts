import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRHubService } from './Service/signal-rhub.service';
import * as signalR from '@microsoft/signalr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  constructor(public signalrhubservice: SignalRHubService)
  {}
  title = 'PTWClient1';

  ngOnInit(): void { 
   this.signalrhubservice.startConnection();
    
   //this.signalrhubservice.start();


  //  const _promise = new Promise((resolve, reject)=>
  //   {
  //     if(this.signalrhubservice.hubConnection.State = signalR.HubConnectionState.Connected)
  //     {
  //       //console.log("connecteddd");
  //         resolve(this.receiveDataFrmServer());
  //     } 
  //   })

  // _promise.then(result=>console.log(result));
    //under testing
  }

  async receiveDataFrmServer()
  {
    await this.signalrhubservice.hubConnection.invoke("sendDataFrmServer")
    .finally(()=>{
      console.log("Received Successfully");
    })
    .catch((err:any) => console.error(err));
  }

  ngOnDestroy(): void{
    this.signalrhubservice.hubConnection.off();
  }

}
