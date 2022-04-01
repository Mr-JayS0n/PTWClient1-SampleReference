import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Router } from '@angular/router';
//import { ToastrModule, ToastrService } from 'ngx-toastr';
//import {HttpConnection} from '@angular/';//////resume here


@Injectable({
  providedIn: 'root'
})
export class SignalRHubService {

  constructor(
    public router: Router,

    //public toastr: ToastrService,
  ) { }

  hubConnection: any;

  //temporary only, we might need to migrate this ito form-info.ts
  name:any;
  id:any;
  date:any;

  startConnection = () =>
  {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:5001/streamHub',{
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .withAutomaticReconnect()
    .build();
    

    this.hubConnection.start().then(()=>
    {
      console.log("Connection Started");
      //this.toastr.show("Connection Started");
      
      
      //console.log(connectionUrl);
      


      //test code t.1 
    //   console.log("Counter ready");
    //   //using observable method to read realtime data
    //   this.hubConnection.stream("Counter",10,500).subscribe(
    //     {
    //       next:(item:any)=>
    //       {
    //         console.log("Counter Started");
    //         var li = document.createElement("li");
    //         li.textContent = item;
    //         document.getElementById("messageList")?.appendChild(li);
    //       },
    //       complete:()=>{
    //         var li = document.createElement("li");
    //         li.textContent = "Stream completed";
    //         document.getElementById("messageList")?.appendChild(li);
    //       },
    //       error:(err:any)=>{
    //         var li = document.createElement("li");
    //         li.textContent = err;
    //         document.getElementById("messageList")?.appendChild(li);
    //       },
    //     }
    //   );
    // }).
    // catch((err:any)=> console.log('Error while starting connection '+err));
    });
  }
  
  
  async listenerSuccess()
  {
    await this.hubConnection.on("responseDataFrmServer",(formInfo:any)=>
    {
      console.log("hi"+formInfo);
      this.id = formInfo.id;
      this.name = formInfo.name;
      this.date = formInfo.date;
    });
  }

  // async start()
  // {
  //   try{
  //     await this.hubConnection.start();
  //     console.log("SignalR Connected.");
  //   } catch(err)
  //   {
  //     console.log(err);
  //     setTimeout(this.start,5000);
  //   }
  // }
}
