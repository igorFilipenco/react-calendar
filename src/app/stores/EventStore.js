import dispatcher from '../dispatcher/Dispatcher';
import EventEmitter from 'events';


class EventStore extends EventEmitter {
  constructor() {
    super();
    this.events = [{
        id: 1,
        title: 'title 1',
        date: '2017-04-11 09:14:01'
        }, {
        id: 2,
        title: 'title 2',
        date: '2017-04-11 09:24:01'
        }, {
        id: 3,
        title: 'title 3',
        date: '2017-04-12 09:14:01'
        }, {
        id: 4,
        title: 'title 4',
        date: '2017-11-12 19:14:01'
        }, {
        id: 5,
        title: 'title 5',
        date: '2017-06-13 19:00:01'
        }, {
        id: 6,
        title: 'title 6',
        date: '2017-06-13 19:20:01'
        }, {
        id: 7,
        title: 'title 7',
        date: '2017-06-16 19:20:01'
        }

    ];
    this.currentEvents = [];
    this.defaultEvents = [];
    this.chosenDate;
  }

  getDefaultEvents(key) {
    this.chosenDate = key;
    if (this.defaultEvents.length > 0) {
        this.defaultEvents = [];
    }
    for (event in this.events){
        if (this.events[event].date.includes(key)) {
            this.defaultEvents.push(this.events[event]);
        }
    }

    if(this.defaultEvents.length === 0){
        this.defaultEvents.push({id: 10, title: 'No events planned on this day', date: ''})
    }

    this.emit("change.display_default");
  }

  getCurrentEvents(key) {

    this.chosenDate = key;
    if (key !== 'undefined') {
        this.currentEvents = [];
    }

    for (event in this.events){
        if (this.events[event].date.includes(key)) {
            this.currentEvents.push(this.events[event]);
        }
    }

    if(this.currentEvents.length === 0){
        this.currentEvents.push({id: 10, title: 'No events planned on this day', date: ''})
    }

    this.emit("change.display");
  }

  createEvent(new_event) {

    this.events.push ({
        id: new_event.id,
        title: new_event.title,
        date: new_event.date
    })
    if(new_event.date.includes(this.chosenDate)) {
        this.getCurrentEvents(this.chosenDate)
    }
  }

  displayEvents() {
    return this.currentEvents
  }

  displayDefaultEvents() {
    return this.defaultEvents
  }

  handleActions(action) {
    switch(action.type) {
        case 'CREATE_EVENT' : {
        this.createEvent(action.new_event);
      }
        case 'DISPLAY_CURRENT_EVENTS' : {
        this.getCurrentEvents(action.key);
      }
    }
  }
}

const eventStore = new EventStore;

dispatcher.register(eventStore.handleActions.bind(eventStore))

export default eventStore;