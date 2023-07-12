import { SELECT_DOGSITTER } from "../actions";

const initialState = {
	content: null,
};

const dogSitterSelectedReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELECT_DOGSITTER:
			return {
				...state,
				content: action.payload,
			};

		default:
			return state;
	}
};

export default dogSitterSelectedReducer;
