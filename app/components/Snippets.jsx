import { Link } from 'react-router';
import React from 'react';

const Snippets = React.createClass({

  changeCurrentKey(event) {
    const newIndex = event.target.name;
    console.log(newIndex);
    this.props.changeCurrentIndex(newIndex);
  },

  render() {
    return (
        // <div className="four columns">
          <li>
          <Link to="/editor" onClick={this.changeCurrentKey} value={this.props.value} name={this.props.value} className="snippetTitles">
            {this.props.snippetTitle}
          </Link>
          </li>
        // </div>
    );
  }
});

export default Snippets;
