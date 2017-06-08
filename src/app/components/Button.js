import React from 'react';
import { render } from 'react-dom';

export default class Button extends React.Component {
      constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
      }

      onClick() {
        this.props.onClick();
      }

      render() {
           return (
                <div className="form-group">
                  <button className="btn btn-info btn-custom"
                           onClick={this.onClick}
                    >
                      {this.props.name ? this.props.name : ''}
                    </button>
                </div>
           );
      }
}