import Sortby from './Sortby';
import React from 'react';
import { render } from 'react-dom';

const handleChange = (event) => {
  console.log(event.target.value);
  let e = event.target.value;
  console.log(e);
  let type = 'sort';
  this.props.handleSearch(e, type);
}

const handleSubmit = (event) => {
  console.log('test');
  event.preventDefault();
}

const Sortbylist = (props) => {

    let languageMap = this.props.defaultSnippetArray.map((snippet, index) => {
      if (this.props.defaultSnippetArray[index].language === undefined) {return ''}
         else{ return this.props.defaultSnippetArray[index].language };
    });

    let uniqueLanguageMap = languageMap.filter((item, pos, self) => {
      if (item === '') {return} else {
        return self.indexOf(item) == pos;
      }
    });

    const keywordMap = this.props.defaultSnippetArray.map((snippet, index) => {
      if (typeof this.props.defaultSnippetArray[index].keywords === undefined) {
        return '';
      }
      else { return this.props.defaultSnippetArray[index].keywords };
    });

    const filteredkeyWordMap = keywordMap.filter((item, pos) => {
      return (item !== '');
    });

    let newkeywordArray = [];
    for (let i = 0; i < filteredkeyWordMap.length; i ++) {
      newkeywordArray[i] = filteredkeyWordMap[i].split(',');
    };

    var keywordArrayMerged = [].concat.apply([], newkeywordArray);

    let trimmedKeywordArray = keywordArrayMerged.map((item, index) => {
      return item.trim();
    });

    let initialsortByArray = uniqueLanguageMap.concat(trimmedKeywordArray);

    let sortByArrayUnique = initialsortByArray.filter((item, pos, self) => {
        return self.indexOf(item) == pos;
    });

    let sortByArray = sortByArrayUnique.sort();

    sortByArray.unshift('All Titles');

    let sortByArrayRender = sortByArray.map((item, index) => {
      return <Sortby
        key={index}
        value={item}
        item={item}
        handleChange={this.handleChange}
        sortValue={this.props.sortValue}
        />
    });

    return (
      <form onSubmit={this.handleSubmit}>
          <label className="titleWord">Filter
            <select className="u-full-width " value={this.props.sortValue} onChange={this.props.handleSort}>
              {sortByArrayRender}
            </select>
          </label>
      </form>
    );
}

export default Sortbylist;
