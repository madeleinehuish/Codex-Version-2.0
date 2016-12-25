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
    // console.log(this.props.snippets.snippetsData);
    // const snippetsmap = this.props.snippets.snippetsData.map((snip, index) => {
    //   return <Snippets
    //     key={index}
    //     snip={this.props.snippets.snippetsData[index].title}
    //     // value={this.props.value}
    //   />
    // });

    return (
      <div>
          snippetslist
          {/* <Snippets /> */}

          {/* { snippets } */}
      </div>
    );
  }
});

export default Snippetslist;
