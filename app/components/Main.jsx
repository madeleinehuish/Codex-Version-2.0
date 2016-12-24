import axios from 'axios';
import { Link } from 'react-router';
import React from 'react';
import { render } from 'react-dom';


const Main = React.createClass({

  componentDidMount() {
    axios.get('/api-snippets/1')
      .then(res => {
        console.log(res.data);
        console.log(res.data.snippetsData[0].codeSnippet);
        // this.setState({ products: res.data, defaultProducts: res.data, sortArray: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  render() {
    return (
      <section >

          <div className="offset-by-one eight columns">
          <h4 id="titleWord">{this.props.currentUser.firstName}'s Code Library</h4>

          </div>
      </section>
    );
  }
});

export default Main;
