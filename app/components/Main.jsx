import axios from 'axios';
import { Link } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import Snippetslist from './Snippetslist'


const Main = React.createClass({

  // componentDidMount() {
  //   axios.get(`/api-snippets/${this.props.currentUser.id}`)
  //     .then(res => {
  //       console.log(res.data);
  //       console.log(res.data.snippetsData[0].codeSnippet);
  //       this.setState({ snippets: res.data });
  //       console.log(this.state.snippets);
  //       // this.setState({ snippets: res.data, defaultProducts: res.data, sortArray: res.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },

  render() {
    console.log(Array.isArray(this.props.snippets.snippetsData));
    return (
      <section >

          <div className="offset-by-one eight columns">
          <h4 id="titleWord">{this.props.currentUser.firstName}'s Code Library</h4>
          {/* {this.props.snippets.snippetsData[1].title} */}
          main
          <Snippetslist
          { ...this.state }
          />
          <p></p>
          </div>
      </section>
    );
  }
});

export default Main;
