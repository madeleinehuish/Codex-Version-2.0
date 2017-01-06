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

  // onChange(newValue) {
  //   console.log('change',newValue);
  //
  //   this.props.onEditorChange(newValue);
  //   // const editor = ace.edit("codeSnippet");
  //   // const code = editor.getValue();
  //   // console.log(code);
  //   // this.props.onFormChange(event);
  //   // this.props.changeEditor(newValue);
  // },
  //
  // formUpdate () {
  //   this.props.onFormChange()
  // },

  render() {
    if (this.props.snippets.length === 0) {
      return <section></section>;
    }
    const newIndex = 1;
    const current = this.props.snippets[newIndex];

    return (
      <section >
        <div className="container">
          <div className="row">
          <form>
            <div className="four columns">
            <h5 className="titleWord">{this.props.snippets[this.props.currentIndex].title}</h5>
            <div id="codeSnippet">
            <AceEditor
              mode="javascript"
              theme="monokai"
              // id="aceEditor"
              // theme="github"
              onChange={this.props.onEditorChange}
              name="codeSnippet"
              value={this.props.snippets[this.props.currentIndex].codeSnippet}
              editorProps={{$blockScrolling: true}}
            />
            </div>
            </div>
            <div className="offset-by-four four columns titleWord2">

              <div>Title:
              <br/>
                <input  id="title" name="title" type="text" onChange={this.props.onFormChange} value={this.props.snippets[this.props.currentIndex].title} className="validate" />
              </div>
              <br/>
              <div>Language:
              <br/>
                <input id="language" name="language" type="text" onChange={this.props.onFormChange} value={this.props.snippets[this.props.currentIndex].language} className="validate" />
              </div>
              <br/>
              <div>Keywords:
              <br/>
                <input id="keywords" name="keywords" type="text" onChange={this.props.onFormChange} value={this.props.snippets[this.props.currentIndex].keywords} className="validate" />
              </div>
              <br/>
              <div>Notes:
              <br/>
                <input id="notes" name="notes" type="text" onChange={this.props.onFormChange} value={this.props.snippets[this.props.currentIndex].notes} className="validate" />
              </div>
              <br/>

              <Link to="/main"><button onClick={this.props.patchSnippets}>Save To Codex</button></Link>
              <br/><br/>
              <Link to="/main"><button onClick={this.props.deleteSnippet}>Delete</button></Link>

            </div>

            </form>
          </div>
        </div>
      </section>
    );
  }
});

export default Editor;
