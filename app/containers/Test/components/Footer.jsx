import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<p>
				show:
				{this.renderFilter('SHOW_ALL','ALL')}
				----
				{this.renderFilter('SHOW_COMPLETED','Completed')}
				----
				{this.renderFilter('SHOW_ACTIVE','Active')}
			</p>
		)
	}
	renderFilter(filter,name) {
		if (filter === this.props.filter) {
			return name;
		}
		return (
			<a href='#' onClick={this.clickHandle.bind(this,filter)}>
			{name}
			</a>
		)
	}
	clickHandle(filter,e) {
		e.preventDefault();
		const onFilterChange = this.props.onFilterChange;
		onFilterChange(filter);
	}
}
Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}