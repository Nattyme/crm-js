  import {NAMES} from './../../config/config.js';
  import { eventEmitter } from './EventEmitter.js';


  class EventListenerManager {
    constructor() {
      // this.eventBus = eventBus;
      this.eventEmitter = eventEmitter;
      this.listeners = [];
      // this.data = [];
    }


   
  }

  const eventListenerManager = new EventListenerManager();
 

  export { EventListenerManager }
