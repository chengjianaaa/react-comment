import React, { Component, PropTypes } from 'react';

export default class Todo extends Component {
  render() {
    return (
      <li
        onClick={this.clickHandle.bind(this)}
        style={{
          textDecoration: this.props.completed ? 'line-through' : 'none',
          cursor: this.props.completed ? 'default' : 'pointer'
        }}>
        {this.props.text}
      </li>
    )
  }
  clickHandle() {
    const clickFn = this.props.onClickFn;
    
    clickFn(this.props.index);
  }
}


Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
}