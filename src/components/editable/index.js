import React from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

export default class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = { html: this.props.text };
  }

  handleChange = (evt) => {
    this.setState({ html: evt.target.value });
  };

  render = () => {
    return (
      <ContentEditable
        innerRef={this.contentEditable}
        html={this.state.html}
        disabled={false}
        onChange={this.handleChange}
        tagName="p"
        onBlur={({ target }) => {
          this.props.updateNotes(sanitizeHtml(target.innerText), this.props.id);
        }}
      />
    );
  };
}
