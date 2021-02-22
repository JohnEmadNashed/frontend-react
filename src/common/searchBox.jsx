/* This is a reusable search box component */

import React from "react";
import SearchIcon from "@material-ui/icons/Search";

const SearchBox = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        name="query"
        className="task-searchbox"
        placeholder="Search a certain task..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <SearchIcon />
    </div>
  );
};

export default SearchBox;
