import React, { Component } from 'react'
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import DeptList from './DeptList.jsx'
import DispensesForm from './DispensesForm.jsx'

import Constants from '../../constants/ExpenseConstants.jsx';

import { fetchDepts } from '../../actions/DeptsActionCreators.jsx';
import { setDispenses } from '../../actions/ExpensesListActionCreators.jsx';


export class DeptWrapper extends Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		const newActiveList = nextProps.activeList
		const newExpensePosts = nextProps.expensePosts;
		const { activeList, expensePosts, fetchDepts } = this.props;
		
		if ( !isEqual(expensePosts, newExpensePosts) || 
			activeList && newActiveList && activeList.dispenses != newActiveList.dispenses ) {
			
			const newListName = newActiveList? newActiveList.name : undefined;
			fetchDepts(newListName);
		}
	}

	render() {

		const { activeList, setDispenses, deptList } = this.props;
		return(
			<div className="container-fluid">
				<div className="container__header">
					<h1>Schulden</h1>
					<DispensesForm activeList={activeList} setDispenses={setDispenses} />

				</div>
				<DeptList deptList={deptList}/>
			</div>
		);
	}
}

DeptWrapper.propTypes = {
	expensePosts: React.PropTypes.array.isRequired,
	deptList: React.PropTypes.array.isRequired,
	activeList: React.PropTypes.object,
	setDispenses: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	let expensePosts = []
	for (var key in state.expensePosts.expensePosts) {
		expensePosts.push(state.expensePosts.expensePosts[key]);
	}
	return { 
		expensePosts: expensePosts,
		activeList: state.expensesLists.activeList,
		deptList: state.depts.depts,
	};
}


export default connect(mapStateToProps, {
	fetchDepts,
	setDispenses
})(DeptWrapper)