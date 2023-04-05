import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{CountdownModule} from 'ngx-countdown';
import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  {path:"customer",component:CustomerComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    CountdownModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
