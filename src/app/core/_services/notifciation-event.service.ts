import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotifciationEventService {
  eventMapper: Map<string, Subject<any>> = new Map();
  constructor() {}

  public subscribeOnEvent(
    eventName: string,
    callBackMethod: (...arg: any) => void
  ): Subscription {
    if (!this.eventMapper.has(eventName)) {
      this.eventMapper.set(eventName, new Subject());
    }
    return this.eventMapper.get(eventName).subscribe(callBackMethod);
  }

  public invoke(eventName: string, paramterObject: any) {
    if (this.eventMapper.has(eventName)) {
      this.eventMapper.get(eventName).next(paramterObject);
    }
  }
}
