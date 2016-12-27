import axios from 'axios';
import { Link } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/monokai';

const Addsnippet = React.createClass({



  onChange(newValue) {
    console.log('change',newValue);

    this.props.onEditorChangeAddSnippet(newValue);

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
          <form>
            <div className="four columns">
            <h4 className="titleWord">Add New Snippet</h4>
            <div id="codeSnippet">
            <AceEditor
              mode="javascript"
              theme="monokai"
              // id="aceEditor"
              // theme="github"
              onChange={this.onChange}
              name="codeSnippet"
              value={this.props.addSnippet.codeSnippet}
              editorProps={{$blockScrolling: true}}
            />
            </div>
            </div>
            <div className="offset-by-four four columns titleWord2">

              <div>Title:
              <br/>
                <input  id="title" name="title" type="text" onChange={this.props.onFormChangeAddSnippet} value={this.props.addSnippet.title} className="validate" />
              </div>
              <br/>
              <div>Language:
              <br/>
                <input id="language" name="language" type="text" onChange={this.props.onFormChangeAddSnippet} value={this.props.addSnippet.language} className="validate" />
              </div>
              <br/>
              <div>Keywords:
              <br/>
                <input id="keywords" name="keywords" type="text" onChange={this.props.onFormChangeAddSnippet} value={this.props.addSnippet.keywords} className="validate" />
              </div>
              <br/>
              <div>Notes:
              <br/>
                <input id="notes" name="notes" type="text" onChange={this.props.onFormChangeAddSnippet} value={this.props.addSnippet.notes} className="validate" />
              </div>
              <br/>

              <Link to="/main"><button onClick={this.props.addNewSnippet}>Save Snippet</button></Link>

            </div>

            </form>
          </div>
        </div>
      </section>
    );
  }
});

export default Addsnippet;
