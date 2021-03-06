import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ExpensesItem from '../../../src/components/expenses/ExpensesItem.jsx';


describe('ExpensesItem', () => {

	const expItemData = { id: 123, color: '#ff', name: 'foo', amount: 23.42, comment: 'commi'};
	const defaultText = 'foo 23.42€✖';
	const deleteText = 'Löschen?NeinJa';
	let expItem;
	let itemNode;

	const deleteExpense = jest.genMockFunction();

	const activeList = { id: 'LIST ID', name: 'LIST NAME', editable: true };

	beforeEach(function() {
		expItem = TestUtils.renderIntoDocument(
            <ExpensesItem item={expItemData} activeList={activeList} deleteExpense={deleteExpense} />
        );
		itemNode = ReactDOM.findDOMNode(expItem);
		expect(itemNode).toBeDefined();
	});


	it('renders correct content', () => {
        
		expect(itemNode.textContent).toEqual(defaultText);
		expect(itemNode.title).toEqual('commi');
		expect(expItem.state.alive).toEqual(true);

	});

	it('becomes inactive after click on delete x-button', () => {
        
		TestUtils.Simulate.click(
            TestUtils.findRenderedDOMComponentWithTag(expItem, 'button')
        );

		expect(itemNode.textContent).toEqual(deleteText);
		expect(expItem.state.alive).toEqual(false);

	});

	it('becomes active again with click on "no"', () => {
        
		TestUtils.Simulate.click(
            TestUtils.findRenderedDOMComponentWithTag(expItem, 'button')
        );
		let yesNoButtons = TestUtils.scryRenderedDOMComponentsWithTag(expItem, 'button');

		TestUtils.Simulate.click(
            yesNoButtons[0]
        );

		expect(itemNode.textContent).toEqual(defaultText);
		expect(expItem.state.alive).toEqual(true);
	});

	it('gets deleted with click on "yes"', () => {
        
		TestUtils.Simulate.click(
            TestUtils.findRenderedDOMComponentWithTag(expItem, 'button')
        );
		let yesNoButtons = TestUtils.scryRenderedDOMComponentsWithTag(expItem, 'button');

		TestUtils.Simulate.click(
            yesNoButtons[1]
        );
        
		expect(itemNode.textContent).toEqual(defaultText);
		expect(expItem.state.alive).toEqual(true);
		expect(deleteExpense).toBeCalled();
	});

	it('does not render delete-button if list not editable', () => {
		let inactiveList = { id: 'LIST ID', name: 'LIST NAME', editable: false };
		expItem = TestUtils.renderIntoDocument(
            <ExpensesItem item={expItemData} activeList={inactiveList} deleteExpense={deleteExpense}/>
        );
		itemNode = ReactDOM.findDOMNode(expItem);

		let buttons = TestUtils.scryRenderedDOMComponentsWithTag(expItem, 'button');

		expect(buttons.length).toEqual(0);
        
	});
});