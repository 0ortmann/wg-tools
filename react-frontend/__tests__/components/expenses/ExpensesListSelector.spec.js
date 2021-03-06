import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ExpensesListSelector from '../../../src/components/expenses/ExpensesListSelector.jsx';

describe('ExpensesListSelector', () => {

	const headlineText = 'Liste auswählen';
	const noContent = 'Bitte neue Liste anlegen';
	const expensesLists = [ 'List 1', 'List 2' ];
	const selected = { id: '1', name: 'List 1', editable: true };
	const uneditable = { id: '1', name: 'List 1', editable: false };

	let listSelector;

	const setActiveList = jest.genMockFunction();
	const deleteList = jest.genMockFunction();
	const lockList = jest.genMockFunction();

	beforeEach(function() {
		listSelector = TestUtils.renderIntoDocument(
            <ExpensesListSelector expensesLists={expensesLists} selected={selected} setActiveList={setActiveList}
                deleteList={deleteList} lockList={lockList} />
        );
	});


	it('should render headline and noContent with empty expenses lists', () => {
        
		listSelector = TestUtils.renderIntoDocument( 
            <ExpensesListSelector expensesLists={[]} selected={undefined} setActiveList={setActiveList}
                deleteList={deleteList} lockList={lockList} />
        );
        
		let headline = TestUtils.findRenderedDOMComponentWithTag(listSelector, 'h3');
		expect(headline.textContent).toEqual(headlineText);

		let selectOption = TestUtils.findRenderedDOMComponentWithTag(listSelector, 'option');
		expect(selectOption.textContent).toEqual(noContent);
	});

	it('should render one option per expenses list', () => {
        
		let selectOptions = TestUtils.scryRenderedDOMComponentsWithTag(listSelector, 'option');
		expect(selectOptions.length).toEqual(2);
		expect(selectOptions[0].textContent).toEqual('List 1');
		expect(selectOptions[1].textContent).toEqual('List 2');
	});

	it('should call select-action on select', () => {
        
		let select = TestUtils.findRenderedDOMComponentWithTag(listSelector, 'select');

		TestUtils.Simulate.change( select, {target: {value: 'List 2' }} );

		expect(setActiveList).toBeCalledWith('List 2');
	});

	it('should render confirm boxes for "delete" and "lock" ', () => {
		let confirms = TestUtils.scryRenderedDOMComponentsWithClass(listSelector, 'confirmBox');
		expect(confirms.length).toEqual(2);
	});

	it('should only render only confirm box for delete, if list is locked', () => {
		listSelector = TestUtils.renderIntoDocument(
            <ExpensesListSelector expensesLists={expensesLists} selected={uneditable}
                setActiveList={setActiveList} deleteList={deleteList} lockList={lockList} />
        );
        
		let deleteConfirm = TestUtils.findRenderedDOMComponentWithClass(listSelector, 'confirmBox');
		expect(deleteConfirm).toBeDefined();
	});

});