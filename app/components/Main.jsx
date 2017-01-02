import axios from 'axios';
import { Link } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import Snippetslist from './Snippetslist';
import Addsnippet from './Addsnippet';
import Sortbylist from './Sortbylist';


const Main = React.createClass({



  render() {
    // let languageMap = this.props.snippets.map((snippet, index) => {
    //   if (this.props.snippets[index].language === undefined) {return}
    //      else{ return this.props.snippets[index].language };
    // });
    //
    // let uniqueLanguageMap = languageMap.filter((item, pos, self) => {
    //   if (item === '') {return} else {
    //     return self.indexOf(item) == pos;
    //   }
    // });
    //
    // const keywordMap = this.props.snippets.map((snippet, index) => {
    //   if (this.props.snippets[index].keywords === undefined) {return}
    //      else{ return this.props.snippets[index].keywords };
    // });
    //
    // const filteredkeyWordMap = keywordMap.filter((item, pos) => {
    //   return (item !== '');
    // });
    //
    // let newkeywordArray = [];
    // for (let i = 0; i < filteredkeyWordMap.length; i ++) {
    //   newkeywordArray[i] = filteredkeyWordMap[i].split(',');
    // };
    //
    // var keywordArrayMerged = [].concat.apply([], newkeywordArray);
    //
    // let trimmedKeywordArray = keywordArrayMerged.map((item, index) => {
    //   return item.trim();
    // });
    //
    // let initialsortByArray = uniqueLanguageMap.concat(trimmedKeywordArray);
    //
    // let sortByArrayUnique = initialsortByArray.filter((item, pos, self) => {
    //     return self.indexOf(item) == pos;
    // });
    //
    // let sortByArray = sortByArrayUnique.sort();
    //
    // sortByArray.unshift('All Titles');
    //
    // let sortByArrayRender = sortByArray.map((item, index) => {
    //   return <Sortby
    //     key={index}
    //     value={item}
    //     item={item}
    //     />
    // });

    return (
      <section >
        <div className="container">
            <div className="row">
              <div className="eight columns">
              <h4 className="titleWord">{this.props.currentUser.firstName}'s Code Library</h4>
              <h5>{this.props.sortValue}</h5>

              <Snippetslist
                snippets={this.props.snippets}
                snippetTitles={this.props.snippetTitles}
                currentIndex={this.props.currentIndex}
                changeCurrentIndex={this.props.changeCurrentIndex}
              />
              <p></p>
              </div>
              <div className="four columns">
                <Link to="/addsnippet"><button className="titleWord" id="addSnippetButton" onClick={this.props.addNewSnippetButton}>Add New Snippet</button></Link>
                <br/><br/>
                <Sortbylist
                  snippets={this.props.snippets}
                  sortValue={this.props.sortValue}
                  onSortChange={this.props.onSortChange}
                  handleSort={this.props.handleSort}
                  defaultSnippetArray={this.props.defaultSnippetArray}
                />
              </div>
            </div>
        </div>
      </section>
    );
  }
});

export default Main;
