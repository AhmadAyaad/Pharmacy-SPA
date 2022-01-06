import { NotificationEvents } from './core/_models/NotificationEvents.model';
import { Subscription } from 'rxjs';
import { NotifciationEventService } from './core/_services/notifciation-event.service';
import { NotificationHubService } from './core/_services/notification-hub.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/_services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pharmacy-SPA';
  isAuthenticated: boolean = false;
  private subscription: Subscription = new Subscription();
  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    this.isAuthenticated = !!this.authService.authToken;
  }
}
