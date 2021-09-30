import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Search(props) {
  const [value, setValue] = useState("");
  const history = useHistory();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        history.push(`/cities/${encodeURIComponent(value)}`);
      }}
    >
      <div id="search">
        <div style={{ position: "relative" }}>
          <input
            type="text"
            name="search"
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
          <span
            style={{ position: "absolute", right: 0, bottom: 10 }}
            className="blue"
          >
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>
    </form>
  );
}