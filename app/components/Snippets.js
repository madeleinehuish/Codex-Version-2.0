import { Link } from 'react-router-dom';
import React from 'react';



const Snippets = (props) => {

  const changeCurrentKey = (event) => {
    const newIndex = event.target.name;
    console.log(newIndex);
    props.changeCurrentIndex(newIndex);
  }

  return (
    <li>
      <Link
        to="/editor"
        onClick={changeCurrentKey}
        value={props.value}
        name={props.value}
        className="snippetTitles">
          {props.snippetTitle}
      </Link>
    </li>
  );
}

export default Snippets;
