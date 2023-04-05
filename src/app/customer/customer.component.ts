import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit  {

  TicketArray : any[] =[];
  passengername:string = " ";
  passengersource:string = " ";
  passengerdest:string = " ";
  mobile :Number = 0;
  currentTicketID = "";

hours: number = 0;
minutes: number = 0;
seconds: number = 0;
isRunning: boolean = false;
timer: any;
get formattedTime(): string {
  return `${this.pad(this.hours)}:${this.pad(this.minutes)}:${this.pad(this.seconds)}`;
}
updateTime(): void {
  if (this.isRunning) {
    this.stopTimer();
  }
}

startTimer(): void {
  this.isRunning = true;
  this.timer = setTimeout(() => {
    if (this.seconds === 0) {
      if (this.minutes === 0) {
        if (this.hours === 0) {
          this.stopTimer();
          return;
        } else {
          this.hours--;
          this.minutes = 59;
          this.seconds = 59;
        }
      } else {
        this.minutes--;
        this.seconds = 59;
      }
    } else {
      this.seconds--;
    }
    this.startTimer();
  }, 1000);
}

stopTimer(): void {
  this.isRunning = false;
  clearTimeout(this.timer);
}

private pad(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}




    public ticketTimers: any = {};
    constructor(private http: HttpClient )
  {
      this.getAllTicket();
      this.ticketTimers = {};
    }
    ngOnInit() {
 
     throw new Error('Method not implemented.');
   
     

    }
   



 
  getAllTicket()
  {
    
    this.http.get("http://localhost:8080/api/v1/ticket/getAllTicket")
  
    .subscribe((resultData: any)=>
    {
       
      console.log(resultData);
        this.TicketArray = resultData;
      
    
      }
      );
  }
  cleardata(){
    this.passengername = '';
    this.passengersource = '';
    this.passengerdest = '';
      this.mobile  = 0;
  }
  register()
  {
  
    let bodyData = {
      "passengername" : this.passengername,
      "passengersource" : this.passengersource,
      "passengerdest" : this.passengerdest,
      "mobile" : this.mobile
    };
    this.http.post("http://localhost:8080/api/v1/ticket/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Details filled");
        this.getAllTicket();
 
        this.passengername = '';
      this.passengersource = '';
      this.passengerdest = '';
        this.mobile  = 0;
     

        


    });
  }
  setUpdate(data: any)
  {
   this.passengername = data.passengername;
   this.passengersource = data.passengersource;
   this.passengerdest = data.passengerdest;
   this.mobile = data.mobile;
   this.currentTicketID = data.ticketid;
  }
  UpdateRecords()
  {
    let bodyData = {
      "ticketid" : this.currentTicketID,
      "passengername" : this.passengername,
      "passengersource" : this.passengersource,
      "passengerdest" : this.passengerdest,
      "mobile" : this.mobile
    };
    
    this.http.put("http://localhost:8080/api/v1/ticket/update",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Ticket Updated")
        this.getAllTicket();
        this.passengername = '';
        this.passengersource = '';
        this.passengerdest = '';
        this.mobile  = 0;
    });
  }
  save()
  {
    if(this.currentTicketID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
  }
  setDelete(data: any)
  {
    
    
    this.http.delete("http://localhost:8080/api/v1/ticket/delete"+ "/"+ data.ticketid,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Ticket Deleted")
        this.getAllTicket();
 
        this.passengername = '';
      this.passengersource = '';
      this.passengerdest = '';
        this.mobile  = 0;
  
    });
  }


  // ngOnDestroy(): void {
  //   clearInterval(this.interval);
  // }

  
}
