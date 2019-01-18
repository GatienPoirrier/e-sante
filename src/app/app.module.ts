import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
 
import { AppRoutingModule }     from './app-routing/app-routing.module';
 
import { AppComponent } from './app.component';
import { TemperatureComponent } from './customer/temperature/temperature.component';
import { PositionComponent } from './customer/position/position.component';
import { AirComponent } from './customer/air/air.component';
import { CustomerComponent } from './customer/customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatGridListModule } from '@angular/material';
// import { CustomerDetailsComponent } from './customer-details/customer-details.component';
// import { AddCustomerComponent } from './add-customer/add-customer.component';
 
@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    TemperatureComponent,
    PositionComponent,
    AirComponent
    // CustomerDetailsComponent,
    // AddCustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }