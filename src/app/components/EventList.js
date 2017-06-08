import React from 'react';
import EventStore from '../stores/EventStore';
import EventActions from '../actions/EventActions';

export default class EventList extends React.Component {

      constructor () {
        super();
        this.state = {
            events: EventStore.getAll()
        };
      }

      componentWillMount() {
        EventStore.on("change", () => {
            this.setState ({
                events: EventStore.getAll()
            })
        })
      }

      render() {
        const events = this.state.events ;
        var EventsList = [];

        for (event in events) {
            EventsList.push(
             <li key={events[event].id} id={events[event].id}>
                {events[event].title} , {events[event].date}
             </li>
             )
        }
        return (
          <ul className="event-list-wrapper">
             {EventsList}
          </ul>
        );
      }
 }