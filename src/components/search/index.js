import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Search() {
  const [value, setValue] = useState("");
  const history = useHistory();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        value.length > 0 &&
          history.push(`/cities/${encodeURIComponent(value)}`);
      }}
      autoComplete="off"
    >
      <div id="search">
        <div className="relative">
          <input
            type="text"
            name="search"
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
          <span style={{ right: 0, bottom: 10 }} className="blue absolute">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>
    </form>
  );
}
