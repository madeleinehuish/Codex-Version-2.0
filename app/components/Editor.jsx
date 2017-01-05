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

  // formUpdate () {
  //   this.props.onFormChange()
  // },

  render() {
    if (this.props.snippets.length === 0) {
      return <section></section>;
    }
    const newIndex = 1;
    // const newIndex = this.props.currentIndex;
    const current = this.props.snippets[newIndex];
    // console.log(current.codeSnippet);
    //console.log(this.props.snippets[1].codeSnippet);
    // const title = this.props.snippets[this.props.currentIndex].title;

    return (
      <section >
        <div className="container">
          <div className="row">
          <form>
            <div className="four columns">
            <h4 className="titleWord">{this.props.snippets[this.props.currentIndex].title}</h4>
            <div id="codeSnippet">
            <AceEditor
              mode="javascript"
              theme="monokai"
              // id="aceEditor"
              // theme="github"
              onChange={this.onChange}
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

              <Link to="/main"><button onClick={this.props.patchSnippets}>Save To Database</button></Link>
              <br/><br/>
              <Link to="/main"><button onClick={this.props.deleteSnippet}>Delete This Snippet</button></Link>

            </div>

            </form>
          </div>
        </div>
      </section>
    );
  }
});

export default Editor;
