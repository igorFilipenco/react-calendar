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
        }
    ];
  }

  createEvent(new_event) {
    console.log(this.state);
    this.events.push ({
        id: new_event.id,
        title: new_event.title,
        date: new_event.date
    })
    this.emit("change");
  }

  getAll() {
    return this.events
  }

  handleActions(action) {
    switch(action.type) {
        case 'CREATE_EVENT' : {
        this.createEvent(action.new_event);

      }
    }
  }
}

const eventStore = new EventStore;

dispatcher.register(eventStore.handleActions.bind(eventStore))

export default eventStore;