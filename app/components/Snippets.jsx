import { Link } from 'react-router';
import React from 'react';

const Snippets = React.createClass({


  render() {
    return (
        // <div className="four columns">
          <div >
            {this.props.snippetTitle}
          </div>
        // </div>
    );
  }
});

export default Snippets;
