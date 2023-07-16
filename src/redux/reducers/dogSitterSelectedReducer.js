import { SELECT_DOGSITTER, DOGSITTER_SELECTED_LOGOUT } from "../actions";

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
		case DOGSITTER_SELECTED_LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default dogSitterSelectedReducer;
