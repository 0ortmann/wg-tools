import React, { Component } from 'react';
var expensesAction = require('../../actions/ExpensesActions.jsx');
var expensesStore = require('../../stores/ExpensesStore.jsx');
import Constants from '../../constants/ExpenseConstants.jsx';


import './EditForm.scss'

export default class EditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            name: '',
            activeList: undefined
        };
    }

    componentDidMount() {
        expensesStore.addEventListener(Constants.ACTIVE_LIST, this.handleListSelect.bind(this));
    }

    componentWillUnmount() {
        expensesStore.removeEventListener(Constants.ACTIVE_LIST, this.handleListSelect.bind(this));
    }

    handleListSelect() {
        this.setState({ activeList: expensesStore.getActiveList() });
    }


    addExpense(event) {
        event.preventDefault();
        var amount = this.state.amount;
        var name = this.state.name.trim();
        // console.log("storing for list ", this.state.activeList);
        expensesAction.storeExpense(name, amount, this.state.activeList);

        this.clearInputfields();
    }

    clearInputfields() {
        this.setState({amount: 0});
        this.setState({name: ''});
    }

    nameChange(event) {
        this.setState({name: event.target.value});
    }

    amountChange(event) {
        this.setState({amount: event.target.value});
    }

    render() {
        if(this.state.activeList === undefined) {
            return (
                <div className='editForm'>
                    <h3>Keine Liste ausgewählt</h3>
                </div>
            );
        }
        return (
            <div className='editForm'>
                <h1>Eintrag anlegen</h1>
                <form onSubmit={this.addExpense.bind(this)}>
                    <div className="form-group">
                        <label className="editForm__label" htmlFor="name">Name</label>
                        <input className="editForm__input" id="name" value={this.state.name} onChange={this.nameChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label className="editForm__label" htmlFor="amount">Betrag</label>
                        <input className="editForm__input" id="amount" type="number" step="0.01" min="0" value={this.state.amount} onChange={this.amountChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label className="editForm__label" htmlFor="submit">Speichern</label>
                        <button className="editForm__button btn btn-primary" id="submit" type="submit">OK</button>
                    </div>
                </form>
            </div>

        );
    }
}
