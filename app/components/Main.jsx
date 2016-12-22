import axios from 'axios';
import { Link } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';

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
      <section id="home">
        <div id="hero">
          <h2 id="titleWord">Main</h2>
          <div className="twelve columns">
          {/* <AceEditor
            mode="java"
            theme="github"
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
          /> */}
          </div>
        </div>
      </section>
    );
  }
});

export default Main;
