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

  formUpdate () {
    this.props.onFormChange()
  },

  render() {
    const newIndex = 1;
    // const newIndex = this.props.currentIndex;
    const current = this.props.snippets[newIndex];
    // console.log(current.codeSnippet);
    console.log(this.props.snippets[1].codeSnippet);
    // const title = this.props.snippets[this.props.currentIndex].title;

    return (
      <section >
        <div className="container">
          <div className="row">
            <div className="four columns">
            <h4 className="titleWord">{this.props.snippets[this.props.currentIndex].title}</h4>
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
            <div className="offset-by-four four columns titleWord2">
            <form>
              <div>Title:
              <input  id="title" name="title" type="text" onChange={this.props.onFormChange} value={this.props.snippets[this.props.currentIndex].title} className="validate" />
                {/* Title: {this.props.snippets[this.props.currentIndex].title} */}
              </div>
            </form>
              <div>
                Keywords: {this.props.snippets[this.props.currentIndex].keywords}
              </div>
              <div>
                Notes: {this.props.snippets[this.props.currentIndex].notes}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
});

export default Editor;
