import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import EventStore from '../stores/EventStore';
import EventList from '../components/EventList';
import CalendarModule from '../components/CalendarModule';
import * as EventActions from '../actions/EventActions';

export default class Calendar extends React.Component {
      constructor() {
        super();
        this.state = {
                       id: '',
                       title: '',
                       date: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.cleanFields = this.cleanFields.bind(this)
      }

      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }

      cleanFields() {
        this.setState({
              title: '',
              date: ''
        });
      }

      createEvent() {
        var new_event = {
                         id: new Date().getTime(),
                         title : this.state.title,
                         date : this.state.date
                         }
        EventActions.createEvent(new_event)
        this.cleanFields();
      }

      render() {
           return (
           <div className="container">
             <div className="row">
                <div className="col-md-12 col-xs-12 calendar-wrapper">
                    <div className="col-md-8 col-md-offset-2 col-xs-12">
                        <CalendarModule />
                        <EventList />
                        <div className="form-wrapper">
                            <h3 className="text-center"> Add new event </h3>
                            <Input name="title"
                                   type="text"
                                   value={this.state.title}
                                   onChange={this.handleChange}
                            />
                            <Input name="date"
                                   type="datetime-local"
                                   value={this.state.date}
                                   onChange={this.handleChange}
                            />
                            <Button name="add event"
                                    onClick={this.createEvent}
                            />
                        </div>
                    </div>

                </div>
             </div>
           </div>
           );
      }
}
