import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import ExpensesListSelector from './ExpensesListSelector.jsx';
import ExpensesListCreateForm from './ExpensesListCreateForm.jsx';
import EditForm from './EditForm.jsx';

import './ExpensesHeader.scss';


const CSS_NOT_VISIBLE = 'mobile-not-visible';
const CSS_NAVIGATION_ACTIVE = 'active';

export default class ExpensesHeader extends Component {

    constructor(props) {
        super(props);
        this.state = { flyoutContent: 2 }; // initially expand add-menu
    }

    refreshMenu() {
        this.menu = <div className='container__header__flyout'>
            <div className={this.isVisibleCss(0) + ' container__header__flyoutEntry'}>
                <ExpensesListCreateForm storeList={this.props.storeList} />
            </div>
            <div className={this.isVisibleCss(1)+ ' container__header__flyoutEntry'}>
                <ExpensesListSelector 
                    expensesLists={this.props.expensesLists} 
                    selected={this.props.selected} 
                    deleteList={this.props.deleteList}
                    lockList={this.props.lockList}
                    setActiveList={this.props.setActiveList} />
             </div>
            <div className={this.isVisibleCss(2)+ ' container__header__flyoutEntry'}>
                <EditForm activeList={this.props.selected} submitCallback={this.addExpense.bind(this)} />
            </div>
        </div>;
    }

    addExpense(name, amount, comment) {
        this.props.storeExpense(name, amount, comment, this.props.selected.name);
    }

    isVisibleCss(id) {
        return id == this.state.flyoutContent? '' : CSS_NOT_VISIBLE;
    }

    isActiveCss(id) {
        return id == this.state.flyoutContent? CSS_NAVIGATION_ACTIVE : '';
    }

    getFlyoutContent() {
        if ( !this.state.flyoutContent ) {
            return undefined;
        }
        return this.menu;
    }


    setFlyoutContent(event) {
        let clickedId = event.target.id;
        if (this.state.flyoutContent == clickedId) {
            this.setState( { flyoutContent: undefined } );
        }
        else {
            this.setState( { flyoutContent: event.target.id } );
        }
    }

    render() {
        this.refreshMenu();
        return(
            <div className="container__header expensesHeader">
                <h1>Ausgaben</h1>
                <ul className='container__header__navigation'>
                    <li className={this.isActiveCss(0) + ' container__header__navigationEntry'}>
                        <a id={0} onClick={this.setFlyoutContent.bind(this)}>
                            Liste <i className='fa fa-plus-circle' aria-hidden='true'/>
                        </a>
                    </li>
                    <li className={this.isActiveCss(1) + ' container__header__navigationEntry'}>
                        <a id={1} onClick={this.setFlyoutContent.bind(this)}>
                            Liste <i className='fa fa-sort-amount-asc' aria-hidden='true'/>
                        </a>
                    </li>
                    <li className={this.isActiveCss(2) + ' container__header__navigationEntry'}>
                        <a id={2} onClick={this.setFlyoutContent.bind(this)}>
                            Eintrag <i className='fa fa-plus-circle' aria-hidden='true'/>
                        </a>
                    </li>
                </ul>
                {this.getFlyoutContent()}
            </div>
        );
    }

}

ExpensesHeader.propTypes = {
    expensesLists: React.PropTypes.array.isRequired,
    selected: React.PropTypes.object,
    storeList: React.PropTypes.func.isRequired,
    setActiveList: React.PropTypes.func.isRequired,
    deleteList: React.PropTypes.func.isRequired,
    lockList: React.PropTypes.func.isRequired,
    storeExpense: React.PropTypes.func.isRequired
}