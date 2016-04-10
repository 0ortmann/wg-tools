import React, { Component } from 'react';

import EditForm from './edit/EditForm.jsx';
import LoginHeader from './login/LoginHeader.jsx';
import ExpensesContainer from './expenses/ExpensesContainer.jsx';
import DeptContainer from './depts/DeptContainer.jsx';
var expensesActions = require('../actions/ExpensesActions.jsx');


export default class Main extends Component {

    constructor(props) {
        super(props);
        // init store
        //expensesActions.fetchExpenses();
        //expensesActions.fetchDepts();
        expensesActions.fetchExpensesLists();
    }

    render() {
        return (
            <div className='main'>
                <LoginHeader />
                <ExpensesContainer />
                <DeptContainer />
                <EditForm />
            </div>);
    }
}