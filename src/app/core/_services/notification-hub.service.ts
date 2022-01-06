import { ProductTypeEnum } from './../../_models/ProductTypeEnum';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@aspnet/signalr';
import { AuthService } from './auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { setTimeout } from 'timers';
@Injectable({
  providedIn: 'root',
})
export class NotificationHubService {
  private hubConnection: HubConnection;
  private notifcationHubURL: string = environment.notficationHubURL;
  private isHubClosed: boolean = true;
  private afterConnectedSuccessfully: (...arg: any) => void;

  constructor(private authService: AuthService) {
    // this.hubConnection = new HubConnectionBuilder()
    //   .withUrl(this.notifcationHubURL, {
    //     accessTokenFactory: () => this.authService.authToken,
    //     skipNegotiation: true,
    //     transport: HttpTransportType.WebSockets,
    //   })
    //   .configureLogging(LogLevel.Warning)
    //   .build();

    // this.hubConnection.onclose((err) => {
    //   if (!this.isHubClosed) {
    //     setTimeout(
    //       () => this.startConnection(this.afterConnectedSuccessfully),
    //       30000
    //     );
    //     console.log(
    //       'The connection with server is down, trying to reconnect during 30 seconds...'
    //     );
    //   }
    // });
  }
  // public startConnection(AfterConnectedSuccessfully: (...arg: any) => void) {
  //   if (!this.isHubConnected()) {
  //     this.authService.checkLoign().subscribe((isLoggedIn: boolean) => {
  //       if (isLoggedIn) {
  //         this.hubConnection
  //           .start()
  //           .then(() => {
  //             console.log('Connection started');
  //             AfterConnectedSuccessfully();
  //             this.afterConnectedSuccessfully = AfterConnectedSuccessfully;
  //             this.isHubClosed = false;
  //           })
  //           .catch((err) => {
  //             console.log(
  //               `Error while starting connection: ${err}, trying to reconnect during 30 seconds...`
  //             );
  //             setTimeout(
  //               () => this.startConnection(AfterConnectedSuccessfully),
  //               30000
  //             );
  //           });
  //       }
  //     });
  //   }
  // }
  // public addEventListener(
  //   eventName: string,
  //   callBackMethod: (...arg: any) => void
  // ) {
  //   this.hubConnection.on(eventName, callBackMethod);
  // }

  // public removeEventListener(
  //   eventName: string,
  //   callBackMethod: (...arg: any) => void
  // ) {
  //   this.hubConnection.off(eventName, callBackMethod);
  // }
  // public isHubConnected() {
  //   return (
  //     this.hubConnection &&
  //     this.hubConnection.state === HubConnectionState.Connected
  //   );
  // }
}
