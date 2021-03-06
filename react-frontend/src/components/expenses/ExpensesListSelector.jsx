import React, { Component } from 'react';
import ConfirmBox from './ConfirmBox.jsx';


import './ExpensesHeaderEntry.scss'

const INVALID_SELECTION = 'Ungültige Liste gewählt';

export default class ExpensesListSelector extends Component {

    constructor(props) {
        super(props);
    }

    handleSelect(event) {
        this.props.setActiveList(event.target.value);
    }

    doDeleteList() {
        // console.log('perform delete');
        this.props.deleteList(this.props.selected.name);
    }

    doLockList() {
        //console.log('perform lock');
        this.props.lockList(this.props.selected.name);
    }

    getInvalidSelectOption() {
        if (!this.props.selected || !this.props.selected.name) {
            return <option key={INVALID_SELECTION} value={INVALID_SELECTION}>{INVALID_SELECTION}</option>;
        }
    }

    render() {
        const { expensesLists, selected } = this.props;
        if(expensesLists.length === 0) {
            return (
                <div className="expensesListSelector"> 
                <h3>Liste auswählen</h3>
                    <select className="form__select">
                        <option>Bitte neue Liste anlegen</option>
                    </select>
                </div>
            );
        }
        let selectedName = selected && selected.name ? selected.name : INVALID_SELECTION;
        let editable = selected ? selected.editable : false;
        return(
            <div className="expensesListSelector"> 
                <h3>Liste auswählen</h3>
                <select className="form__select" onChange={this.handleSelect.bind(this)} value={selectedName} >
                    {this.getInvalidSelectOption()}
                    {expensesLists.map((list) => {
                        return <option key={list} value={list}>{list}</option>
                    })}
                </select>
                <div>
                    <ConfirmBox text={'Liste löschen'} abortText={'doch nicht'} confirmText={'ja, löschen'}
                        confirmCallback={this.doDeleteList.bind(this)} />
                    {editable? <ConfirmBox text={'Liste sperren'} abortText={'doch nicht'} confirmText={'ja, sperren'}
                        confirmCallback={this.doLockList.bind(this)} /> : <span>(Liste gesperrt)</span>}
                </div>
            </div>
        );
    }

}

ExpensesListSelector.propTypes = {
    expensesLists: React.PropTypes.array.isRequired,
    selected: React.PropTypes.object,
    setActiveList: React.PropTypes.func.isRequired,
    deleteList: React.PropTypes.func.isRequired,
    lockList: React.PropTypes.func.isRequired
}