import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../../../../../shared/services/analytics/analytics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Angular with Analytics Service';
  constructor(readonly analytics: AnalyticsService) { }

  ngOnInit() {
  }

  setEventButton(action, category, label) {
    this.analytics.sendEvent(action, category, label);
  }

}
