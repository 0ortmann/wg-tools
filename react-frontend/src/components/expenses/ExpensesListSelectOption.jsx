import React, { Component } from 'react';

//import './ExpensesListSelectOption.scss'


export default class ExpensesListSelectOption extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <option>{this.props.list.name}</option>
        );
    }

}

ExpensesListSelectOption.propTypes = {
    list: React.PropTypes.object.isRequired
}