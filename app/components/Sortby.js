import React from 'react';
import { Link } from 'react-router';

const Sortby = (props) => {

  return (
    <option value={props.item}>
      {props.item}
    </option>
  );
}

export default Sortby;
