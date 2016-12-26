import axios from 'axios';
import { Link } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import Snippetslist from './Snippetslist';


const Main = React.createClass({
  //
  // getInitialState(){
  // return {
  //   snippets: {},
  //   }
  // },
  //
  // componentDidMount() {
  //   console.log(this.props.loggedIn);
  //   console.log(this.props.currentUser)
  //   axios.get(`/api-snippets/${this.props.currentUser.id}`)
  //     .then(res => {
  //       console.log(res.data);
  //       // this.setState({ snippets: res.data.snippetsData });
  //       // this.setState({ snippettest: this.state.snippets.snippetsData[0].title})
  //       // console.log(this.state.snippets[0].title);
  //       // this.setState({ snippets: res.data, defaultProducts: res.data, sortArray: res.data });
  //     })
  //     .then(() => {
  //
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },

  render() {
    // console.log(Array.isArray(this.props.snippets));
    // console.log(this.state.snippets);
    // console.log(this.state.loggedIn);

    return (
      <section >

          <div className="offset-by-one eight columns">
          <h4 id="titleWord">{this.props.currentUser.firstName}'s Code Library</h4>
          {/* { snippetsmap } */}
          main
          {/* {this.props.snippets} */}
          <Snippetslist
            snippets={this.props.snippets}
          />
          <p></p>
          </div>
      </section>
    );
  }
});

export default Main;
