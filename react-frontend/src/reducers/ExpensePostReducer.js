import Constants from '../constants/ExpenseConstants.jsx';

const initialState = {
	expensePosts: {},
	storeError: false,
	deleteError: false,
	fetchError: false
};

export default function expensePosts(state = initialState, action) {
	switch(action.type) {
	case Constants.ADD_EXPENSE_POST_SUCCESS: {
		let addedExpensePosts = Object.assign({}, state.expensePosts);
		addedExpensePosts[action.expensePost.id] = action.expensePost;
		return Object.assign({}, state, {
			expensePosts: addedExpensePosts,
			storeError: false
		});
	}
	case Constants.ADD_EXPENSE_POST_ERROR:
		return Object.assign({}, state, {
			storeError: true
		});
	case Constants.DELETE_EXPENSE_POST_SUCCESS: {
		let reducedExpensePosts = Object.assign({}, state.expensePosts);
		delete reducedExpensePosts[action.id];
		return Object.assign({}, state, {
			expensePosts: reducedExpensePosts,
			deleteError: false
		});
	}
	case Constants.DELETE_EXPENSE_POST_ERROR:
		return Object.assign({}, state, {
			deleteError: true
		});
	case Constants.FETCH_EXPENSE_POSTS_SUCCESS: {
		let posts = {};
		if ( action.expensePosts ) {
			action.expensePosts.forEach(exp => {
				posts[exp.id] = exp;
			});
		}
		return Object.assign({}, state, {
			expensePosts: posts,
			fetchError: false
		});
	}
	case Constants.FETCH_EXPENSE_POSTS_ERROR:
		return Object.assign({}, state, {
			fetchError: true
		});
	default:
		return state;
	}
}