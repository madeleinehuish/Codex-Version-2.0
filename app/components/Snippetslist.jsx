import Snippets from './Snippets';
import React from 'react';

const Snippetslist = React.createClass({
  handleClick() {
    this.props.displaySearch();
  },

  handleSortType(event) {
    const sortValue = event.target.name;

    this.props.handleSort(sortValue);
  },

  render() {
    console.log(this.props.snippets);
    // const snippetmap = this.props.snippets.map((snippet, index) => {
    //   return <Snippets
    //     key={index}
    //     snippet={this.state.snippets[index].title}
    //     value={this.state.snippets[index].title}
    //   />
    // });

    return (
      <div>
          {/* { snippetsmap } */}
          snippetslist
          {/* <Snippets
            snippets={this.props.snippets}
          /> */}
      </div>
    );
  }
});

export default Snippetslist;
