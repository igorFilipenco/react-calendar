import React from 'react';
import EventStore from '../stores/EventStore';
import * as EventActions from '../actions/EventActions';
import dispatcher from '../dispatcher/Dispatcher';

class CalendarHeader extends React.Component {
    constructor() {
        super();
        this.months = ['January','February',
                       'March','April','May',
                       'June','July','August',
                       'September','October','November',
                       'December'];
        this.weekDays = [ 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    }

    previousControlClick(param) {

        switch(param) {
            case 'previous_year' : {
              let control_value = {'year': this.props.year-1}
              this.props.updateCalendar(control_value);
            }
            case 'previous_month' : {
              let control_value = {'month': this.props.month-1}
              this.props.updateCalendar(control_value);
            }
        }
    }

    nextControlClick(param) {

        switch(param) {
            case 'next_year' : {
              let  control_value = {'year': this.props.year+1}
              this.props.updateCalendar(control_value);
            }
            case 'next_month' : {
              let control_value = {'month': this.props.month+1}
              this.props.updateCalendar(control_value);
           }
        }
    }

    render() {
           var calendarHeader = [];

           for(var i=0; i<7; i++){
                calendarHeader.push(<div className="weekday-header"> {this.weekDays[i]} </div>);
           }

           return (
                <div className="form-group">
                    <div className="calendar-module-header">
                        <div className="year-header">
                            <a href="#" className="controls-header-left"
                                        onClick={this.previousControlClick.bind(this, 'previous_year')}>
                                <span className="glyphicon glyphicon-triangle-left" aria-hidden="true">
                                </span>
                            </a>
                            {this.props.year}
                            <a href="#" className="controls-header-right"
                                        onClick={this.nextControlClick.bind(this, 'next_year')}>
                                <span className="glyphicon glyphicon-triangle-right" aria-hidden="true">
                                </span>
                            </a>
                        </div>
                        <div className="month-header">
                            <a href="#" className="controls-header-left"
                                        onClick={this.previousControlClick.bind(this, 'previous_month')}>
                                <span className="glyphicon glyphicon-triangle-left" aria-hidden="true">
                                </span>
                            </a>
                            {this.months[this.props.month]}
                            <a href="#" className="controls-header-right"
                                        onClick={this.nextControlClick.bind(this, 'next_month')}>
                                <span className="glyphicon glyphicon-triangle-right" aria-hidden="true">
                                </span>
                            </a>
                        </div>
                            {calendarHeader}
                    </div>
                </div>
           );
    }
}


export default class CalendarModule extends React.Component {
    constructor() {
        super();
        this.state =  {
            year : new Date().getFullYear(),
            month : new Date().getMonth(),
            day: new Date().getDay(),
            isSelected : new Date().getDate()
        };
        this.updateCalendar = this.updateCalendar.bind(this);
        this.createCalendar = this.createCalendar.bind(this);
        this.getDefaultDateEvents = this.getDefaultDateEvents.bind(this);
        this.selectDate = this.selectDate.bind(this);
    }


    createCalendar() {

        var dayClass,
        D1 = new Date(),
        D1last = new Date(this.state.year,this.state.month + 1, 0).getDate(), // последний день месяца
        D1Nlast = new Date(this.state.year,this.state.month,D1last).getDay(), // день недели последнего дня месяца
        D1Nfirst = new Date(this.state.year,this.state.month,1).getDay(), // день недели первого дня месяца

        calendar = [];

        // пустые клетки до первого дня текущего месяца
        if (D1Nfirst != 0) {

          for(var  i = 1; i < D1Nfirst; i++) {
            calendar.push(<div className="day last-day"></div>);
          };
        } else { // если первый день месяца выпадает на воскресенье, то требуется 7 пустых клеток

          for(var  i = 0; i < 6; i++) {
            calendar.push(<div className="day last-day"></div>);
          };
        }


        // дни месяца
        for(var  i = 1; i <= D1last; i++) {
          var day_key = this.state.year.toString()+("0" + this.state.month.toString()).slice(-2) + ("0" + i).slice(-2);
          if (i != D1.getDate()) {
            if (this.state.isSelected === i) {
                dayClass = "day selected";
            } else {
                dayClass = "day";
            }

            calendar.push( <a href="#">
                                <div className={dayClass}
                                     key={day_key}
                                     id={i}
                                     onClick={this.selectDate}>
                                     {i}
                                </div>
                            </a>
            ) ;
          } else {
            dayClass = "day today";
            calendar.push( <a href="#">
                                <div className={dayClass}
                                     key={day_key}
                                     id={i}
                                     onClick={this.selectDate}>
                                     {i}
                                </div>
                            </a>
            );
            this.getDefaultDateEvents();
          }
          if (new Date(this.state.year,this.state.month,i).getDay() == 0) {  // если день выпадает на воскресенье, то перевод строки
            calendar.push(<div className="row"></div>);
          }
        }

        // пустые клетки после последнего дня месяца
        if (D1Nlast != 0) {

          for(var  i = D1Nlast; i < 7; i++) {
            calendar.push(<div className="day future-day"></div>);
          };;
        }

        return calendar;
    }

    getDefaultDateEvents() {
        var eventKey = this.state.year.toString() + "-" +
                       ("0" + (this.state.month + 1).toString()).slice(-2) + "-" +
                       ("0" + this.state.isSelected).slice(-2);

        EventStore.getDefaultEvents(eventKey);
    }

    selectDate(event){
        this.setState ({
            isSelected : parseInt(event.target.id)
        })
        var eventKey = this.state.year.toString() + "-" +
                       ("0" + (this.state.month + 1).toString()).slice(-2) + "-" +
                       ("0" + event.target.id).slice(-2);

        EventStore.getCurrentEvents(eventKey);
    }

    updateCalendar(param) {
        if(param.year){
            this.setState({
                year: param.year,

            })
        } else if(param.month){
            if(param.month > 11) {
                this.setState({
                month: 0,
                year: this.state.year + 1,

                })
            } else {
                this.setState({
                    month: param.month,

                })
            }
        }
    }

    render() {
           return (
                <div className="form-group">
                    <div className="calendar-module-header">
                        <CalendarHeader month = {this.state.month}
                                        year = {this.state.year}
                                        updateCalendar = {this.updateCalendar}
                        />
                    </div>
                    <div className="calendar-module-wrapper">
                        {this.createCalendar()}
                    </div>
                </div>
           );
    }
}