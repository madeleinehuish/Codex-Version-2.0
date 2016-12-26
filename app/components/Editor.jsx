import axios from 'axios';
import { Link } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/monokai';

const Editor = React.createClass({

  // componentDidMount() {
  //   axios.get('/api-snippets/1')
  //     .then(res => {
  //       console.log(res.data);
  //       console.log(res.data.snippetsData[0].codeSnippet);
  //       // this.setState({ products: res.data, defaultProducts: res.data, sortArray: res.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },



  onChange(newValue) {
    console.log('change',newValue);
    // this.props.changeEditor(newValue);
  },

  render() {
    const newIndex = 1;
    // const newIndex = this.props.currentIndex;
    const current = this.props.snippets[newIndex];
    // console.log(current.codeSnippet);
    console.log(this.props.snippets[1].codeSnippet);


    return (
      <section >

          <div className="offset-by-one four columns">
          <h4 id="titleWord">Code Editor Test</h4>
          <div id="trythis">
          <AceEditor
            mode="javascript"
            theme="monokai"
            // theme="github"
            onChange={this.onChange}
            name="trythis"
            value={this.props.snippets[this.props.currentIndex].codeSnippet}
            editorProps={{$blockScrolling: true}}
          />
          </div>
          </div>
      </section>
    );
  }
});

export default Editor;
