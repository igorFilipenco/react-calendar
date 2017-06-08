import React from 'react';

export default class Input extends React.Component {
      constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
      }

      onChange(event) {
        this.props.onChange(event);
      }

      render() {
           return (
                <div className="form-group">
                  <label>{this.props.name ? this.props.name : ''}</label>
                  <input type="text"
                         className="form-control"
                         name={this.props.name}
                         value={this.props.value}
                         onChange={this.onChange}
                         />
                </div>
           );
      }
}
