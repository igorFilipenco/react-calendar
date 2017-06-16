import React from 'react';
import EventStore from '../stores/EventStore';
import EventActions from '../actions/EventActions';

export default class EventList extends React.Component {

      constructor () {
        super();
        this.state = {
            events: EventStore.displayDefaultEvents()
        };
      }

      componentWillMount() {
        EventStore.on("display", () => {
            this.setState ({
                events: EventStore.displayEvents()
            })
        })
        EventStore.on("change", () => {
            this.setState ({
                events: EventStore.displayEvents()
            })
        })
      }

      render() {
        const events = this.state.events ;
        var EventsList = [];

        for (event in events) {
        console.log(events[event].id)
            EventsList.push(
             <li key={events[event].id} id={events[event].id}>
             <div className="col-md-9 col-xs-12">
                <div className="event-description">
                   {events[event].title}
                </div>
             </div>
             <div className="col-md-3 col-xs-12">
                <div className="event-date">
                   {events[event].date}
                </div>
             </div>
             </li>
             )
        }
        return (
          <ul className="event-list-wrapper">
             <h3 className="text-center"> Events on this day </h3>
             {EventsList}
          </ul>
        );
      }
}