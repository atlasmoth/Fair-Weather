import { useState } from "react";
export default function Search(props) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div id="search">
        <label
          htmlFor="search"
          style={{
            color: "#091f2f",
            lineHeight: 2,
            letterSpacing: "-2px",
            fontWeight: 700,
            fontSize: "2rem",
          }}
        >
          SEARCH
        </label>
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
