import React from "react";
import ReactDOM from "react-dom";

const carBrands = [
  "Alfa Romeo", "Audi", "BMW", "Chevrolet", "Chrysler", "Dodge", "Ferrari",
  "Fiat", "Ford", "Honda", "Hyundai", "Jaguar", "Jeep", "Kia", "Mazda", "Mercedez-Benz",
  "Mitsubishi", "Nissan", "Peugeot", "Porsche", "SAAB", "Subaru", "Suzuki", "Toyota",
  "Volkswagen", "Volvo"
];

/**
 * EXERCISE
 *
 * Create a Typeahead Input
 * ------------------------
 *
 * General guidelines: Use default browser styles. Focus on functionality.
 *
 * Requirements:
 *   1. As the user types in the input, a list of options should appear below
 *      it. The list should contain items from the `list` prop that *start* with
 *      the user entered value (case insensitive).
 *   2. Every new character typed should filter the list.
 *   3. List should only appear when input is not empty. Whitespace only is
 *      considered empty.
 *   4. Clicking on a list item should populate the input with the selected
 *      value and hide the list.
 */

class Typeahead extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      value: '',
      defaultArray : props.list,
      filteredArray : []
    };

    this.filter = this.filter.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);

  }

  filter(event) {
    const evt = event.target.value;
    let filtered = this.state.defaultArray.filter((item) => {
      if (item.toUpperCase().includes(evt.toUpperCase()) && item.toUpperCase().indexOf(evt.toUpperCase()) ===0 ) { return true}
    })

    this.setState({ value: event.target.value });

    if (event.target.value !== '') {
      this.setState({ filteredArray: filtered });
    } else {
      this.setState({ filteredArray: [] })
    }
  }

  onHandleClick(event) {
    let newValue = event.target.innerHTML;

    this.setState({ value: event.target.innerHTML });
    this.setState({ filteredArray: [] });

  }

  render() {
    let currentList = this.state.filteredArray;
    let mappedList = currentList.map((item) => {
      return <li onClick={this.onHandleClick}>{item}</li>
    });

    return (
      <div>
        <input value={this.state.value} onChange={this.filter} />
        <ul>{mappedList}</ul>
      </div>
    )
  }
}

ReactDOM.render(
  <Typeahead list={carBrands} />,
  document.getElementById("root")
);
