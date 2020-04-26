import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AnalyticsService } from '../../../../shared/services/analytics/analytics.service';
import { environment } from '../../src/environments/environment';

const analyticsConfig = (analytics: AnalyticsService) => {
  return () => {
    return analytics.init();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: 'env',
      useValue: environment,
    },
    AnalyticsService,
    {
      provide: APP_INITIALIZER,
      useFactory: analyticsConfig,
      multi: true,
      deps: [AnalyticsService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
