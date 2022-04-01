import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRHubService } from '../Service/signal-rhub.service';
import * as signalR from '@microsoft/signalr';
import { encode,decode } from '@msgpack/msgpack';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.css']
})
export class FormInfoComponent implements OnInit {

  constructor(public signalrhubservice: SignalRHubService) { }

  ConnectionStarted: boolean = false;

  //testing
  readonly object ={
    nil:null,
    integer: 1,
    float: Math.PI,
    string: "Hello World",
    binary: Uint8Array.from([1,2,3]),
    array:[10,20,30],
    map:{foo:"bar"},
    timestampExt: new Date(),
  };

  readonly encoded: Uint8Array = encode(this.object);

  
  
  ngOnInit(): void {
    const decoded = decode(this.encoded);
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(this.object.array.length) / Math.log(1024));
    //console.log(this.object.array.length);
    console.log('hi'+ Math.round(this.object.array.length/Math.pow(1024,i))+ ' '+ sizes[i]);
    console.log(this.encoded);
    console.log(this.encoded.byteLength);
    console.log(decoded);    
    





    this.listenerResponseDataFrmServer();
    console.log(this.signalrhubservice.hubConnection.state);
    
    //Check connection status after one second delay
    const prom = new Promise((res)=> setTimeout(res,1000));
    prom.then(()=>
    {
    if(this.signalrhubservice.hubConnection.state === signalR.HubConnectionState.Connected)
    {
      console.log("SignalR Connected.");

       
      const streamConnected = new Promise((resolve, reject)=>
      {
        resolve("Connection Status = true"); 
      })

      streamConnected.then((success)=>
      {
        console.log(success);
        this.streamData();
        this.streamingData().then(()=>console.log("success"));
      })

    }});
    
  }

  onSubmitBtn()
  {    
    //this.receiveDataFrmServer();
    console.log("hi");
    this.streamData();
    this.streamingData();
    
  }


  public streamData(): signalR.IStreamResult<any>
  {
    console.log("Counter ready");
    
    //invoke stream method from client to server
    return this.signalrhubservice.hubConnection.stream("Counter",50,0);
    
  }

  async streamingData()
  {
    //read the observable data by using subscribe, this data is send from server to client after the invocation
    await this.streamData().subscribe(
      {
        next:(item:any)=>
        {
          console.log(item);
          var li = document.createElement("li");
          li.textContent = item;
          document.getElementById("messageList")?.appendChild(li);
        },
        complete:()=>{
          var li = document.createElement("li");
          li.textContent = "Stream completed";
          document.getElementById("messageList")?.appendChild(li);
        },
        error:(err:any)=>{
          var li = document.createElement("li");
          li.textContent = err;
          document.getElementById("messageList")?.appendChild(li);
        },  
      }
    )
  }


  async receiveDataFrmServer()
  {
    console.log("ok");
    await this.signalrhubservice.hubConnection.invoke("sendDataFrmServer")
    .finally(()=>{
      console.log("Received Successfully");
    })
    .catch((err:any) => console.error(err));
  }

  async listenerResponseDataFrmServer() //this function is awaitng invoke from server.
  {
    await this.signalrhubservice.hubConnection.on("responseDataFrmServer",(formInfo:any)=>
    {
      console.log(formInfo);
      this.signalrhubservice.id = formInfo.id;
      this.signalrhubservice.name = formInfo.name;
      this.signalrhubservice.date = formInfo.date;
    });
  }
  
}
